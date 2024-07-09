const { Router } = require('express');
const { crearUsuario, logingUsuario, revalidarUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = Router();

router.post(
    '/',
    [
        check('email', 'El formato del email no es correcto').isEmail(),
        check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    logingUsuario)

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        check('email', 'El formato de email no es correcto').isEmail(),
        validarCampos

    ],
    crearUsuario)

router.get('/renew', validarJWT, revalidarUsuario)

module.exports = router;

