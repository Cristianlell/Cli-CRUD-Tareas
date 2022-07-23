const Tarea = require('../models/Tarea');
const {connection} = require('../db');

const addTarea = async (tarea) =>{
     const {title, description} = await Tarea.create(tarea);
     console.log('Tarea Creada');
     await connection.close();
};

const findTarea = async (palabra)=>{
     const search = new RegExp(palabra,"i");
     const tarea = await Tarea.find({
          $or:[{title:search},{description:search}]
     })
     if(tarea.length === 0){
          console.log("Tarea no encontrada");
          await connection.close(); 
          process.exit(0)  
     }
     console.table(
          {
               id:tarea[0]._id.toString(),
               titulo:tarea[0].title,
               descripcion:tarea[0].description
          }
     )

     await connection.close();   
     process.exit(0)  
}

const listarTareas = async () =>{
     const res = await Tarea.find().lean();
     console.table(res.map(e => ({
          id:e._id.toString(),
          titulo:e.title,
          description:e.description
     })))
     await connection.close();
     process.exit(0)
};

const deleteTarea = async (_id) =>{
     console.log(_id);
     await Tarea.findByIdAndDelete(_id)
     console.log('Tarea eliminada');
     await connection.close();
}

const actualizarTarea = async (_id, tarea) => {
     
     await Tarea.updateOne({_id},tarea);
     console.log('Tarea actualizada');
     await connection.close();
}

module.exports = {
     addTarea,
     listarTareas,
     deleteTarea,
     actualizarTarea,
     findTarea
}