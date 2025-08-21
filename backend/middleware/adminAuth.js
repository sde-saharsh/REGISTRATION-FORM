import jwt from 'jsonwebtoken'
import 'dotenv/config'

const adminAuth = async (req,res,next) =>{
    try {
        
        const {token} = req.headers
        if(!token) {
            return res.json({success:false,message:"Not Authorized Login Again ,,HIii"})
        }
        
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log(token_decode);
        
        if(token_decode.username != process.env.ADMIN_USERNAME ){
            return res.json({success:false,message:"Not Authorized Login Again,,byee"})
        }
        next()
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message +"hi"})
    }
}

export default adminAuth