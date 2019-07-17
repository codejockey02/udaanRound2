const mongoose = require('mongoose');

const schema = mongoose.Schema({
    playername: mongoose.Schema.Types.String,
    points: mongoose.Schema.Types.Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model('player', schema);