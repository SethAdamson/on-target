import React, {Component} from 'react';
import './Search.css';
import {connect} from 'react-redux';
import axios from 'axios';

class Search extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        let {search, searchToggle, searchFocus, boards, lists, cards} = this.props;
        console.log(this.props, this.state)
        let boardsFilter = [];
        let listsFilter = [];
        let cardsFilter = [];
        if(search){
            searchFocus();
            boardsFilter = boards.filter(b => b.name === search);
            listsFilter = lists.filter(l => l.list_title === search);
            cardsFilter = cards.filter(c => c.card_title === search);
        }

        let boardsDisplay = boardsFilter.map(b => <div key={b.id}>{b.name}</div> );
        let listsDisplay = listsFilter.map(l => <div key={l.list_id}>{l.list_title}</div>);
        let cardsDisplay = cardsFilter.map(c => <div key={c.id}>{c.card_title}</div>);

        return (
            <div className={searchToggle ? 'search-shown' : 'search-hidden'}>
                <div className='search-content'>
                    <h4 className='search-title'>Boards: {boardsDisplay}</h4>
                    <h4 className='search-title'>Lists: {listsDisplay}</h4>
                    <h4 className='search-title'>Cards: {cardsDisplay}</h4>
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        boards: state.boards,
        lists: state.lists,
        cards: state.cards
    }
}

export default connect(mapStateToProps)(Search);