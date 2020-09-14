import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

//arry com todos os models da aplicação

const models = [User];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        // acessa o metodo init de cada model, passando a conexão
        models.map(model => model.init(this.connection))
    }

}

export default new Database();