const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: mongoose.Schema.Types.String,
    uname: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    contact: mongoose.Schema.Types.String,
    token: mongoose.Schema.Types.String,
    players: mongoose.Schema.Types.String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('user', schema);