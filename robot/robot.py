import RPi.GPIO as GPIO
import time

class Robot:
    def __init__(self):
        self.ENA = 33
        self.IN1 = 37
        self.IN2 = 35

        self.ENB = 32
        self.IN3 = 38
        self.IN4 = 40

        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)

        # initialize EnA, In1 and In2
        GPIO.setup(self.ENA, GPIO.OUT)#, initial=GPIO.LOW)
        GPIO.setup(self.IN1, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(self.IN2, GPIO.OUT, initial=GPIO.LOW)

        GPIO.setup(self.ENB, GPIO.OUT)#, initial=GPIO.LOW)
        GPIO.setup(self.IN3, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(self.IN4, GPIO.OUT, initial=GPIO.LOW)

        #self.pa = GPIO.PWM(self.ENA, 1000)
        #self.pb = GPIO.PWM(self.ENB, 1000)

    def __del__(self):
        self.stop()
        try:
            GPIO.cleanup()
        except Exception as e:
            print("Cleanup failed")
            print(e)

    def stop(self):
        # Stop
        #GPIO.output(self.ENA, GPIO.LOW)
        GPIO.output(self.IN1, GPIO.LOW)
        GPIO.output(self.IN2, GPIO.LOW)

        #GPIO.output(self.ENB, GPIO.LOW)
        GPIO.output(self.IN3, GPIO.LOW)
        GPIO.output(self.IN4, GPIO.LOW)
        #time.sleep(1)

        #self.pa.ChangeDutyCycle(0)
        #self.pb.ChangeDutyCycle(0)

    def forward(self):
        GPIO.output(self.ENA, GPIO.HIGH)
        GPIO.output(self.ENB, GPIO.HIGH)
        # Forward
        GPIO.output(self.IN1, GPIO.HIGH)
        GPIO.output(self.IN2, GPIO.LOW)

        GPIO.output(self.IN3, GPIO.HIGH)
        GPIO.output(self.IN4, GPIO.LOW)
        #time.sleep(1)

    def backward(self):
        GPIO.output(self.ENA, GPIO.HIGH)
        GPIO.output(self.ENB, GPIO.HIGH)
        # Backward
        GPIO.output(self.IN1, GPIO.LOW)
        GPIO.output(self.IN2, GPIO.HIGH)

        GPIO.output(self.IN3, GPIO.LOW)
        GPIO.output(self.IN4, GPIO.HIGH)
        #time.sleep(1)

    def right(self):
        GPIO.output(self.ENA, GPIO.HIGH)
        GPIO.output(self.ENB, GPIO.HIGH)
        # Right
        GPIO.output(self.IN1, GPIO.HIGH)
        GPIO.output(self.IN2, GPIO.LOW)

        GPIO.output(self.IN3, GPIO.LOW)
        GPIO.output(self.IN4, GPIO.HIGH)

    def left(self):
        GPIO.output(self.ENA, GPIO.HIGH)
        GPIO.output(self.ENB, GPIO.HIGH)
        # Left
        GPIO.output(self.IN1, GPIO.LOW)
        GPIO.output(self.IN2, GPIO.HIGH)

        GPIO.output(self.IN3, GPIO.HIGH)
        GPIO.output(self.IN4, GPIO.LOW)

robot = Robot()
time.sleep(1)
robot.forward()
time.sleep(1)
robot.backward()
time.sleep(1)
robot.stop()
time.sleep(1)
robot.left()
time.sleep(1)
robot.right()
time.sleep(1)
robot.stop()
