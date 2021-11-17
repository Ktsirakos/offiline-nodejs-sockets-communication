const SerialPort = require("serialport");
const express = require("express");
const path = require("path");
const app = express(); // create express app
require('dotenv').config()

if(process.env.NODE_ENV === 'production'){
    console.log('Serving frontend....')
    app.use(express.static("client/build"));
}else{
    console.log('Development environment....')
}

// start express server on port 5000
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

SerialPort.parsers = {
  Readline: require("@serialport/parser-readline"),
};

const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/ttyACM0", {
  parser: new Readline({ delimiter: "\r\n", encoding: "utf8" }),
  baudRate: 115200,
  autoOpen: false,
});

let data = "";
setTimeout(() => {
  console.log("Starting taking data");
  data = "";
}, 2000);

setTimeout(() => {
  console.log("Stop taking data");
  port.close();

  const finalData = data
    .trim()
    .split("|")
    .map((elem) => elem.split(","));
  console.log(finalData);
}, 6000);

port.on("open", () => {
  console.log("Port opened");
});

port.on("close", () => console.log("Port closed"));

port.open();
port.on("data", (value) => (data += value));
