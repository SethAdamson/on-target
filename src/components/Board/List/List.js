import React, {Component} from 'react';
import './List.css';
import Card from './Card/Card'
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {RIEInput} from 'riek';
import _ from 'lodash';
import {updateListTitle, addCard} from '../../../ducks/reducer';



class List extends Component {
    constructor(){
        super();

        this.state = {
            adding: false,
            newCardTitle: '',
        }

        this.changeListTitle = this.changeListTitle.bind(this);
        this.addingCard = this.addingCard.bind(this);
        this.changeCard = this.changeCard.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.cancelNew = this.cancelNew.bind(this);

    }

    changeListTitle(val){
        // console.log(val);
        this.props.updateListTitle(this.props.list_id, {title: val.text, board_id: this.props.board_id});
    }

    addingCard(){
        this.setState({adding: true})
    }

    changeCard(e){
        this.setState({[e.target.name]: e.target.value})
    }

    addNewCard(){
        let {newCardTitle} = this.state;
        let {list_id, author_id, board_id} = this.props;
        this.props.addCard({newCardTitle, list_id, author_id, board_id})
        this.cancelNew();
    }

    cancelNew(){
        this.setState({adding:false, newCardTitle: ''})
    }

    render(){
        let {cards, list_id, list_title, editFn} = this.props;
        let {adding} = this.state;
        let cardDisplay = cards.map(card => {
            // console.log(card.list_id, list_id);
            if(card.list_id === list_id) {
                return (
                    <div className='card-parent' 
                        key={card.id} 
                        onClick={() => editFn({id: card.id, desc: card.description, title: card.card_title})}
                        >
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
                    <RIEInput value={list_title} 
                        propName='text' 
                        className='list-title'
                        change={this.changeListTitle} 
                        validate={_.isString}/>
                    <div className='card-list' >
                        {cardDisplay}
                        {adding ? 
                        <div>
                            <input name='newCardTitle' className='list-new-card' onChange={this.changeCard}/>
                            <a className='delete-footer'>
                                <button className='add-card-button' onClick={this.addNewCard}>Add Card</button> 
                                <FontAwesome className='delete'  name='far fa-times fa-lg' onClick={this.cancelNew}/>
                            </a>
                        </div> 
                        :
                        <a className='add-new' onClick={this.addingCard}>
                            <FontAwesome className='add' name="far fa-plus" />
                            Add New Card
                        </a>
                        }
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

export default connect(mapStateToProps, {updateListTitle, addCard})(List);