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

        self.left_motor = Motor(32, 38, 40)
        self.right_motor = Motor(33, 37, 35)

        self.steering = "fw"
        self.direction = "stopped"

    def __del__(self):
        self.stop()
        try:
            GPIO.cleanup()
        except Exception as e:
            print("Cleanup failed")
            print(e)

    def move(self):
        if self.direction == "fw":
            if self.steering == "fw":
                self.left_motor.forward()
                self.right_motor.forward()
            elif self.steering == "left":
                self.right_motor.forward()
                self.left_motor.stop()
            else:
                self.left_motor.forward()
                self.right_motor.stop()
        elif self.direction == "bw":
            if self.steering == "fw":
                self.left_motor.backward()
                self.right_motor.backward()
            elif self.steering == "left":
                self.left_motor.backward()
                self.right_motor.stop()
            else:
                self.right_motor.backward()
                self.left_motor.stop()
        else:
            self.left_motor.stop()
            self.right_motor.stop()

    def no_steering(self):
        self.steering = "fw"
        self.move()

    def stop(self):
        self.direction = "stopped"
        self.move()

    def forward(self):
        self.direction = "fw"
        self.move()

    def backward(self):
        self.direction = "bw"
        self.move()

    def right(self):
        self.steering = "right"
        self.move()

    def left(self):
        self.steering = "left"
        self.move()
