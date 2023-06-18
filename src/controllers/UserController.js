const db = require("../models/index");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  dest: "./uploads",
});
const jwt = require("jsonwebtoken");

const privateKey = "ProjekSOA";

module.exports = {
    login : async function (req,res) {
        let {username, password} = req.body;

        if (!username || !password) return res.status(400).send("Input invalid !");
        else {
            let user = await db.User.findOne({
                where : {
                    username : username
                }
            });
            if (user==null) {
                return res.status(400).send("User tidak ditemukan !");
            } else if (user.password!=password) {
                return res.status(400).send("Password salah !");
            } else {
                let token = jwt.sign({
                    username : user.username,
                    jabatan : user.id_jabatan
                }, privateKey, {expiresIn:"1h"});

                return res.status(200).send({
                    message : "Berhasil login !",
                    token : token,
                });
            }
        }
    },

};