const db = require("../models/index");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  dest: "./uploads",
});

module.exports = {
    getAll : async function (req,res) {
      let token = req.header('x-auth-token');
      if(!req.header('x-auth-token')){
          return res.status(400).send('Unauthorized. Please login first !')
      }
  
      try {
          let userdata = jwt.verify(token, JWT_KEY);
  
          if (userdata.jabatan!='Manager') {
              return res.status(400).send('Karyawan selain manajer tidak dapat mengakses endpoint ini !');
          }
      } catch {
          return res.status(400).send('Invalid JWT Key');
      }
        const users = db.User.findAll();
        return res.status(201).send(users);
    },
    updateKaryawan : function (req,res) {
      let token = req.header('x-auth-token');
      if(!req.header('x-auth-token')){
          return res.status(400).send('Unauthorized. Please login first !')
      }
    
      try {
          let userdata = jwt.verify(token, JWT_KEY);
  
          if (userdata.jabatan!='Manager') {
              return res.status(400).send('Karyawan selain manajer tidak dapat mengakses endpoint ini !');
          }
        } catch {
            return res.status(400).send('Invalid JWT Key');
        }
        
        let {username, email, nama, no_telp} = req.body;
        let user = db.User.findOne({
          where : {
            username : username
          }
        });

        let upd = db.User.update({
          email : email,
          nama : nama,
          no_telp : no_telp
        }, {
          where : {
            username : username
          }
        });

        return res.status(200).send("User berhasil diupdate !");
    },

    deleteKaryawan : function (req,res) {
      
    }
};
