import jwt from "jsonwebtoken";

const isLoggedIn = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        // console.log(token);
        if(!token){
            return res.redirect('/admin');
        }
        const tokenData = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(tokenData);
        req.role = tokenData.role;
        req.fullname = tokenData.fullname;
        next();
    }catch(err){
        res.status(401).send("invalid token");
    }
}

export default isLoggedIn;