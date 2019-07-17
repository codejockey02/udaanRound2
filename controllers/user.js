const express = require('express');
const genTok = require('randomstring');

const userDB = require('../models/userSchema');
const playerDB = require('../models/players');

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
        playername,
        points,
    } = req.body;
    let check;
    try {
        check = await playerDB.findOne({
            playername
        }, {
            points: 1
        });
    } catch (err) {
        res.json({
            message: 'Error making database call'
        });
    }
    await playerDB.updateOne({
        playername,
    }, {
        $set: {
            points: points + check.points,
        }
    });
    res.json({
        message: 'Points added to player'
    });
});

router.post('/create-players', async (req, res) => {
    const {
        playername,
    } = req.body;
    const newPlayer = new playerDB({
        playername,
        points: 0,
    });
    let check;
    try {
        check = await playerDB.findOne({
            playername,
        }, {
            _id: 1
        });
    } catch (err) {
        res.json({
            message: 'Error making database call'
        });
    }
    try {
        if (check == null) {
            await newPlayer.save();
            res.json({
                message: 'Player created'
            });
        } else {
            res.json({
                message: 'Player already exist'
            });
        }
    } catch (err) {
        res.json({
            message: 'Error making database call'
        });
    }
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