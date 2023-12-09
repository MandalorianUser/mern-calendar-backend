const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

// Cambiar el nombre del campo '_id' a 'id'
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Configurar para que no se incluya '__v' en la respuesta
EventoSchema.set('versionKey', false);

module.exports = model('Evento', EventoSchema);
