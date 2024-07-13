const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false,
    },
    uidProvider: {
        type: String,
        required: false,
    },



});


module.exports = model('Usuario', UsuarioSchema);

