require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config');
const bodyParser = express.json()

const NotesService = require('./notes/notes-service')
const FoldersService =require('./folders/folders-service')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//Basic Hello Route Test
 app.get('/', (req, res, next) => {  
      res.status(200)
      res.json('Hello World')
  })




/*----------Folder HTTP Method Routes------------*/

  //GET folders ALL
  app.get('/folders', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getAllFolders(knexInstance)
    .then(data => {
        res.status(200)
        res.json(data)
    })
    .catch(next)
  })

  //GET folder ID
  app.get('/folders/:folder_id', (req,res,next)=>{
    const knexInstance = req.app.get('db')
    const {folder_id} = req.params
    FoldersService.getFolderId(knexInstance, folder_id)
    .then(data =>{
      res.status(200)
      res.json(data)
    })
    .catch(next)
  })


//CREATE folder
app.post('/folders', bodyParser, (req,res,next) => {
  const {folder_name} = req.body
  const folderName = {folder_name}
  const knexInstance = req.app.get('db')
  FoldersService.createFolder(knexInstance, folderName)
  .then(response =>{
    response = 'Successfully Created'
    res.status(201)
    res.json(response)
  })
  .catch(next)
})

//DELETE folder
app.delete('/folders/:folder_id', (req,res,next)=>{
  const {folder_id} = req.params
  const knexInstance = req.app.get('db')
  FoldersService.deleteFolder(knexInstance, folder_id)
  .then((response) => {
    response = "Successfully Deleted"
    res.status(204)
    res.send(response)
  })
  .catch(next)
})

//UPDATE folder
app.put('/folders/:folder_id', bodyParser, (req,res,next)=>{
  const {folder_id} = req.params
  const {folder_name} =req.body
  const folderName = {folder_name}
  const knexInstance = req.app.get('db')
  FoldersService.updateFolder(knexInstance, folder_id, folderName)
  .then((data) => {
    res.status(204)
    res.json(data)
  })
  .catch(next)
})


/*----------Notes HTTP Method Routes------------*/

  //GET notes ALL
  app.get('/notes', (req, res, next) =>{
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance)
    .then(data =>{
        res.status(200)
        res.send(data)
    })
    .catch(next)
  })

  //GET notes ID
  app.get('/notes/:id', (req,res,next) => {
    const {id} = req.params
    const knexInstance = req.app.get('db')
    NotesService.getNoteId(knexInstance, id)
    .then(data =>{
      res
        .status(200)
        .send(data)
    })
    .catch(next)
  })

  //CREATE note
  app.post('/notes', bodyParser, (req,res,next) => {
    const {note_name, reference_folder_id, content} = req.body
    const note_contents = {note_name, reference_folder_id, content}
    const knexInstance = req.app.get('db')
    NotesService.createNote(knexInstance, note_contents)
    .then(data =>{
      res.status(201)
      res.send(data)
    })
    .catch(next)
  })

  //DELETE note
  app.delete('/notes/:id', (req,res,next)=>{
    const {id} = req.params
    const knexInstance = req.app.get('db')
    NotesService.deleteNote(knexInstance, id)
    .then((response) => {
      response = "Successfully Deleted"
      res.status(204)
      res.send(response)
    })
    .catch(next)
  })

  //UPDATE note
  app.put('/notes/:id', bodyParser, (req,res,next)=>{
    const {id} = req.params
    const {note_name, reference_folder_id, content} =req.body
    const note_contents = {note_name, reference_folder_id, content}
    const knexInstance = req.app.get('db')
    NotesService.updateNote(knexInstance, id, note_contents)
    .then((data) => {
      res.status(204)
      res.send(data)
    })
    .catch(next)
  })

app.use(function errorHandler(error, req, res, next) {
  let response;
  console.error(error);
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
