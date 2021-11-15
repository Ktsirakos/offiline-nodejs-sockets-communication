const SerialPort = require('serialport')

SerialPort.parsers = {
    Readline: require('@serialport/parser-readline')
  }

const Readline = SerialPort.parsers.Readline
const port = new SerialPort('/dev/ttyACM0' , { 
    parser: new Readline({delimiter: '\r\n' , encoding: 'utf8'}),
    baudRate: 115200,
    autoOpen: false,
})

let data = "";
setTimeout(() => {
    console.log('Starting taking data')
    data = ""
}, 2000)


setTimeout(() => {
    console.log('Stop taking data');
    port.close();

    const finalData = data.trim().split('|').map((elem) => elem.split(','));
    console.log(finalData);
},6000)

port.on('open' , () => {
    console.log('Port opened')
})

port.on('close' , () => console.log('Port closed'))

port.open()
port.on('data', (value) => data += value)
