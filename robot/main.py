import socketio
from robot import Robot

robot = Robot()
sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.event
def my_message(data):
    print('message received with ', data)
    sio.emit('my response', {'response': 'my response'})

@sio.event
def disconnect():
    print('disconnected from server')

@sio.on('move')
def on_move(data):
    if data == 'forward':
        robot.forward()
    elif data == 'backward':
        robot.backward()
    elif data == 'left':
        robot.left()
    elif data == 'right':
        robot.right()
    elif data == 'stop':
        robot.stop()
    elif data == 'no-steer':
        robot.no_steering()
    else:
        print("UNKNOWN DATA")

sio.connect('http://192.168.0.42:3000', auth={"device": "robot", "url": "http://192.168.0.46:5000/video_feed"})
sio.wait()
