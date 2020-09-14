import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
            // os campos que estão no model não precisam ser um refloxo da base
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        // hooks são trechos de códigos que são acionados quando existem alterações no model
        // quando salvar ou atualizar, esse código vai ser acionado
        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                // passa a variavel que está virtual com a senha, numero de rounds da criptografia ou seja a força dela
                user.password_hash = await bcrypt.hash(user.password, 8);
            }

        });
        return this;

    }

    // faz a verificação se a senha que está vindo com a requisição bate com a que está salva no banco
    // através de um método do próprio bcrypt que compara os dois valores (compare)
    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
    
}

export default User;