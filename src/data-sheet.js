// export function getAll(board) {
//     let URL = [
//         '/auth/user',
//         `/boards`,
//         `/lists/${id}`,
//         `/cards/${id}`,
//         `/boards/${id}`
//     ];

//     let promiseArr = URL.map(url => axios.get(url));
//     axios.all(promiseArr).then(res => {
//         let temp = res.map(r => r.data);
//         console.log(temp);
//     })


//     let temp = [];

//     axios.all([getUser(), getBoards(), getLists(board), getCards(board), getSingleBoard(board)])
//     .then(res => {
//         temp = res.map(r => r.data);
//     });
//     console.log(temp);
// }
