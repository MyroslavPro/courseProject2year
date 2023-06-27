#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include "BuzzerStarWars.h"
SoftwareSerial espSerial(10, 11);  // RX, TX

#define MOTION_SENSOR_PIN 2
#define BUZZ_PIN 9
#define BUTTON_SWITCH_PIN 12
#define SOUND_PIN A0
// int SOUND_PIN =  A0;

boolean btn_flag = 0;
boolean previous_btn_flag = 1;
boolean btn;
boolean led_flag = 0;
boolean motion_and_buzz_flag = 0;
boolean power_status = 0;
const int user = 1;

unsigned long previousSpike = 0;  // detect previous trigger of Motion sensor
unsigned long powerFlagLastTimeUpdate = 0;
int interval = 300;               // buzz change interval
int frequencies_alarm_buzz[] = {
  400, 500, 600, 750
};
int frequency_iter = 0;
int len_of_frequency_arr = sizeof(frequencies_alarm_buzz) / sizeof(frequencies_alarm_buzz[0]);

//Sound 
long sumOfSoundAnalogRead = 0;
long counter_sound_detections = 0;
unsigned long previousSoundBreakPoint = 0;
unsigned long previousSoundRead = 0;

int valueSoundPassed = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(BUTTON_SWITCH_PIN, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  pinMode(BUZZ_PIN, OUTPUT);
  pinMode(SOUND_PIN, INPUT);
  pinMode(MOTION_SENSOR_PIN, INPUT);

  Serial.begin(9600);
  espSerial.begin(9600);

  // attachInterrupt(0, motionDetected, CHANGE);  // for 2 pin
  // noInterrupts();
  // motion_and_buzz_flag = 0;
}


void loop() {
  // Button flags
  btn = !digitalRead(BUTTON_SWITCH_PIN);
  if (btn == 1 && btn_flag == 0) {
    delay(50);
    btn_flag = 1;

    previous_btn_flag = !previous_btn_flag;

  } else if (btn == 0 && btn_flag == 1) {
    delay(50);
    btn_flag = 0;
  }

  // Turn on logic
  if (previous_btn_flag == 0 && btn_flag == 1) {
    if (power_status == 0){
      powerChanged();  
    };
    // interrupts();
    // createAndPostBodyRequestPowerChange();
  } else if (previous_btn_flag == 1 && btn_flag == 1) {
    // power_status = 0;
    if (power_status == 1){
      powerChanged();  
    };
    // noInterrupts();
    // silence_buzz();
    // createAndPostBodyRequestPowerChange();
  }

  // Just builtin led on when power is on
  led_flag = power_status;
  digitalWrite(13, led_flag);
  // Check for power status
  
  while (espSerial.available()>0){
    String checkString =  espSerial.readString();
    if (checkString.indexOf("espSendsPower") != -1 ){
      Serial.println(checkString);
      powerChanged();
    }
    else if (checkString.indexOf("buzzer") != -1){
      playStarWarsBuzzMusic();
    }
  }

// DO WHEN POWER IS ON
  if (power_status) {
    if (millis() - powerFlagLastTimeUpdate > 90000){ //if ON then send update of status every 1.5 minutes
      powerFlagLastTimeUpdate = millis();
      createAndPostBodyRequestPowerChange();
    }
    // Aproximate sound value of sound every 4s
    if (millis() - previousSoundBreakPoint >= 4000){
      previousSoundBreakPoint = millis();
      valueSoundPassed = sumOfSoundAnalogRead/counter_sound_detections*100/1023;
      sendBodyRequestSound(valueSoundPassed);
      
      sumOfSoundAnalogRead = 0;
      counter_sound_detections = 0;
    }
    else if (millis() - previousSoundRead >= 50){
      sumOfSoundAnalogRead += analogRead(SOUND_PIN);
      counter_sound_detections++;
    } 

    //working buzzer because of detection
    if (motion_and_buzz_flag) {
      noTone(BUZZ_PIN);
      // When freq cycle needs to be restarted
      if (frequency_iter == len_of_frequency_arr) {
        frequency_iter = 0;
      }
      // Serial.println("HIGH");
      tone(BUZZ_PIN, frequencies_alarm_buzz[frequency_iter],170);
      delay(200);
      frequency_iter++;

    } else {
      silence_buzz();
      // Serial.println("LOW");
    }
  }
}

void powerChanged() {
    power_status =!power_status;
    
    if (power_status){
      // interrupts();
      attachInterrupt(0, motionDetected, CHANGE);  // for 2 pin
    }
    else {
      // noInterrupts();
      detachInterrupt(digitalPinToInterrupt(0));
      silence_buzz();
    }
    motion_and_buzz_flag = 0;
    createAndPostBodyRequestPowerChange();
}

void createAndPostBodyRequestPowerChange() {   
  StaticJsonDocument<200> doc;
  doc["power_status"] = power_status;
  doc["created_at"] = "";
  doc["user_id"] = user;
  
  String requestBody;
  serializeJson(doc, requestBody);
  String sendBody = "arduinoSendsPower,";
  sendBody.concat(requestBody);
  // Serial msg sent / power
  espSerial.println(sendBody);
  Serial.println(sendBody);
}


void motionDetected() {
  //Flags change
  if(millis() > 50){ 
  motion_and_buzz_flag = !motion_and_buzz_flag;
  previousSpike = millis();
  
  Serial.print("Motion change Detected with code / at ");
  Serial.print(motion_and_buzz_flag);
  Serial.println(' ' + millis());

  StaticJsonDocument<200> doc;
  //{"status":"Detected","user_id":"1"}
  if (motion_and_buzz_flag){
    doc["status"] = "Detected";
  } 
  else{
    doc["status"] = "Clear";
  }
  
  doc["created_at"] = "";
  doc["user_id"] = user;

  String requestBody;
  serializeJson(doc, requestBody);
  String sendBody = "motion,";
  sendBody.concat(requestBody);

  // Serial msg sent
  espSerial.println(sendBody);
  Serial.println(sendBody);
  }
}

// Sound sensor
void sendBodyRequestSound(int valueSoundAvg) {   
  StaticJsonDocument<200> doc;
  doc["value"] = valueSoundAvg;
  doc["created_at"] = "";
  doc["user_id"] = user;
  
  String requestBody;
  serializeJson(doc, requestBody);
  String sendBody = "sound,";
  sendBody.concat(requestBody);
  // Serial msg sent / power
  espSerial.println(sendBody);
  Serial.println(sendBody);
}


void silence_buzz() {
  noTone(BUZZ_PIN);
  frequency_iter = 0;
}