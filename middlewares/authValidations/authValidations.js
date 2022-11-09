const { check } = require("express-validator");
const { validarCampos } = require("../validar-campos");

const newUserValidation = [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ]

const loginValidation = [
    // middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ]



module.exports = {
    newUserValidation,
    loginValidation

}