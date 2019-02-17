int button1 = 4;
int button2 = 3;
int button3 = 2;
void setup() {
  // put your setup code here, to run once:
  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(button3, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your macode here, to run repeatedly:
  Serial.print("Begin\n");
  
  while(1){
    if(digitalRead(button1) == HIGH) {
      Serial.print("1///inuse\n");
    }
    else {
      Serial.print("1///open\n");
    }
    if(digitalRead(button2) == HIGH) {
      Serial.print("2///inuse\n");
    }
    else {
      Serial.print("2///open\n");
    }
    if(digitalRead(button3) == HIGH) {
      Serial.print("3///inuse\n");
    }
    else {
      Serial.print("3///open\n");
    }
  }
}
