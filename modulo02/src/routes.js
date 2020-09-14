//seprando o roteamento dos arquivos
import { Router} from 'express';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// cria o usuário
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;