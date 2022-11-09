/* RUTAS EVENTOS ----  host + /api/events   */
const {validarJWT} = require("../middlewares/validar-jwt")
const {getEventos , crearEvento, actualizarEvento , eliminarEvento} = require("../controllers/events")
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearEventosValidation } = require("../middlewares/eventsValidations/eventsValidations");


//SUBIR DE NIVEL LA VALIDACION DEL TOKEN
//esto se aplica para todas las rutas en este archivo
router.use(validarJWT)

/* -------------------------------------------------------------------------  */
// OBTENER EVENTOS
//Todas tienen que pasar por la validacion del JWT
router.get("/", getEventos)

/* -------------------------------------------------------------------------  */
// CREAR UN NUEVO EVENTO
router.post("/",  crearEventosValidation , crearEvento)


/* -------------------------------------------------------------------------  */
//ACTUALIZAR EVENTO
router.put("/:id",actualizarEvento)

/* -------------------------------------------------------------------------  */
//ELIMINAR EVENTO
router.delete("/:id", eliminarEvento)

module.exports = router; 