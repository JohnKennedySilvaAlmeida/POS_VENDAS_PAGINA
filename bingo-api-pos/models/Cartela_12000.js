const mongoose = require('mongoose');

const Cartela_12000 = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    bolas: [{
        type: String,
        required: true
    }],
},
{
    timestamps: true,
});

mongoose.model('cartelas_12000', Cartela_12000);