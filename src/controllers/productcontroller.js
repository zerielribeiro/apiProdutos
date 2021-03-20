'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/product-repository')


exports.get = async(req, res, next) => {
   try{
       var data = await repository.get();
         res.status(200).send(data);
    }catch(e ){
        res.status(500).send({
            message: 'falha ao processar requisição'
        });
    }
};

exports.getBySlug = async (req, res, next)=> {
   try {
       var data = await repository.getBySlug(req.params.slug)
    res.status(200).send(data);
    } catch(e){
        res.status(400).send({
            message: ' falha ao processar requerimento'
        });
    }
}

exports.getById = async (req, res, next) => {
    try{
         var data = await repository.getById(req.params.id)
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: ' falha ao processar requerimento'
        });
    }
};

exports.getByTag = async (req, res, next) => {
   try{
        const data = await repository.getByTag(req.params.tag)
    res.status(200).send(data);
   }catch(e){
    res.status(400).send({
        message: ' falha ao processar requerimento'
    });
}
    
};

exports.post = async (req, res, next) =>{

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'o titulo deve ter mais de 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'o slug deve ter mais de 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'a descrição deve ter mais de 3 caracteres')
    contract.hasMinLen(req.body.price, 1, ' o preco nao pode ser em branco')

    if(! contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
     res.status(201).send({message: "produto cadastrado com sucesso!"});
   
} catch(e){
    res.status(500).send({
        message: ' falha ao processar requerimento'
    });
}
};
exports.put = async (req, res, next) => {
   try{
        await repository.update(req.params.id, req.body)
    res.status(200).send({message: 'produto atualizado com sucesso!'});
   } catch(e){
    res.status(400).send({
        message: ' falha ao processar requerimento'
    });
}  
};
exports.delete = async (req, res, next) => {
   try{
        await repository.delete(req.body.id)
        res.status(200).send({message: 'produto deletado com sucesso!'});
   }catch(e){
    res.status(400).send({
        message: ' falha ao processar requerimento'
    });
}
   
    
};
 
