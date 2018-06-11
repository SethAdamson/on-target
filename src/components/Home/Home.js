import React, {Component} from 'react';
import './Home.css';
import Nav from './Nav/Nav';
import Header from '../Header/Header';

export default class Home extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Header/>
                <Nav />
                Home
            </div> 
        )
    }
}
