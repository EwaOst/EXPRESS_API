import {log} from "console";
import {Product} from "../../model/product";
import {connection} from "./db";

const selectAll = async() : Promise < Array < Product >> => {
    try {
        return await connection.query("SELECT * FROM product");
    } catch (err) {
        throw err;
    }
}

const getById = async(id : number) : Promise < Product > => {
    try {
        return await connection.query(`SELECT * FROM product WHERE id = ${id}`);
    } catch (err) {
        throw err;
    }
}

const updateProduct = async(id : number, spaltenName : string, wert : any) : Promise < any > => {
    // console.log(typeof id, spaltenName, typeof wert);

    try {
        return await connection.query(`Update product SET ${spaltenName} = ${wert} WHERE id =${id}`);
    } catch (err) {
        throw err;
    }
}

const deleteProduct = async(id : number) : Promise < any > => {
    try {
        return await connection.query(`DELETE from product WHERE id=${id}`);
    } catch (err) {
        throw err;
    } finally {
        // connection.end();
        console.log("hallo del");
    }
}

const createProduct = async(product : Product) : Promise < any > => {
    try {
        const stmt : Array < Product > = await connection.query(`SELECT * FROM product WHERE id in (${product.id})`)
        if (stmt.length == 0) {
            return await connection.query(`INSERT INTO product VALUES(${product.id}, '${product.name}', ${product.price})`);
        } else {
            throw new Error("Id ist bereits vorhanden")
        }

    } catch (err) {
        throw err;
    }
}

export default {
    selectAll,
    getById,
    updateProduct,
    deleteProduct,
    createProduct
}
