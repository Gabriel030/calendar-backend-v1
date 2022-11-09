const { check } = require("express-validator");
const { isDate } = require("../../helpers/isDate");
const { validarCampos } = require("../validar-campos");


const getEventosValidation = []

const crearEventosValidation = [
  check("title", "El titulo es obligatorio").not().isEmpty(),
  check("start", "Fecha de inicio es obligatoria").custom(isDate),
  check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
  validarCampos
]


module.exports = {
  getEventosValidation,
  crearEventosValidation
}