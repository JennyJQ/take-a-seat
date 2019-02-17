import serial
import time
import random
import pyrebase


config = {
    "apiKey": "AIzaSyBnA78TMXx32zuPVxvp0p7Y13vPvG7wrcY",
    "authDomain": "library-sensor.firebaseapp.com",
    "databaseURL": "https://library-sensor.firebaseio.com",
    "storageBucket": "library-sensor.appspot.com",
}

firebase = pyrebase.initialize_app(config)


# def stream_handler(message):
#     num = message["path"].split("/")
#     if (len(num) == 4):
#         seats[num[2]] = firebase.database().child(message["path"]).get(message["data"])


seats = {}
for x in range(1, 12):
    num = str(x)
    path = "/seats/" + num + "/status"
    seats[num] = firebase.database().child(path).get().val()
    # my_stream = firebase.database().stream(stream_handler)


try:
    arduino = serial.Serial('/dev/ttyACM0', 9600)
except:
    print("Failed to connect on /dev/ttyACM0")


while True:
    try:
        print(arduino.readline())
        while True:
            line = arduino.readline().decode('UTF-8').strip().split("///")
            if (seats[line[0]] != line[1]):
                if (seats[line[0]] == "reserved"):
                    seats[line[0]] = "open"
                    firebase.database().child("/seats/" + line[0] + "/status").set("open")    
                seats[line[0]] =  line[1]
                firebase.database().child("/seats/" + line[0] + "/status").set(line[1])
    except:
        print("Failed to read!")
        for x in range(1, 12):
            num = str(x)
            seats[num] = firebase.database().child("/seats/" + num + "/status").set("open")