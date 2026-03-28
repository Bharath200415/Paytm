const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try{
        console.log("token", token);

        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded);
        if (decoded.userId){
            req.userId = decoded.userId;

            next();
        }else{
            return res.status(403).json({
                message:"bhai issue hai"
            });

        }
        
    }catch(err){
        console.log("JWT ERROR:", err.message);
        return res.status(403).json({
            err
        });
    }
};

module.exports = {
    authMiddleWare
}