const { response } = require('express');
const Evento = require('../models/Eventos');



const obtenerEventos = async (req, res = response, next) => {

    const eventos = await Evento.find().populate('user', 'name');
    return res.status(200).json({
        ok: true,
        msg: eventos
    })
}
const crearEvento = async (req, res = response, next) => {


    const evento = new Evento(req.body);

    evento.user = req.uid;

    const eventoGuardado = await evento.save();


    return res.status(200).json({
        ok: true,
        msg: 'crearEvento',
        evento: eventoGuardado
    })
}

const actualizarEvento = async (req, res = response, next) => {

    const eventoID = req.params.id;

    try {
        const evento = await Evento.findById(eventoID);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            })
        }

        if (evento.user.toString() !== req.uid) {
            res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta modificacion'
            })
        }


        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, { ...req.body }, { new: true });

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarEvento = async (req, res = response, next) => {

    const eventoID = req.params.id;
    const evento = await Evento.findById(eventoID);
    try {
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No posee permisos para eliminar este evento'
            })
        } else {
            const eventoParaBorrar = await Evento.findByIdAndDelete(eventoID)

            return res.json({
                ok: true,
                evento: eventoParaBorrar
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


    return res.status(200).json({
        ok: true,
        msg: 'borrar Evento'
    })
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}