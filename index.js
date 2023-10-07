const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app = express();
app.use(cors());
app.use(express.json());

app.use("/api/product",productRouter);
app.use("/api/user",userRouter);

app.get("/",(req,res)=>{
    res.status(200).json("<h1>Hello</h1>")
})

app.use(express.json());
app.listen(8002,()=>{
    console.log("Server started at port number 3001");
})