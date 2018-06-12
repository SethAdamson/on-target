module.exports= {
    getBoards: (req,res) => {
        const db = req.app.get('db');
        const {id} = req.user

        db.get_boards_user([id])
        .then(boards => {
            res.status(200).send(boards)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    }
}