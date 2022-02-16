const mongoose = require('mongoose');

const Cartela_72000 = new mongoose.Schema({
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

mongoose.model('cartelas_72000', Cartela_72000);