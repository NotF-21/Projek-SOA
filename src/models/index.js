const fs = require("fs");
let config = {};

fs.readFile("../config/config.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed: ", err);
        return;
    }
    try {
        config = JSON.parse(jsonString);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
})

const Sequelize = require("sequelize");
const db = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password, 
    {
        host : config.development.host,
        port : 3306,
        dialect : config.development.dialect,
        logging : console.log,
        timezone : "+07:00"
    }
)

module.exports = {
    initDB: () => {
      return db.authenticate();
    },
    getDB: () => {
      return db;
    },
};
