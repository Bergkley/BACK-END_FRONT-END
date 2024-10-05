const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize("railway", `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: "junction.proxy.rlwy.net",
  dialect: "mysql",
  port: 47581,
});

try {
  sequelize.authenticate();
  console.log("Conectamos com o Sequelize!");
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`);
}

module.exports = sequelize;
