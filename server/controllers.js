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
    },
    updateBoardName: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {name} = req.body;
        // console.log(req.body, id);

        db.update_board_name([name, id])
        .then(board => {
            res.status(200).send(board)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    },
    updateListTitle: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {title, board_id} = req.body;
        // console.log(req.body, id);

        db.update_list_title([title, id, board_id])
        .then(lists => {
            res.status(200).send(lists)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    },
    addCard: (req, res) => {
        const db = req.app.get('db');
        const {newCardTitle, list_id, author_id, board_id} = req.body;

        db.add_card([newCardTitle, list_id, author_id, board_id])
        .then(cards => {
            res.status(200).send(cards)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
    },
    addBoard: (req, res) => {
        const db = req.app.get('db');
        const {newBoardName, author_id} = req.body;
        const team_id = 1;

        db.add_board([newBoardName, author_id, team_id])
        .then(ret => {
            db.add_default_lists([ret[0].id, author_id]).then(boards => {
            res.status(200).send(boards);
            })
            .catch((e) => {
                console.log(e); 
                res.status(500).send(e)
        })
        .catch((e) => {
            console.log(e); 
            res.status(500).send(e)
        })
        })
    },
}