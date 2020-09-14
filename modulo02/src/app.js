import express from 'express';

import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();
    
        this.middlewares();
        this.routes();
    }

    // aonde é cadastrado todos os middlewares
    middlewares(){
        // agora a aplicação já pode receber json
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}


export default new App().server;