const jwt=require('jsonwebtoken')
const config=require('config')

function auth(req,res,next){
    const token=req.header('x-auth-token')
    //const token=req.body.token

    if (!token) return res.status(401).send('Access Denied')
    
    try{
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'))
        req.user=decoded
        // console.log(decoded)
        next()
    }
    catch(ex){
        res.send(ex)
        console.log(ex)
    }
}

module.exports=auth