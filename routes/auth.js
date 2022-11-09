/*
    Rutas de Usuarios / Auth 
    host + /api/auth
*/
const {validarJWT} = require("../middlewares/validar-jwt")
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth");
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {newUserValidation, loginValidation} = require("../middlewares/authValidations/authValidations")


router.post("/new", newUserValidation , crearUsuario);

router.post("/", loginValidation  , loginUsuario );

router.get("/renew",validarJWT,  revalidarToken);

module.exports = router;
