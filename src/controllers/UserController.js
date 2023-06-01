const db = require("../models/index");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  dest: "./uploads",
});

module.exports = {
    getAll : async function (req,res) {
        const users = db.User.findAll();
        return res.status(201).send(users);
    },
    
};
