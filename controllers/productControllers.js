const client = require("../database/pgres");

const allProducts = (req,res) => {
    client.query(`SELECT * PRODUCTS_TABLE` , (err,result)=>{
        if(err){
            res.status(400).json({message:`Error quering the database : ${err}`});
            return;
        }
        res.status(200).json(result.rows);
    })
}

const specificProduct = (req,res) => {
    const product_id = req.params;
    client.query(`SELECT * FROM PORDUCTS_TABLE WHERE product_id = $1`,[product_id],(err,result)=>{
        if(err){
            res.status(400).json({message:`Error Quering the database : ${err}`});
            return;
        }
        res.status(200).json(result.rows);
    })
}

const createProduct = (req,res) => {
    
}

module.exports = {allProducts, specificProduct , createProduct};