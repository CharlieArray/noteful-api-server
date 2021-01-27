const NotesService = {
    getAllNotes(knex){
        return(knex)
        .select('*')
        .from('notes')
    },

  //READ SPECIFIC NOTE 
   getNoteId(knex, id){
        return(knex)
        .select('*')
        .from('notes')
        .where('id', id)
        .first()
    },

    //CREATE NOTE
    createNote(knex, note_contents){
        return(knex)
        .insert(note_contents)
        .into('notes')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    //UPDATE / PUT NOTE
    updateNote(knex, id, note_contents){
        return(knex)
        .from('notes')
        .where('id', id)
        .update(note_contents)  
    },

    //DELETE NOTE
    deleteNote(knex, id ){
        return(knex)
        .from('notes')
        .where('id', id)
        .delete()
    },
}

module.exports = NotesService