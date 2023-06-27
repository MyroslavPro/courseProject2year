#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>

ESP8266WebServer espServer(80);

const char* ssid = "******";(//changed for demostration)
const char* password = "******";
IPAddress ip(192,168,45,8);
IPAddress gateway(192,168,45,55);
IPAddress subnet(255,255,255,192);

void setup() {
  Serial.begin(9600);
  delay(10);
  Serial.println('\n');

  WiFi.begin(ssid, password);  // Connect to the network
  WiFi.config(ip, gateway, subnet);
  Serial.print("Connecting to ");
  Serial.print(ssid);
  Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {  // Waiting for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i);
    Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  //
  espServer.on("/",handleRootRequest);
  espServer.on("/power", powerChangeRequest);
  espServer.on("/buzzer", buzzerRequest);
  espServer.begin();
}

void loop() {
  String receivedString = "";
  String dataIncome = "";
  String requestBodyIncome = "";
  int index = 0;
  int lenBody = 0;

  // Server set and ready to handle requests
  espServer.handleClient();

  while (Serial.available()>0) {
    receivedString = Serial.readString();
  }

  if (receivedString.indexOf("motion") != -1) {
    dataIncome = "motion";

    index = receivedString.indexOf(',');
    lenBody = receivedString.length();
    requestBodyIncome = receivedString.substring(index+1,lenBody);
    
    // Post itself, passing datt from ardiuno
    postDataToServer(dataIncome, requestBodyIncome);

  } else if (receivedString.indexOf("sound") != -1){
    dataIncome = "sound";

    index = receivedString.indexOf(',');
    lenBody = receivedString.length();
    requestBodyIncome = receivedString.substring(index+1,lenBody);

    postDataToServer(dataIncome, requestBodyIncome);
  }
  else if (receivedString.indexOf("arduinoSendsPower") != -1){
    dataIncome = "power_status";

    index = receivedString.indexOf(',');
    lenBody = receivedString.length();
    requestBodyIncome = receivedString.substring(index+1,lenBody);
    postDataToServer(dataIncome, requestBodyIncome);
  }
}

void getDataFromServer() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    // Send request
    http.begin(client,"http://192.168.45.23:5000");
    http.GET();
        
    // Print the response
    Serial.println(http.getString());

    // Disconnect
    http.end();
  }
}

void postDataToServer(String dataTypeIncome,String requestBody) {

  Serial.println("Posting JSON data to server...");
  // Block until we are able to connect to the WiFi access point
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    String requestAddress = "http://192.168.45.23:5000/";
    requestAddress.concat(dataTypeIncome);

    http.begin(client, requestAddress);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {

      String response = http.getString();

      Serial.println(httpResponseCode);
      Serial.println(response);

    } else {
      Serial.printf("Error occurred while sending HTTP POST: %s\n", http.errorToString(httpResponseCode).c_str());
    }
  }
}
void handleRootRequest() {
  espServer.send(200, "text/html", "<h1>Hi, it's a Web Server on ESP8266 module. Visit these links <br>PowerChange: /power <br>Buzzer: /buzzer</h1>");
}

void powerChangeRequest() {
  // String response = "{power_status: " + String(power_status)  +"}" ;
  // espServer.send(200, "application/json", response );
  espServer.send(200, "text/html", "<p> PowerChanged,wait for update</p>");
  Serial.println("");
  Serial.println("espSendsPower");
}

void buzzerRequest() {
  espServer.send(200, "text/html", "<p>Playing</p>");
  Serial.println("buzzer");
}