const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors');

const db = new Sequelize({
   dialect: 'sqlite',
   storage:  './database.sqlite',

})

var columns = {
    date: {type: DataTypes.DATE},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
}

var Notes = db.define('Notes', columns);

db.sync()
  .then(() => {
     console.log ('Banco de dados sincronizado.');
  })
  .catch(error => {
     console.log('Erro ao sincronizar banco de dados.',error);
  })

  var api = express()

  api.use(cors());
  api.use(express.json());
  api.use(express.urlencoded());

  api.get("/", function(requisicao,resposta){
    resposta.json({mensagem: "minha primeira API!"})
  });


  api.get("/dev",function(requisicao,resposta){
    resposta.json({desenvolvedor:"Julia Amaral", idade:"16 anos",linguagens:"JavaScript,HTML,CSS"})
  })

  api.get("/notes", async function(req,res){
    var data = await Notes.findAll();
    res.json(data);
  })

  api.post("/notes", async function(rec,res){
    await Notes.create(rec.body)
    res.send();
  })

  api.delete("/notes", async function(rec,res){
    await Notes.destroy({where: {id: rec.body.id}})
  })

  api.listen(4000, function(){ 
    console.log("API EM FUNCIONAMENTO");
    console.log("http://localhost:4000/");});
    