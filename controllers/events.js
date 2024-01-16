const { response } = require('express');
const Evento = require('../models/Evento')

const getEvents = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name');

    if (eventos.length == 0) {
        return res.status(500).json({
            ok: true,
            msg: "Sin eventos aun"
        });
    } else {
        return res.status(200).json({
            ok: true,
            eventos
        });
    }

}

const createEvent = async (req, res = response) => {

    try {
        const evento = new Evento(req.body)
        evento.user = req.uid
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async (req, res = response) => {

    const uid = req.uid
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId)

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontro evento con ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            console.log("evento.user", evento.user)
            console.log("uid", uid)
            return res.status(401).json({
                ok: false,
                msg: 'No cuentas con los privilegios necesarios para editar este evento',

            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Evento.findByIdAndUpdate(eventoId, newEvent);
        res.status(200).json({
            ok: true,
            evento: updatedEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error interno, contacte al administrador'
        })
    }


}
const deleteEvent = async (req, res = response) => {
    const uid = req.uid
    const eventId = req.params.id

    try {
        const event = await Evento.findById(eventId)
        console.log("Se encontro el evento a erliminar, ",event)
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro evento con ese id'
            });
        }

        if (event.user.toString() !== uid) {
            console.log("Dentro del DeleteEvent Backend")
            return res.status(401).json({
                ok: false,
                msg: "No tienes privilegios para eliminar este evento"
            })
        }

        const deletedEvent = await Evento.findByIdAndDelete(eventId)

        return res.status(200).json({
            ok: true,
            msg: 'Se elimino el evento exitosamente',
            deletedEvent
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error interno, contacte al administrador'
        })
    }


}
module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
}