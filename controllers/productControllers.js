const client = require("../database/pgres");
const dotenv =require("dotenv");
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const allProducts = (req,res) => {
    client.query(`SELECT * FROM PRODUCTS_TABLE` , (err,result)=>{
        if(err){
            res.status(400).json({message:`Error quering the database : ${err}`});
            return;
        }
        res.status(200).json(result.rows);
    })
}

const byCategory = (req,res) => {
    const {category} = req.params;
    client.query(`SELECT * FROM PRODUCTS_TABLE WHERE category = $1`,[category] , (err,result)=> {
        if(err){
            res.status(400).json({message:`Error Quering the database : ${err}`});
            return;
        }
        res.status(200).json(result.rows);
    })
}

const specificProduct = (req,res) => {
    const product_id = req.params.id;
    client.query(`SELECT * FROM PRODUCTS_TABLE WHERE product_id = $1`,[product_id],(err,result)=>{
        if(err){
            res.status(400).json({message:`Error Quering the database : ${err}`});
            return;
        }
        res.status(200).json(result.rows[0]);
    })
}

const createProduct = async(req,res) => {
    try {
        const { name, price, rating, category, brand, quantity, mainImage, exImg1, exImg2 } = req.body;
        const query = 'INSERT INTO PRODUCTS_TABLE (name, price, rating, category, brand, quantity, mainImage, exImg1, exImg2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [name, price, rating, category, brand, quantity, mainImage, exImg1, exImg2];
        client.query(query, values,(err,result)=>{
            if(err){
                res.status(400).json({message:`Error Quering the database : ${err}`});
                return;
            }
            return res.status(201).json(result.rows[0]);
        });
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Server Error');
      }
}

const checkoutProduct = async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1PnOUnSGzMgZse10r3Xaznbv',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/?payment=success`,
            cancel_url: `${process.env.FRONTEND_URL}/?payment=failed`,
          });
        
          res.redirect(303, session.url);

    }catch(err){
        console.log(err)
        res.status(500).send("err",err)
    }
}

module.exports = {allProducts, specificProduct , createProduct , byCategory,checkoutProduct};