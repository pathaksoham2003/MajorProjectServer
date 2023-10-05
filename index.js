const express = require("express");
const cors = require("cors");

const client = require("./database/pgres.js");

const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app = express();
app.use(cors());

app.use("/products",productRouter);
app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.status(200).json("<h1>Hello</h1>")
})

app.use(express.json());
app.listen(3002,()=>{
    console.log("Server started at port number 3001");
})