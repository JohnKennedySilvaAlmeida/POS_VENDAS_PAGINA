const mongoose = require('mongoose');

const Cartela_24000 = new mongoose.Schema({
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

mongoose.model('cartelas_24000', Cartela_24000);