from flask import Response
from flask import Flask
from flask import render_template
import threading
import time
import cv2
import jetson.inference
import jetson.utils

VIDEO_SOURCE = "http://192.168.0.48:4747/video"
APP_PORT = 5000

outputFrame = None
frame = None
lock = threading.Lock()
vid_lock = threading.Lock()

app = Flask(__name__)

vs = cv2.VideoCapture(VIDEO_SOURCE)
net = jetson.inference.detectNet("ssd-mobilenet-v2", threshold=0.8)
time.sleep(2.0)

@app.route("/")
def index():
    return render_template("index.html")

def get_continuous_video():
    global vs, frame, vid_lock
    while True:
        _, fr = vs.read()
        if _:
            fr = cv2.rotate(fr, cv2.ROTATE_90_COUNTERCLOCKWISE)
            with vid_lock:
                frame = fr.copy()

def detect_motion():
    global outputFrame, lock, net, frame, vid_lock
    while True:
        with vid_lock:
            if frame is None:
                continue
            tmp_frame = frame.copy()
        colored = cv2.cvtColor(tmp_frame, cv2.COLOR_BGR2RGB)
        img = jetson.utils.cudaFromNumpy(colored)
        height, width = colored.shape[:2]
        detections = net.Detect(img, width, height)
        for detection in detections:
            class_name = net.GetClassDesc(detection.ClassID)
            tmp_frame = cv2.rectangle(tmp_frame,
                                      (int(detection.Left), int(detection.Top)),
                                      (int(detection.Right), int(detection.Bottom)),
                                      (255,0,0), 2
            )
            cv2.putText(tmp_frame, class_name,
                        (int(detection.Left), int(detection.Top)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2)

        with lock:
            outputFrame = tmp_frame.copy()

def generate():
    # grab global references to the output frame and lock variables
    global outputFrame, lock
    # loop over frames from the output stream
    while True:
	# wait until the lock is acquired
        with lock:
            # check if the output frame is available, otherwise skip
	    # the iteration of the loop
            if outputFrame is None:
                continue
            # encode the frame in JPEG format
            (flag, encodedImage) = cv2.imencode(".jpg", outputFrame)
            # ensure the frame was successfully encoded
            if not flag:
                continue
        # yield the output frame in the byte format
        yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')

@app.route("/video_feed")
def video_feed():
    # return the response generated along with the specific media
    # type (mime type)
    return Response(generate(), mimetype = "multipart/x-mixed-replace; boundary=frame")

if __name__ == '__main__':
    t = threading.Thread(target=get_continuous_video, daemon=True)
    t.start()
    t = threading.Thread(target=detect_motion, daemon=True)
    t.start()
    app.run(host='0.0.0.0', port=APP_PORT, debug=True, threaded=True, use_reloader=False)
vs.release()
