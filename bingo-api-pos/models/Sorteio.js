const mongoose = require('mongoose');

const Sorteio = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  ordem: {
    type: String,
    required: true
  },
  bolas_cantadas: [{
    type: String,
    required: false
}],
},
{
    timestamps: true,
});

mongoose.model('sorteios', Sorteio);