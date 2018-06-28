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
        let {search} = this.props;
        console.log(this.props, this.state)
        return (
            <div className={search ? 'search-shown' : 'search-hidden'}>
                <div className='search-content'>

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