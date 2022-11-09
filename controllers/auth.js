const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs")
const {generarJWT} = require("../helpers/jwt")


/* ------------------------------------------------------------------------------ */
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  //creo una instancia de mi schema Usuario, y le paso el req.body, solo vaa tomar lo que yo haya seteado en el mismo, lo demas lo descarta

  try {
    //valido que no exista el usuario en la bd sino retorno un 400
    let usuario = await Usuario.findOne({ email: email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    
    usuario = new Usuario(req.body);
    //encriptar contraseña
    const salt = bcrypt.genSaltSync(); 
    usuario.password = bcrypt.hashSync(password, salt)

    //guardar en BD el nuevo usuario
    await usuario.save();

    //Generar nuestro JWT 
    const token = await generarJWT(usuario.id, usuario.name)
    
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token
    });

    //ERRORES
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};


/* ------------------------------------------------------------------------------ */
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;


  try {
      //encuentro y traigo al usuario por el email
        const  usuario = await Usuario.findOne({ email: email });

      //valido que exista el usuario
        if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: "El usuario no existe con ese correo",
        });
        }
    //confirmar el password ingresado, contra el que tiene el user que busque por email
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if(!validPassword){
        res.status(400).json({
            ok:false,
            msg: "password is incorrect"
        })
    }

    //si llego aca , es por q va a estar autenticado 

    //Generar nuestro JWT 
    const token = await generarJWT(usuario.id, usuario.name)


    return res.status(200).json({
        ok:true,
        uid: usuario.uid,
        name:usuario.name,
        msg: "usuario autenticado",
        token:token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
  
};


/* ------------------------------------------------------------------------------ */
const revalidarToken = async  (req, res = response) => {

    const {uid, name} = req;    
    try {
        //generar un nuevo JWT y retornarlo en esta peticion 
        const token = await generarJWT(uid, name)


        res.json({
            ok: true,
            token
             
          
          });
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok:false,
            msg: "error al revalidarToken"
        })
    }

    
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
