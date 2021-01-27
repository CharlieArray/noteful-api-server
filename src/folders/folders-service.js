const FoldersService = {

    //READ ALL FOLDERS
    getAllFolders(knex){
        return(knex)
        .select("*")
        .from("folders")
    },

    //READ SPECIFIC FOLDER
    getFolderId(knex, folder_id){
        return(knex)
        .from('folders')
        .select('*')
        .where('folder_id', folder_id)
        .first()
    },

    //CREATE FOLDER
    createFolder(knex, folderName){
        return(knex)
        .insert(folderName)
        .into('folders')
        .returning('*')
    },


    //UPDATE / PUT FOLDER
    updateFolder(knex, folder_id, folderName){
        return(knex)
        .from('folders')
        .where('folder_id', folder_id)
        .update(folderName)
    },


    //DELETE FOLDER
    deleteFolder(knex, folder_id){
        return (knex)
        .from('folders')
        .select('*')
        .where('folder_id', folder_id)
        .delete()
    }

}

module.exports = FoldersService