const ValidationContract = require('../validators/validator');
const repository = require('../repositories/customer-repositoy');

exports.post = async (req, res, next) =>{

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'o titulo deve ter mais de 3 caracteres')
    contract.isEmail(req.body.email, 'o email deve ser valido')
   contract.hasMinLen(req.body.password, 3, 'password deve ter mais de 6 caracteres')
   

    if(! contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
     res.status(201).send({message: "Cliente cadastrado com sucesso!"});
   
} catch(e){
    res.status(500).send({
        message: ' falha ao cadastrar cliente'
    });
}
};