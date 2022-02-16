const mongoose = require('mongoose');

const Usuario = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    adm: {
      type: Boolean,
      default: false
    },
    chave: {
        type: String,
        required: false
    },
},
{
    timestamps: true,
});

mongoose.model('usuario', Usuario);