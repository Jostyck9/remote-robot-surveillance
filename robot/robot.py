import RPi.GPIO as GPIO

class Motor:
    def __init__(self, en, in1, in2):
        self.EN = en
        self.IN1 = in1
        self.IN2 = in2

        GPIO.setup([self.EN, self.IN1, self.IN2], GPIO.OUT, initial=GPIO.LOW)

    def stop(self):
        GPIO.output([self.EN, self.IN1, self.IN2], GPIO.LOW)

    def forward(self):
        GPIO.output([self.EN, self.IN1], GPIO.HIGH)
        GPIO.output(self.IN2, GPIO.LOW)

    def backward(self):
        GPIO.output([self.EN, self.IN2], GPIO.HIGH)
        GPIO.output(self.IN1, GPIO.LOW)

class Robot:
    def __init__(self):
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BOARD)

        self.left_motor = Motor(33, 37, 35)
        self.right_motor = Motor(32, 38, 40)

    def __del__(self):
        self.stop()
        try:
            GPIO.cleanup()
        except Exception as e:
            print("Cleanup failed")
            print(e)

    def stop(self):
        self.left_motor.stop()
        self.right_motor.stop()

    def forward(self):
        self.left_motor.forward()
        self.right_motor.forward()

    def backward(self):
        self.left_motor.backward()
        self.right_motor.backward()

    def right(self):
        self.left_motor.forward()
        self.right_motor.backward()

    def left(self):
        self.left_motor.backward()
        self.right_motor.forward()

if __name__ == "__main__":
    import time
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
