const express = require('express');

const uuidv4 = require('uuid/v4');

const server = express();

// use está utilizando um plugin
server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name" : "Diego", "email": "me@example.com" }

// MIddleware é a base de toda aplicação express
//
// localhost:3000/users/1 

const users = [];
// , {"name":"Carlos","cpf":"48752", "certificado":"Teste"};

// const users = [
//    {id: uuid.v4(),
//     status: '',
//     tipoUsuario: '',
//     nome: 'Diego',
//     empresa: 'Método',
//     funcao: '',
//     cpf: '40028922',
//     validadeDeUso: '',
//     treinamentoNR12: '',
//     emitenteEmpresa: '',
//     integracaoInstitucional: '',
//     sinalizacaoViaria: '',
//     conversaoGPLGN: '',
//     primeirosSocorrosCombateIncendio: '',
//     ptAberturaVala:'',
//     ptTrabalhoEmAltura: '',
//     ptFuroDirecional: '',
//     ptGeral: '',
//     nR35OperacaoMaquinas: '',
//     nR12FerramentasRotativas: '',
//     nR18TrabalhoNaConstrucao: '',
//     nR20InflamaveisCombustivel: '',
//     operadorDeGuindauto: '',
//     operadorDePerfumatriz: '',
//     operadorDeRetroescavadeiraBobCat: '',
//     testeEcomissionamentoSistemasCamadas: '',
//     }
// , {nome: 'Cláudio'}
// , {nome: 'Victor'}];



// middleware é um interceptador
server.use((req, res, next) => {
   console.time('Request');
   console.log(`Método: ${req.method}; URL: ${req.url}`);

   next();

   console.timeEnd('Request');
})

//middleware verificadora

function checkUserExist(req, res, next) {
   if(!req.body.name) {
      return res.status(400).json({error: 'User name is required'});
   }

   return next();
}

function checkUserInArray(req, res, next) {

   const user = users[req.params.index]

   if(!user){
      return res.status(400).json({error: 'User does not exist'});
   }

   //estou adicionando uma nova variavel dentro de user, com o valor de req.params
   req.user = user;

   return next(); 
 }



// Rota que retorna todos os usuários
server.get('/users', (req, res) => {
  
   return res.json(users);
})

// server.get('/users/:id', (req, res ) => {

//    const { id } = req.params;

//    return res.json({ message: `Buscando o usuário ${id}`} );
// })


server.get('/users/:index', checkUserInArray, (req, res) => {
   // const { index } = req.params;
   // já retorno req.user, ao inves do index, por que eu já estou passando na função checkUserInArray
   return res.json(req.user);
})

server.get('/users/cpf/:cpf', (req,res) => {
   

   const { cpf } = req.query;



   // return res.json(users[cpf]);

   return console.log(cpf)
})

server.post('/users', checkUserExist, (req, res) => {

   const {name, cpf } = req.body;

   const user = {
      id: uuidv4(),
      name,
      cpf,
   }

   users.push(user);

   return res.json(user);

})

// Método para atualizar 

server.put('/users/:index', checkUserInArray, checkUserExist, (req, res) => {
   const { index } = req.params;
   const { name } = req.body;

   users[index] = name;

   return res.json(users);
})


server.delete('/users/:index', checkUserInArray, (req, res) => {
   const { index } = req.params;

   users.splice(index, 1);


   return res.send();
})

server.listen(3000);