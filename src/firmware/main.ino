/*
 Typical pin layout used:
   -----------------------------------------------------------------------------------------
               MFRC522      Arduino       Arduino   Arduino    Arduino          Arduino
               Reader/PCD   Uno/101       Mega      Nano v3    Leonardo/Micro   Pro Micro
   Signal      Pin          Pin           Pin       Pin        Pin              Pin
   -----------------------------------------------------------------------------------------
   RST/Reset   RST          9             5         D9         RESET/ICSP-5     RST
   SPI SS      SDA(SS)      10            53        D10        10               10
   SPI MOSI    MOSI         11 / ICSP-4   51        D11        ICSP-4           16
   SPI MISO    MISO         12 / ICSP-1   50        D12        ICSP-1           14
   SPI SCK     SCK          13 / ICSP-3   52        D13        ICSP-3           15
*/

#include <SPI.h>
#include <MFRC522.h>

const int RST_PIN = 9;          // Configurable, see typical pin layout above
const int SS_PIN = 10;         // Configurable, see typical pin layout above
int red_led = 7;
int green_led = 6;

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

void setup() {
  Serial.begin(9600);   // Initialize serial communications with the PC
  while (!Serial);    // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  SPI.begin();      // Init SPI bus
  mfrc522.PCD_Init();   // Init MFRC522

  pinMode(red_led,OUTPUT);
  pinMode(green_led,OUTPUT);
  digitalWrite(red_led,HIGH);
}

void loop() {
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  byte data;
  for(int i = 0; i < mfrc522.uid.size ; i++){
    data = data + mfrc522.uid.uidByte[i];
  }
  mfrc522.PICC_HaltA(); // Stop Reading Card
  if(data == 56){  
    Serial.println(data);
    letin();
  }
  
}


void letin(){
  digitalWrite(red_led,LOW);
  digitalWrite(green_led,HIGH);
  delay(4000);
}
