const FoldersService = {
    getAllNotes(knex){
        return(knex)
        .select("*")
        .from("folders")
    }


}

module.exports = {FoldersService}