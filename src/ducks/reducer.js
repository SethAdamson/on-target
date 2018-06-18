import axios from 'axios';

let initialState = {
    user: {},
    teams: [],
    boards: [],
    lists: [],
    cards: [],
    singleBoard: {},
    shouldRender: false
};

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';
const GET_USER_DATA = 'GET_USER_DATA';
const GET_BOARDS = 'GET_BOARDS';
const GET_LISTS = 'GET_LISTS';
const GET_CARDS = 'GET_CARDS';
const GET_SINGLE_BOARD = 'GET_SINGLE_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD_TITLE';
const UPDATE_LIST_TITLE = "UPDATE_LIST_TITLE";
const ADD_CARD = 'ADD_CARD';
const ADD_BOARD = 'ADD_BOARD';
const ADD_LIST = 'ADD_LIST';
const REMOVE_CARD = 'REMOVE_CARD';


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
        case UPDATE_BOARD + FULFILLED:
            return Object.assign({}, state, {singleBoard: action.payload})
        case UPDATE_LIST_TITLE + FULFILLED:
            return Object.assign({}, state, {lists: action.payload})
        case ADD_CARD + FULFILLED:
            return Object.assign({}, state, {cards: action.payload})
        case ADD_LIST + FULFILLED:
            return Object.assign({}, state, {lists: action.payload})
        case ADD_BOARD + FULFILLED:
            return Object.assign({}, state, {boards: action.payload})
        case REMOVE_CARD + FULFILLED:
            return Object.assign({}, state, {cards: action.payload})
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
    let singleData = axios.get(`/boards/${id}`).then(res => res.data[0]);
    return {
        type: GET_SINGLE_BOARD,
        payload: singleData
    }
}

export function updateBoard(id, val){
    let newBoard = axios.put(`/change/boards/${id}`, val).then(res => res.data[0]);
    return {
        type: UPDATE_BOARD,
        payload: newBoard,
    }
}

export function updateListTitle(id, val){
    let newTitle = axios.put(`/change/lists/${id}`, val).then(res => res.data);
    return {
        type: UPDATE_LIST_TITLE,
        payload: newTitle,
    }
}

export function addCard(val){
    let newCard = axios.post(`/add/cards`, val).then(res => res.data);
    return {
        type: ADD_CARD,
        payload: newCard,
    }
}

export function addList(val){
    let newList = axios.post(`/add/lists`, val).then(res => res.data);
    return {
        type: ADD_LIST,
        payload: newList,
    }
}

export function addBoard(val){
    let newBoard = axios.post(`/add/boards`, val).then(res => res.data);
    return {
        type: ADD_BOARD,
        payload: newBoard,
    }
}

export function removeCard(board_id, card_id){
    let updatedCards = axios.delete(`/remove/card/${board_id}/${card_id}`).then(res => res.data);
    return {
        type: REMOVE_CARD,
        payload: updatedCards,
    }
}
