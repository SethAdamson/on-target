import React, {Component} from 'react';
import './List.css';
import Card from './Card/Card'

export default class List extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div>
                List
                <Card />
            </div> 
        )
    }
}