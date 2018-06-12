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
    teams: {},
    boards: {},
    lists: {},
    cards: {}
};

const GET_USER_DATA = 'GET_USER_DATA';

export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_USER_DATA:
        return Object.assign({}, state, {user: action.payload})
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