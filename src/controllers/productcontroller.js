'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/validator');


exports.get = (req, res, next) => {
    Product.find({active: true},'title price slug').then(data => {
        res.status(200).send(data);
    }).catch(e =>{
        res.status(400).send(e);
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    },'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e =>{
        res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e =>{
        res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true,

    })
    .then(data => {
        res.status(200).send(data);
    }).catch(e =>{
        res.status(400).send(e);
    });
};

exports.post = (req, res, next) =>{

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'o titulo deve ter mais de 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'o slug deve ter mais de 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'a descrição deve ter mais de 3 caracteres')
    contract.hasMinLen(req.body.price, 1, ' o preco nao pode ser em branco')

    if(! contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({message: "produto cadastrado com sucesso!"});
    }).catch(e =>{
        res.status(400).send({message: "Falha ao cadstrar o produto!", data: e});
    });
        
};
exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({message: 'produto atualizado com sucesso!'})
    }).catch (e => {
        res.status(400).send({message:'falha ao atualizar o produto', data: e})
    });
}


exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.body.id, {
    }).then(x => {
        res.status(200).send({message: 'produto deletado com sucesso!'})
    }).catch (e => {
        res.status(400).send({message:'falha ao deletar o produto', data: e})
    });
}
 
