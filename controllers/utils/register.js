const userDB = require('../../models/userSchema');

exports.register = async (uname, password) => {
    const newUser = new userDB({
        uname,
        password,
        token: "null",
        score: 0,
        credit: 100,
        points: 0,
    });
    let check;
    try {
        check = await userDB.findOne({
            uname
        }, {
            password: 1
        });
    } catch (err) {
        return {
            message: 'Error making database call'
        };
    }
    try {
        if (check != null) {
            return {
                message: 'User already exist',
            };
        } else {
            await newUser.save();
            return {
                message: 'User Registered'
            };
        }
    } catch (err) {
        return {
            message: 'Internal Server Error'
        };
    }
};