const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require("./models/Usuario");
require("./models/Cartela");
require("./models/Cartela_12000");
require("./models/Cartela_24000");
require("./models/Cartela_72000");
require("./models/Cartela_96000");
require("./models/Evento")
require("./models/Sorteio")
require("dotenv/config")
const Usuario = mongoose.model('usuario');
const Evento = mongoose.model('evento');
const Cartela = mongoose.model('cartelas');
const Cartela_12000 = mongoose.model('cartelas_12000');
const Cartela_24000 = mongoose.model('cartelas_24000');
const Cartela_72000 = mongoose.model('cartelas_72000');
const Cartela_96000 = mongoose.model('cartelas_96000');
const Sorteio = mongoose.model('sorteios')

const app = express();

const origin = process.env.NODE_ENV != 'prod' ? process.env.ORIGIN_DEV : process.env.ORIGIN_PROD.split(',')

app.use(cors({
    "origin": origin,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))
  
app.use(express.json())

mongoose.connect('mongodb://localhost/bingo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso! Verificar se o serviço sytem foi iniciado.");
});

app.post("/login", (req, res) => {
  Usuario.findOne({
    login: req.body.login,
    senha: req.body.senha
  })
  .then((usuario) => {
    return res.json(usuario);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum usuário encontrado"
    })
  });
});

app.get("/login/:id", (req, res) => {
  var id = req.params.id
  Usuario.findById(id)
  .then((usuario) => {
    return res.json(usuario);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum usuário encontrado"
    })
  });
});

app.post("/cartelas", (req, res) => {
  
  console.log(req.body)
  // Cartela.
  Cartela.find({
    // req.body
  })
  return res.status(200).json({
    error: false,
    message: "teste de req!",
    req: req.body
})
  
  // var id = req.params.id
  // Usuario.findById(id)
  // .then((usuario) => {
  //   return res.json(usuario);
  // }).catch((err) => {
  //   return res.status(400).json({
  //     error: true,
  //     message: "Nenhum usuário encontrado"
  //   })
  // });
});

app.get('/cartelas/:periodo', (req, res) => {
  listaDeCartelas = req.query.numeros.split(',')
  let modelDaBusca = Cartela
  if(req.params.periodo == '12000') modelDaBusca = Cartela_12000
  if(req.params.periodo == '24000') modelDaBusca = Cartela_24000
  if(req.params.periodo == '72000') modelDaBusca = Cartela_72000
  if(req.params.periodo == '96000') modelDaBusca = Cartela_96000

  console.log(modelDaBusca)

  modelDaBusca.find().where('numero').in(listaDeCartelas).then((cartela) => {
    return res.json(cartela);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhuma cartela encontrada"
    })
  });
})

app.post("/usuario", (req, res) => {
  const usuario = Usuario.create(req.body, (err) => {
      if (err) return res.status(400).json({
          error: true,
          message: "Error: Usuario não foi cadastrado com sucesso!"
      });
  
      return res.status(200).json({
          error: false,
          message: "Usuario cadastrado com sucesso!"
      })
  });
});

app.get("/usuario", (req, res) => {
  Usuario.find({}).then((usuario) => {
    return res.json(usuario);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum usuário encontrado"
    })
  });
});

app.get("/usuarios", (req, res) => {

  requestObject = {}

  if(req.query.data){
    let day = req.query.data.split('T')[0]
    const minDate = day + 'T00:00:00.000Z'
    const maxDate = day + 'T23:59:59.000Z'
    requestObject = {
      createdAt: {
          $gte: minDate, 
          $lt: maxDate
      }
    }
  }

  Usuario.find(requestObject)
  .then((usuario) => {
    return res.json(usuario);
  })
  .catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum usuário encontrado"
    })
  });
});

app.delete("/usuario/:id", (req, res) => {
  const usuario = Usuario.deleteOne({_id: req.params.id}, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Error: Usuário não foi apagado com sucesso!"
    })
    
    return res.json({
      error: false,
      message: "Usuário apagado com sucesso!"
    })
  });
});

app.post("/cartela", (req, res) => {
  const cartela = Cartela.create(req.body, (err) => {
      if (err) return res.status(400).json({
          error: true,
          message: "Error: Cartela não foi criada com sucesso!"
      });
  
      return res.status(200).json({
          error: false,
          message: "Cartela criada com sucesso!"
      })
  });
});

app.post("/evento", (req, res) => {
  const evento = Evento.create(req.body, (err) => {
      if (err) {
        return res.status(400).json({
            error: true,
            message: "Error: Evento não foi cadastrado com sucesso!"
        });
      } 
  
      return res.status(200).json({
          error: false,
          message: "Evento cadastrado com sucesso!"
      })
  });
});

app.get("/usuario/:usuarioId", (req, res) => {
  var id = req.params.usuarioId
  Usuario.findById(id)
  .then((usuario) => {
    return res.json(usuario);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum usuário encontrado"
    })
  });
});

app.put('/usuario/:usuarioId', (req, res) => {
  Usuario.findById(req.params.usuarioId)
  
  .then((usuario) => {
    usuario.nome    = req.body.nome
    usuario.login   = req.body.login
    usuario.senha   = req.body.senha
    usuario.periodo = req.body.periodo
    usuario.adm     = req.body.adm
    usuario.save()
    
    return res.status(200).json({
      error: false,
      message: " Sucesso "
    })
  })
  .catch((err) => {
      return res.status(400).json({
        error: true,
        message: " Error "
    })
  })
});

app.put('/evento/:eventoId', (req, res) => {
  const evento = Evento.findById(req.params.eventoId)
  .then((evento) => {

    let disponivel = (evento.limiteCartelas + evento.cartelasVendidas) - parseInt(req.body.quantidade)
    if(req.body.quantidade + parseInt(req.body.quantidade) > evento.limiteCartelas) {
      return res.status(400).json({
        error: true,
        message: `Esta venda excede a quantidade disponível. Disponível para venda: ${disponivel}`
      })
    }

    let inicial = evento.cartelasVendidas

    evento.cartelasVendidas = req.body.quantidade 
      ? evento.cartelasVendidas + parseInt(req.body.quantidade) 
      : evento.cartelasVendidas
    evento.save();
    const cartelas = {
      inicial: inicial +1,
      final: evento.cartelasVendidas
    }
    return res.status(200).json({
      error: false,
      message: "Evento alterado com sucesso!",
      evento: evento,
      cartelas: cartelas
    })
  })
  .catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum evento encontrado/Não foi possível atualizar."
    })
  })
})


app.get("/eventos", (req, res) => {

  Evento.find({})
  .then((eventos) => {
    return res.json(eventos);
  })
  .catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum evento encontrado"
    })
  });
});

app.get('/sorteios/:nome', (req, res) => {
  var nome = req.params.nome
  Sorteio.find({nome: nome})
  .then((sorteio) => {
    return res.json(sorteio);
  })
  .catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum sorteio encontrado"
    })
  });
})

app.get("/teste", (req, res) => {
  return res.json({titulo: "Teste da requisicao"})
})

app.listen(9090, () => {
  console.log("Servidor iniciado na porta 9090: http://localhost:9090/");
});
