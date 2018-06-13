import React, {Component} from 'react';
import './List.css';
import Card from './Card/Card'
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';



class List extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        console.log(this.props);
        let {cards, list_id, list_title} = this.props;
        let cardDisplay = cards.map(card => {
            console.log(card.list_id, list_id);
            if(card.list_id === list_id) {
                return (
                    <div className='card-parent' key={card.id} >
                        <Card
                         id = {card.id}
                         title = {card.card_title}
                         desc = {card.description}
                         list_id = {card.list_id}
                         author_id = {card.author_id}
                        />
                    </div> 
                )
            }
        })
        return(
                <div className='list-content'>
                    <h3 className='list-title'>{list_title}</h3>
                    <div className='card-list' >
                        {cardDisplay}
                        <a className=' card-parent add-new'>
                            <FontAwesome className='add' name="far fa-plus" />
                            Add New Card
                        </a>
                    </div>
                </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        cards: state.cards
    }
}

export default connect(mapStateToProps)(List);