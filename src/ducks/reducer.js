import axios from 'axios';

let initialState = {
    // id: 0,
    // first_name: '',
    // last_name: '',
    // profile_img: '',
    // username: '',
    // email: '',
    // team_id: 0,
    // team_name: '',
    // board_id: 0,
    // board_name: '',
    // background_color: '',
    // list_id: 0,
    // list_title: '',
    // card_id: 0,
    // card_title: '',
    // card_description: '',
    user: {},
    teams: [],
    boards: [],
    lists: [],
    cards: []
};

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';
const GET_USER_DATA = 'GET_USER_DATA';
const GET_BOARDS = 'GET_BOARDS';


export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_USER_DATA + FULFILLED:
            return Object.assign({}, state, {user: action.payload})
        case GET_BOARDS + FULFILLED:
            return Object.assign({}, state, {boards: action.payload})
        default:
            return state;
    }
}

export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data);
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getBoards() {
    let boardData = axios.get(`/boards`).then(res => res.data);
    return {
        type: GET_BOARDS,
        payload: boardData
    }
}