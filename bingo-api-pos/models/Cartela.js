const mongoose = require('mongoose');

const Cartela = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    bolas: [{
        type: String,
        required: true
    }],
    disponivel: {
      type: Boolean,
      default: true
    },
},
{
    timestamps: true,
});

mongoose.model('cartelas', Cartela);