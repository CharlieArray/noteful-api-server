const express = require('express');
const app = require('../app');
const jsonParser = express.json();
const {NotesService} = require('./notes-service')

app.get('/api/notes', (req, res, next =>{
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance)
    .then(data =>{
        res.status(200)
        res.json(data)
    })
    .catch(next)
}))
