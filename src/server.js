const knex = require ('knex')
const app = require('./app')

const {port, DB_URL} = require('./config')

//establish db/knex connection 
const db = knex({
    client: 'pg', 
    connection: DB_URL,
    // ssl: { rejectUnauthorized: false }
});


app.set('db', db)


app.listen(port, () =>{
    console.log(`Server is listening on http://localhost:${port}`)
})