const { response } = require("express");
//const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs")
const Evento = require("../models/Evento")
/* -------------------------------------------------------------------------  */
const getEventos = async (req, res = response) => {
    
    const eventos = await Evento.find() .populate("user", "name");
    
    try {
        
              return  res.status(200).json({
            ok:true,
            msg:eventos
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "error to search events"
        });
    }


}

/* -------------------------------------------------------------------------  */
const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body)
    try {
        //le estoy agregando la propiedad user y el id
        evento.user = req.uid

        const eventoGuardado = await evento.save()
        return  res.status(200).json({
            ok:true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "error to create events"
        });
    }


}


/* -------------------------------------------------------------------------  */
const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id
    const uid = req.uid
    
    try {

        const evento = await Evento.findById(eventoId)
        //validar que el id que me pasan es valido
        if ( !evento){
            return response.status(404).json({
                ok: false, 
                msg: "Evento no existe por ese id"
            })
        }

        //validar que el user que quiere actualizar es quien creo el evento a modificar
        if(evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg: "no tiene privilegios"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //el tercer argumento es para que se guarde la ultima actualizacion, 
        //por defecto me retorna la actualizacion anterior para comparar
        //pero en mongo ya esta actualizado, 
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});
        
       return  res.status(200).json({
            ok:true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "error to uptaded events"
        });
    }


}

/* -------------------------------------------------------------------------  */
const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId)
        console.log(evento)
        //validar que el id que me pasan es valido
        
        if ( !evento){
            return response.status(404).json({
                ok: false, 
                msg: "Evento no existe por ese id"
            })
        }
        
        //validar que el user que quiere eliminar es quien creo el evento a modificar
        if(evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg: "no tiene privilegios"
            })
        }
        
        await Evento.findByIdAndDelete(eventoId)

        return  res.status(200).json({
                ok:true,
                msg: "events deleted successfully",
                
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "error to delete events"
        });
    }


}
/* -------------------------------------------------------------------------  */
module.exports = {
    getEventos, 
    crearEvento,
    actualizarEvento,
    eliminarEvento,

}