const mongoose = require('mongoose');
const worldcupSchema = new mongoose.Schema({
player: {
type: String,
required: true
},
country: {
    type: String,
    required: true
    },
goal: {
    type: String,
    required: true
    },
date: {
type: Date,
default: Date.now
}
})
module.exports = mongoose.model('Worldcup',worldcupSchema);