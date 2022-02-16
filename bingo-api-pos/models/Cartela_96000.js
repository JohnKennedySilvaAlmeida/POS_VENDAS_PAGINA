const mongoose = require('mongoose');

const Cartela_96000 = new mongoose.Schema({
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

mongoose.model('cartelas_96000', Cartela_96000);