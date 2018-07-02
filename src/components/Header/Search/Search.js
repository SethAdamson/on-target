import React, {Component} from 'react';
import './Search.css';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
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
        let searchLower = search.toLowerCase();
        if(search){
            searchFocus();
            boardsFilter = boards.filter(b => {
                if(_.includes(b.name.toLowerCase(), searchLower)){
                    return b;
                }
            });
            listsFilter = lists.filter(l => {
                if(_.includes(l.list_title.toLowerCase(), searchLower)){
                    return l;
                }
            });
            cardsFilter = cards.filter(c => {
                if(_.includes(c.card_title.toLowerCase(), searchLower)){
                    return c;
                }
            });
        }

        console.log(boardsFilter, cardsFilter, listsFilter);

        let boardsDisplay = boardsFilter.map(b => {
            return (
                <Link to={`/boards/${b.author_id}/${b.id}`} key={b.id} style={{ textDecoration: 'none', color: 'grey'}}>
                    <div className='search-list-name grow' key={b.id}>{b.name}</div>
                </Link>
            )
        });
        let listsDisplay = listsFilter.map(l => {
            return(
                <Link to={`/boards/${l.author_id}/${l.board_id}`} key={l.list_id} style={{ textDecoration: 'none', color: 'grey' }}>
                    <div className='search-list-name grow' key={l.list_id}>{l.list_title}</div>
                </Link>
            )
        });
        let cardsDisplay = cardsFilter.map(c =>{
            return (
                <Link to={`/boards/${c.author_id}/${c.board_id}`} key={c.id} style={{ textDecoration: 'none', color: 'grey' }}>
                    <div className='search-list-name grow' key={c.id}>{c.card_title}</div>
                </Link>
            )
        });

        console.log(boardsDisplay, cardsDisplay, listsDisplay);

        return (
            <div className={searchToggle ? 'search-shown' : 'search-hidden'}>
                <div className='search-content'>
                    <h4 className='search-title'>Boards:</h4>
                    <hr />
                    <div className='search-list'>{boardsDisplay}</div> 
                    <h4 className='search-title'>Lists:</h4>
                    <hr />
                    <div className='search-list'>{listsDisplay}</div> 
                    <h4 className='search-title'>Cards:</h4>
                    <hr />
                    <div className='search-list'>{cardsDisplay}</div> 
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