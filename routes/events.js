const { Router } = require("express");
const { obtenerEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-JWT");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { IsDate } = require("../helpers/isDate");


const router = Router();



router.get('/', validarJWT, obtenerEventos)

router.post(
    '/crear',
    [
        validarJWT,
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatira').custom(IsDate),
        check('end', 'La fecha de finalización es obligatira').custom(IsDate),
        validarCampos
    ],
    crearEvento)



router.put('/actualizar/:id',
    [
        validarJWT,
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatira').custom(IsDate),
        check('end', 'La fecha de finalización es obligatira').custom(IsDate),
        validarCampos
    ],
    actualizarEvento)

router.delete('/borrar/:id', validarJWT, borrarEvento)

module.exports = router;

