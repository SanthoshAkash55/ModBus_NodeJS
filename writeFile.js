const Modbus = require("modbus-serial");

const host = "127.0.0.1";
const port = 502;

const client = new Modbus();
client.connectTCP(host, { port: port });

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the Slave ID: ", (slaveId) => {
  rl.question("Enter the register address: ", (registerAddress) => {
    rl.question("Enter the value to write: ", (valueToWrite) => {
      client.setID(slaveId);

      client.writeRegister(registerAddress, valueToWrite, (err) => {
        if (err) {
          console.error("Modbus Error:", err);
        } else {
          console.log("Value written successfully.");
        }
        client.close(() => {
          rl.close();
        });
      });
    });
  });
});
