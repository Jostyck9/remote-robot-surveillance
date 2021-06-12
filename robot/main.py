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
    print(data)
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
    else:
        print("UNKNOWN DATA")

sio.connect('http://192.168.0.43:3000', auth={"device": "robot", "url": "ajfdh"})
sio.wait()
