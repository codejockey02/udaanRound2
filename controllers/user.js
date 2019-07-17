const express = require('express');
const genTok = require('randomstring');

const userDB = require('../models/userSchema');

const register = require('./utils/register');

const router = new express.Router();

router.post('/signup', async (req, res) => {
    const {
        name,
        uname,
        password,
        contact
    } = req.body;
    register.register(name, uname, password, contact)
        .then(result => res.json({
            message: result.message
        }))
        .catch(() => res.json({
            message: 'Unexpected error occured'
        }));
});

router.post('/login', async (req, res) => {
    const {
        uname,
        password
    } = req.body;
    let check;
    try {
        check = await userDB.findOne({
            uname,
        }, {
            password: 1,
            contact: 1,
        });
    } catch (err) {
        res.json({
            message: 'Error making database call'
        });
    }
    try {
        console.log(check);
        if (password == check.password) {
            const token = genTok.generate();
            await userDB.updateOne({
                uname,
            }, {
                $set: {
                    token,
                }
            });
            res.json({
                message: token,
            });
        } else {
            res.json({
                message: 'Incorrect Password'
            });
        }
    } catch (err) {
        res.json({
            message: 'User does not exist'
        });
    }
});

module.exports = router;