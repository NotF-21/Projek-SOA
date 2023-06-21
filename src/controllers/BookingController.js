const db = require("../models/index");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  dest: "./uploads",
});
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");
const Joi = require("joi").extend(require("@joi/date"));

const valDiskon = async (id) => {
    let discount = await db.Discount.findByPk(id);
    if (discount==null) throw new Error("Diskon tidak terdaftar !");
};

module.exports = {
    getEvents : async function (req,res) {
        let list = await db.Booking.findAll();

        return res.status(200).send(list);
    },
    addEvent : async function (req,res) {
        if (req.body.discount) {
            let schema = Joi.object({
                nama : Joi.string().required().label("Nama"),
                tempat : Joi.string().required().label("Tempat"),
                participant : Joi.number().required().min(1).label("Jumlah partisipan").messages({
                    "number.min" : "Diskon harus minimal 1 !",
                }),
                email : Joi.string().email().required().label("Email").messages({
                    "string.email" : "Email harus dalam format yang sesuai !",
                }),
                no_telp : Joi.number().required().label("Nomor Telepon"),
                date : Joi.date().format("YYYY-MM-DD").label("Tanggal Acara").required().greater('now').messages({
                    "date.format" : "Format tanggal harus dalam YYYY-MM-DD !",
                    "date.greater" : "{{#label}} harus lebih telat dari hari booking !"
                }),
                discount : Joi.number().external(valDiskon),
            }).messages({
                "any.required" : "{{#label}} harus diisi !",
                "any.empty" : "{{#label}} harus diisi !",
            });
    
            try {
                await schema.validateAsync(req.body);
            } catch (error) {
                return res.status(400).send(error.toString());
            }
        } else {
            let schema = Joi.object({
                nama : Joi.string().required().label("Nama"),
                tempat : Joi.string().required().label("Tempat"),
                participant : Joi.number().required().min(1).label("Jumlah partisipan").messages({
                    "number.min" : "Diskon harus minimal 1 !",
                }),
                email : Joi.string().email().required().label("Email").messages({
                    "string.email" : "Email harus dalam format yang sesuai !",
                }),
                no_telp : Joi.number().required().label("Nomor Telepon"),
                date : Joi.date().format("YYYY-MM-DD").label("Tanggal Acara").required().greater('now').messages({
                    "date.format" : "Format tanggal harus dalam YYYY-MM-DD !",
                    "date.greater" : "{{#label}} harus lebih telat dari hari booking !"
                }),
            }).messages({
                "any.required" : "{{#label}} harus diisi !",
                "any.empty" : "{{#label}} harus diisi !",
            });
    
            try {
                await schema.validateAsync(req.body);
            } catch (error) {
                return res.status(400).send(error.toString());
            }
        }

        let {nama, tempat, participant, date, email, discount, no_telp} = req.body; 
        let cr = {};
        cr.nama = nama;
        cr.tempat = tempat;
        cr.participant = participant;
        cr.date_time = date;
        cr.email = email;
        cr.no_telp = no_telp;
        cr.id_diskon = discount;

        let ins = await db.Booking.create(cr);

        return res.status(200).send({
            message : "Acara berhasil dibooking !",
            ins,
        });
    },
    updateEvent : async function (req,res) {
        let id = req.params.id;

        let schema = Joi.object({
            tempat : Joi.string().label("Tempat"),
            participant : Joi.number().min(1).label("Jumlah partisipan").messages({
                "number.min" : "Diskon harus minimal 1 !",
            }),
            email : Joi.string().email().label("Email").messages({
                "string.email" : "Email harus dalam format yang sesuai !",
            }),
            no_telp : Joi.number().label("Nomor Telepon"),
            date : Joi.date().format("YYYY-MM-DD").label("Tanggal Acara").greater('now').messages({
                "date.format" : "Format tanggal harus dalam YYYY-MM-DD !",
                "date.greater" : "{{#label}} harus lebih telat dari hari booking !"
            }),
            discount : Joi.number().external(valDiskon),
        }).messages({
            "any.empty" : "{{#label}} harus diisi !",
        }).unknown();

        try {
            await schema.validateAsync(req.body);
        } catch (error) {
            return res.status(400).send(error.toString());
        }

        let {tempat, participant, date, email, discount, no_telp} = req.body; 
        let cr = {};
        cr.tempat = tempat;
        cr.participant = participant;
        cr.date_time = date;
        cr.email = email;
        cr.no_telp = no_telp;
        if (discount!=null) cr.id_diskon = discount;

        let ins = await db.Booking.update(cr, {
            where : {
                id : id,
            }
        });

        let event = await db.Booking.findByPk(id);

        return res.status(200).send({
            message : "Acara berhasil dibooking !",
            event,
        });
    },
};