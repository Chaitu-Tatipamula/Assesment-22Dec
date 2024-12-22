const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")
module.exports = (role) => (req,res,next) =>{
    const token = req.header("authorization")?.split(" ")[1]
    if(!token){
        logger.warn(`Token not provided get profile failed`)
        return res.status(401).json({message : "Access denied token issue"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if(req.user.role !== role){
            logger.warn("Access denied, role doent match")
            return res.status(403).json({message : "Access denied"})
        }
        next()
    } catch (error) {
        return res.status(400).json({message : "Invalid token.."})
    }
}