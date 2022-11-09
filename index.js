const express = require("express");
const dbConnection = require("./database/config");
require("dotenv").config();
const cors = require("cors")

//crear el servidor de express

const app = express();

//BASE DE DATOS
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static("public"));

//LECTURA Y PARSEO DEL BODY DE LAS RESPONSES
//lo q hago es pasar las peticiones por otro middleware, use
app.use(express.json());

//RUTAS
//el use es un MIDDLEWARE que me permite asignarle a un endopoint un controlador
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//todo: auth // crear, login, renew
//todo: crud : eventos

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

console.log("hola mundo!!!");
