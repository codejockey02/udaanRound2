const express = require('express');
const genTok = require('randomstring');

const userDB = require('../models/userSchema');

const register = require('./utils/register');

const router = new express.Router();

router.post('/signup', async (req, res) => {
    const {
        uname,
        password,
    } = req.body;
    register.register(uname, password)
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

router.post('/admin-login', async (req, res) => {
    const {
        uname,
        password,
    } = req.body;
    try {
        if (uname == 'admin' && password == '123') {
            const activeUsers = await userDB.find();
            res.json({
                message: activeUsers
            });
        } else {
            res.json({
                message: 'Incorrect Admin Credentials'
            });
        }
    } catch (err) {
        res.json({
            message: 'Internal Server Error'
        });
    }
});

router.post('/assign-points', async (req, res) => {
    const {
        uname,
        points,
    } = req.body;
    let check;
    try {
        check = await userDB.findOne({
            uname,
        }, {
            points: 1
        });
    } catch (err) {
        res.json({
            message: 'Error making database call'
        });
    }
    await userDB.updateOne({
        uname,
    }, {
        $set: {
            points: points + check.points,
        }
    });
    res.json({
        message: 'Points added to user'
    });
});
// router.post('/addPlayers', async (req, res) => {
//     const {
//         player1,
//         player2,
//         player3,
//         player4,
//         player5,
//         player6,
//         player7,
//         player8,
//         player9,
//         player10,
//         player11,
//     } = req.body;

// });

module.exports = router;