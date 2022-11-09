const jwt = require("jsonwebtoken")

const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = {uid, name};

        //la firma tiene 4 argumentos -> 
                //payload osea la info del user
                //palabra secreta, q sirve para validar
                // objeto de propiedades
                //callback de error o el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "2h"
        }, (err, token) => {
            if(err){
                console.log(err);
                reject("No se pudo generar el token")
            }
            resolve(token)
        })

    })

}


module.exports = {
    generarJWT,
}