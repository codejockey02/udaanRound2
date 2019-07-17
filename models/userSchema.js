const mongoose = require('mongoose');

const schema = mongoose.Schema({
    uname: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    token: mongoose.Schema.Types.String,
    score: mongoose.Schema.Types.Number,
    credit: mongoose.Schema.Types.Number,
    points: mongoose.Schema.Types.Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model('user', schema);