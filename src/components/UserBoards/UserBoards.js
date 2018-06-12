import React, {Component} from 'react';
import './UserBoards.css';
import Header from '../Header/Header';


export default class UserBoards extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div className='userboard-parent'>
                <Header/>
                UserBoards
            </div> 
        )
    }
}