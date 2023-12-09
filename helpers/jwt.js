const jwt = require('jsonwebtoken');

const generarJWT = (uid , name) =>{

    return new Promise( (resolve, reject) => {
        const payload = {uid, name}
        // console.log("LLAve ",process.env.JWT_SECRET_SEED)
        jwt.sign(payload, process.env.JWT_SECRET_SEED,{
            expiresIn:'2h'
        }, (err, token) =>{
            if( err ){
                console.log(err)
                reject("No se pudo genrar el token");
            }

            resolve(token);
        });
    });

}

module.exports = {
    generarJWT
}