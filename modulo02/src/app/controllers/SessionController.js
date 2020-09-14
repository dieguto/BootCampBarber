import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';


class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({where: { email}});

        if(!user) {
            return res.status(401).json({ error: 'Usuário não encontrado'})
        }

        // verifica se a senha não está batendo com a do bando de dados, por isso o sinal de negação
        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Senha incorreta'})
        }

        const { id, name } = user;

        return res.json({ 
            user: { 
                id,
                name,
                email,
            },
            //payload são informações adicionais que queremos incomporar dentro do token (ele é um objeto)
            // colocar o id do usuário
            token: jwt.sign({ id }, authConfig.secret, {
                // token expira em 7 dias
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}


export default new SessionController();