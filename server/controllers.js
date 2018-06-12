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
    },
    getLists: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_lists([id])
        .then(lists => {
            // console.log('ctrl', lists);
            res.status(200).send(lists)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    },
    getCards: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_cards([id])
        .then(cards => {
            res.status(200).send(cards)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    },
    getSingleBoard: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

        db.get_single_board([id])
        .then(board => {
            res.status(200).send(board)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    }
}