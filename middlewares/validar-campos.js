const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const listaDeErrores = [];
        errores.errors.map((mensajes) => {
            listaDeErrores.push(mensajes.msg)
        })
        return res.status(400).json({
            ok: false,
            errors: listaDeErrores[0],
        })

    }

    next();
}

module.exports = {
    validarCampos
}