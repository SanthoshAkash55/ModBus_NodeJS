const Modbus = require("modbus-serial");

const host = "127.0.0.1"; // Modbus TCP server address
const port = 502; // port

const client = new Modbus();
client.connectTCP(host, { port: port });

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the Slave ID: ", (slaveId) => {
  rl.question("Enter the starting register address: ", (startRegister) => {
    rl.question("Enter the number of registers to read: ", (numRegisters) => {
      client.setID(slaveId); // Set the slave unit ID

      client.readDiscreteInputs(startRegister, numRegisters, (err, data) => {
        if (err) {
          console.error("Modbus Error:", err);
        } else {
          const values = data.data;
          console.log("Read values:", values);
        }
        client.close(() => {
          rl.close();
        });
      });
    });
  });
});
