const path = require('path')
const express = require('express');
const app = require('../app')
const jsonParser = express.json();
const {FoldersService} = require('./folders-service')


app.get('/', (req,res)=>{
    res.status(200)
    res.json('hello test test')
})

app.get('/api/folders', (req, res, next =>{
    const knexInstance = req.app.get('db')
    FoldersService.getAllNotes(knexInstance)
    .then(data =>{
        res.status(200)
        res.json(data)
    })
    .catch(next)
}))
