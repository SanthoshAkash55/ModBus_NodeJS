const modbus = require("modbus-serial");
const net = require("net");
const socket = new net.Socket();
const options = {
  host: "127.0.0.1",
  port: 502,
};
const client = new modbus();

socket.on("connect", async function () {
  console.log("Socket connected to server");
  client
    .connectTCP(options.host, { port: options.port })
    .then(async function () {
      console.log("Modbus client connected to server");
      const data = await client.writeCoil(5, true);
      console.log(data); // Change the coil address and value as needed
      client.close();
    })
});

socket.on("error", console.error);
socket.connect(options);
