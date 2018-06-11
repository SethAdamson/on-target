import React, {Component} from 'react';
import './Board.css';
import List from './List/List';
import Header from '../Header/Header'

export default class Board extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header/>
                Board
                <List />
            </div> 
        )
    }
}
