import User from '../models/User';

class UserController {
    async store(req, res){
        
        //verifica se já existe no banco de dados
       const userExists = await User.findOne({ where: { email: req.body.email } });

       if (userExists) {
           return res.status(400).json({ error: 'User already exists'})
       }

       //cria o usuário e envia todos os dados do body da requisição, podendo pegar cada item de cada vez
        // por que o model de usuário já define quais items será utilizado pra criação do usuário
    // retorna todos os dados pro usuário   
    //  const user = await User.create(req.body);
    //  return res.json(user);
    
    // retorna apenas os dados que a gente quer
       const { id, name, email, provider } = await User.create(req.body); 
    

    return res.json({ 
        id,
        name,
        email,
        provider,
    });
    }
}

export default new UserController();