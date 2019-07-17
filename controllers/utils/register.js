const userDB = require('../../models/userSchema');

exports.register = async (name, uname, password, contact) => {
    const newUser = new userDB({
        name,
        uname,
        password,
        contact,
        token: "null",
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