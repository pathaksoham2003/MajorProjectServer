const express = require("express");
const cors = require("cors");

app = express();
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json("<h1>Hello</h1>")
})

app.use(express.json());
app.listen(3001,()=>{
    console.log("Server started at port number 3001");
})