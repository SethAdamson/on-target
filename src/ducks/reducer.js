import axios from 'axios';

let initialState = {
    user: {},
    teams: [],
    boards: [],
    lists: [],
    cards: [],
    singleBoard: []
};

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';
const GET_USER_DATA = 'GET_USER_DATA';
const GET_BOARDS = 'GET_BOARDS';
const GET_LISTS = 'GET_LISTS';
const GET_CARDS = 'GET_CARDS';
const GET_SINGLE_BOARD = 'GET_SINGLE_BOARD';


export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_USER_DATA + FULFILLED:
            return Object.assign({}, state, {user: action.payload})
        case GET_BOARDS + FULFILLED:
            return Object.assign({}, state, {boards: action.payload})
        case GET_LISTS + FULFILLED:
            return Object.assign({}, state, {lists: action.payload})
        case GET_CARDS + FULFILLED:
            return Object.assign({}, state, {cards: action.payload})
        case GET_SINGLE_BOARD + FULFILLED:
            return Object.assign({}, state, {singleBoard: action.payload})
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

export function getLists(id){
    console.log('reducer list', id);
    let listsData = axios.get(`/lists/${id}`).then(res => res.data);
    return {
        type: GET_LISTS,
        payload: listsData
    }
}

export function getCards(id){
    let cardsData = axios.get(`/cards/${id}`).then(res => res.data);
    return {
        type: GET_CARDS,
        payload: cardsData
    }
}

export function getSingleBoard(id){
    let singleData = axios.get(`/boards/${id}`).then(res => res.data);
    return {
        type: GET_SINGLE_BOARD,
        payload: singleData
    }
}