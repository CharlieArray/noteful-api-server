const knex = require ('knex')
const app = require('./app')

const {PORT, DB_URL} = require('./config')

//establish db/knex connection 
const db = knex({
    client: 'pg', 
    connection: DB_URL,
});


app.set('db', db)


app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})