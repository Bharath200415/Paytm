const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());

app.use("/api/v1",mainRouter);

// router1.get('/login',function(req,res,next){
//     res.send(
//         console.log("hello")
//     )
//     console.log("Login route is working");
//     res.end();
// })

// app.use(router1);

app.listen(3000,function(err){
    if (err){
        console.log(err);
    }
})