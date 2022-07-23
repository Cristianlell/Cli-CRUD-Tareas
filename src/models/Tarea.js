const { Schema, model } = require("mongoose");

const tareaSchema = new Schema({
     title:{type:String},
     description:{type:String},
},{
     timestamps:true,
     versionKey:false
})

module.exports = model('Tarea',tareaSchema);