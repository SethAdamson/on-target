import React, {Component} from 'react';
import './Card.css';


export default class Card extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        let{title} = this.props
        return(
            <div className='card-content'>
                {title}
            </div> 
        )
    }
}