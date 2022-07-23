const { program } = require("commander");
const { prompt } = require('inquirer');
const { addTarea, listarTareas, deleteTarea, actualizarTarea, findTarea } = require("./controllers/tarea.controllers");

program
  .version("0.0.1")
  .description(
    "Interfaz para realizar operaciones CRUD desde la línea de comandos"
  );
const preguntas = [
  {
    type: "input",
    message:"Tarea título",
    name:"title"
  },
  {
    type: "input",
    message:"Tarea descripción",
    name:"description"
  }
]
program.command("save").alias("s").action(async () => {
  const tarea = await prompt(preguntas);
  
  addTarea(tarea);
});

program.command('list').alias("l").action( async () => await listarTareas());

program.command('delete <id>').alias("d").action( async (_id)=> await deleteTarea(_id))

program.command("update <id>").alias("u").action(async (_id) => {
  
  const tarea = await prompt(preguntas);
  
  actualizarTarea(_id,tarea);
});

program.command("find <palabra>").alias("f").action( async (palabra)=> findTarea(palabra))

program.parse(process.argv);
