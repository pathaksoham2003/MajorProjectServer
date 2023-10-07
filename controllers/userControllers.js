const client = require("../database/pgres.js");
/*
  user_id          SERIAL          PRIMARY KEY,
  name             VARCHAR(50)     NOT NULL,
  email            VARCHAR(50)     NOT NULL       UNIQUE,
  google_id        VARCHAR(35)     NOT NULL       UNIQUE,
  picture          VARCHAR(255),
  address          VARCHAR(255)
*/
/*
  address_id       SERIAL          PRIMARY KEY,
  user_id          INT REFERENCES USERS_TABLE(user_id),
  street_address   VARCHAR(255),
  city             VARCHAR(100),
  state            VARCHAR(100),
  postal_code      VARCHAR(20)
*/

const allUsers = async (req,res) => {
    client.query(`SELECT * FROM USERS_TABLE`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({message:`Error : ${err}`});
            return;
        }
        res.status(200).json(result.rows);
        return;
    })
}

const specificUser = (req,res) => {
    const {google_id} = req.params;
    client.query(`SELECT * FROM USERS_TABLE WHERE google_id = $1`,[google_id],(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({message:`Error ${err}`});
            return;
        }
        res.status(200).json(result.rows[0]);
        return;
    })
}

const createUser = (req,res) => {
    const { name , email , google_id, picture } = req.body;
    if(!name || !email || !google_id || !picture){
        res.status(400).json({message:"Fill The Complete Data"});
        return;
    }
    client.query(`SELECT * FROM USERS_TABLE WHERE google_id=$1`,[google_id],(err,result)=>{
        if(err){
            res.status(400).json({message:"Error quering to database"});
            return;
        }
        if(result.rows.length !== 0){
            res.status(200).json(result.rows[0]);
            return;
        }
        client.query(`INSERT INTO USERS_TABLE (name, email, google_id, picture)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,[ name , email , google_id , picture],(err,result)=>{
            if (err) {
                res.status(400).json({message:"Error quering to database"});
                return;
              } else {
                res.status(200).json(result.rows[0]);
                return;
              }
        })
    })
}

const deleteUser = (req,res) => {
    const {google_id} = req.params;
    client.query(`DELETE FROM USERS_TABLE WHERE google_id = $1`,[google_id],(err,result)=>{
        if(err){
            res.status(400).json({message:"Error Quering the database"});
            return;
        }
        res.status(200).json(result.rows);
        return;
    })
}

const addAddress = (req,res) => {
    const user_id = req.params;
    const { street_address , city , state , postal_code} = req.body;
    if(!user_id || !street_address || !city || !state || !postal_code){
        req.status(400).json({message:"Fill the complete address"});
        return;
    }
    client.query(`INSERT INTO ADDRESSES_TABLE (user_id,street_address,city,state,postal_code) VALUES ($1,$2,$3,$4,$5) RETURNING *`,[user_id, street_address , city , state , postal_code],(err,result)=>{
        if(err){
            res.status(400).json(`Error quering the database : ${err}`);
            return;
        }
        res.state(200).json(result.rows[0]);
        return;
    })
}

const getAddressByUser = (req,res) => {
    const {user_id} = req.params;
    client.query(`SELECT * FROM ADDRESSES_TABLE WHERE user_id = $1`,[user_id],(err,result)=>{
        if(err){
            res.status(400).json(`Error quering the database : ${err}`);
            return;
        }
        res.status(200).json(result.rows);
        return;
    })
}

const deleteAddress = (req,res) => {
    const {address_id} = req.params;
    client.query(`DELETE FROM ADDRESSES_TABLE WHERE address_id = $1`,[address_id],(err,result)=>{
        if(err){
            res.status(400).json(`Error quering the database : ${err}`);
            return;
        }
        res.status(200).json(result.rows);
    })
}

const getUserAndAddress = (req,res)=>{

}

module.exports = {allUsers,specificUser , createUser , deleteUser , addAddress , getAddressByUser , deleteAddress ,getUserAndAddress};