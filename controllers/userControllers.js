const client = require("../database/pgres.js");
/*
  user_id       SERIAL          PRIMARY KEY,
  name          VARCHAR(50)     NOT NULL,
  email         VARCHAR(50)     NOT NULL       UNIQUE,
  google_id     VARCHAR(35)     NOT NULL       UNIQUE,
  picture       VARCHAR(255),
  address       VARCHAR(255)
*/

const allUsers = async (req,res) => {
    client.query(`SELECT * FROM USERS_TABLE`,(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({message:`Error : ${err}`});
            return;
        }
        res.status(200).json(result);
        return;
    })
}

const specificUser = (req,res) => {
    const {id} = req.params;
    client.query(`SELECT * FROM USERS_TABLE WHERE user_id = $1 `,[id],(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({message:`Error ${err}`});
            return;
        }
        req.status(200).json(result);
        return;
    })
}

const createUser = (req,res) => {
    const {user_id , name , email , google_id , picture , address} = req.body;
    if(!user_id || !name || !email || !google_id || !picture || !address){
        res.status(400).json({message:"Fill The Complete Data"});
        return;
    }
    client.query(`SELECT user_id FROM USERS_TABLE WHERE user_id = $1 OR google_id=$2`,[user_id,google_id],(err,result)=>{
        if(err){
            res.status(400).json({message:"Error quering to database"});
            return;
        }
        console.log(result);
        if(result !== null){
            res.status(400).json({message:"User is already present"});
            return;
        }
        client.query(`INSERT INTO USERS_TABLE (name, email, google_id, picture, address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id`,[user_id , name , email , google_id , picture , address],(err,result)=>{
            if (err) {
                console.error('Error inserting data:', err);
              } else {
                const insertedUserId = result.rows[0].user_id;
                console.log(`User with ID ${insertedUserId} inserted successfully.`);
              }
        })
    })
}
module.exports = {allUsers,specificUser , createUser};