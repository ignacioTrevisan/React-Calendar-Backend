const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');


const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;


    try {
        let usuario = await Usuario.findOne({ email: email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo '
            })
        }


        usuario = new Usuario(req.body);



        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        })
        console.log("creado correctamente")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador'
        })
    }
}


const logingUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email: email })

    try {
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese email'
            })
        }

        //confirmar contraseñas

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecta'
            })
        } else {
            const token = await generarJWT(usuario.id, usuario.name)
            return res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador'
        })
    }

}

const revalidarUsuario = async (req, res = response) => {
    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name)
    res.json({
        ok: true,
        name, uid, token
    })
}

module.exports = {
    crearUsuario,
    logingUsuario,
    revalidarUsuario
}