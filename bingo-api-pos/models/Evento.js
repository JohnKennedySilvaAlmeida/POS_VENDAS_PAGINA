const mongoose = require('mongoose');

const Evento = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    serie: {
        type: Number,
        required: true
    },
    mutiplicador: {
        type: Number,
        required: true
    },
    cupom_inical: {
        type: String,
        required: true
    },
    cupom_final: {
        type: String,
        required: true
    },
    cartelasVendidas: {
        type: Number,
        required: true
    },
    limiteCartelas: {
        type: Number,
        required: true
    },
},
{
    timestamps: true,
});

mongoose.model('evento', Evento);
