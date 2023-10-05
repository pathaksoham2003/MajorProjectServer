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
        res.status(200).json(result.rows);
        return;
    })
}

const specificUser = (req,res) => {
    const {google_id} = req.params;
    client.query(`SELECT * FROM USERS_TABLE WHERE google_id = $1 `,[google_id],(err,result)=>{
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
    const { name , email , google_id , picture } = req.body;
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
module.exports = {allUsers,specificUser , createUser , deleteUser};