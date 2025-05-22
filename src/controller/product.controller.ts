import {Request, Response, NextFunction, response} from "express";
import {Product} from "../model/product";
import dbProduct from "../config/db/db.product";
import {error} from "console";

const getAll = async(req : Request, res : Response) => 
    await dbProduct
    .selectAll()
    .then(products => {
        res
            .status(200)
            .send({message: 'OK', result: products});
    })
    .catch(err => {
        res
            .status(500)
            .send({message: 'Database Error', error: err.code})
    })

    const getById = async(req : Request, res : Response) => {
    await dbProduct
        .getById(parseInt(req.params.id))
        .then(product => {
            res
                .status(200)
                .send({message: 'OK', result: product})
        })
        .catch(err => {
            res
                .status(500)
                .send({message: 'DataBase Error', error: err.code})
        })
}

const getByName = async(req : Request, res : Response) => {
    await dbProduct
        .getByName(req.params.name)
        .then(product => {
            res
                .status(200)
                .send({messege: 'OK', result: product})
        })
        .catch(err => {
            res
                .status(400)
                .send({
                    message: " Irgendwas ist schief gelaufen, wenden Sie sich an den Support unter Telefonnumm" +
                            "er 122",
                    err
                })
        })
}

const updateProduct = async(req : Request, res : Response) => {

    const body = (req.body);
    await dbProduct.updateProduct((body.id), body.spaltenName, (body.wert)).then(product => {
        const serializedProduct = JSON.parse(JSON.stringify(product, (_, value) => typeof value === 'bigint'
            ? Number(value)
            : value));
        res
            .status(200)
            .send({message: 'OK', result: serializedProduct})
    }).catch(err => {
        res
            .status(400)
            .send({message: 'Input Error', error: err.code})
    })
}

const deleteProduct = async(req : Request, res : Response) => {
    await dbProduct
        .deleteProduct(parseInt(req.params.id))
        .then(response => {
            res
                .status(200)
                .send({
                    message: `Product with id: ${parseInt(req.params.id)} deleted`
                })
        })
        .catch(err => {
            res
                .status(400)
                .send({error: err.code})
        })
}

const createProduct = async(req : Request, res : Response) => {
    await dbProduct
        .createProduct(req.body)
        .then(response => {
            res
                .status(201)
                .send({message: 'Product angelegt'})
        })
        .catch(err => {
            res
                .status(400)
                .send(err)
        })
}

export default {
    getAll,
    getById,
    getByName,
    updateProduct,
    deleteProduct,
    createProduct
};