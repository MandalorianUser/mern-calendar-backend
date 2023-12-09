const { response } = require('express');
const jwt = require('jsonwebtoken')

const revalidarJWT = (req, res =  response, next)=>{
    const token  = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
    }
        try {
            const {uid,name} = jwt.verify(
                token,
                process.env.JWT_SECRET_SEED
            )
            req.uid = uid;
            req.name = name;
            req.lastToken = token

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                ok:false,
                msg:'Token no valido'
            })
        }


    next();
}

module.exports = {
    revalidarJWT
}