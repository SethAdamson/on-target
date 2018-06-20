import React, {Component} from 'react';
import './List.css';
import Card from './Card/Card';
import CardList from './Card/CardList';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {RIEInput} from 'riek';
import _ from 'lodash';
import {
        updateListTitle,
        addCard,
        removeList
    } from '../../../ducks/reducer';
// import {DropTarget} from 'react-dnd';
// import {Types} from '../../../constants';

// const listDropTarget = {
//     hover(props, monitor, component){
//         const canDrop = monitor.canDrop();
//     },
//     drop(props, monitor, component){
//         if(monitor.didDrop()){
//             return;
//         }
//         const item = monitor.getItem();
//         console.log(item);
//     }
// };

// function listDropCollect(connect, monitor){
//     return {
//         connectDropTarget: connect.dropTarget(),
//         isOver: monitor.isOver(),
//         canDrop: monitor.canDrop(),
//         item:monitor.getItem()
//     }
// };

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
        this.removeList = this.removeList.bind(this);

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

    removeList(){
        let {list_id, board_id} = this.props
        this.props.removeList(board_id, list_id);
    }

    render(){
        let {cards, list_id, list_title, editFn, connectDropTarget, board_id} = this.props;
        let {adding} = this.state;
        // console.log(this.props);
        return (
                <div className='list-content'>
                    <div className='list-title'>
                        <RIEInput value={list_title} 
                            propName='text' 
                            className='list-title-input'
                            change={this.changeListTitle} 
                            validate={_.isString}/>
                        <FontAwesome className='delete-icon'  name='far fa-trash fa-lg' onClick={this.removeList}/>
                    </div> 
                    <CardList list_id={list_id} editFn={editFn} board_id={board_id}/>
                    <div className='card-list-add' >
                        {adding ? 
                        <div>
                            <input name='newCardTitle' className='list-new-card' onChange={this.changeCard}/>
                            <a className='delete-footer'>
                                <button className='add-card-button' onClick={this.addNewCard}>Add Card</button> 
                                <FontAwesome className='exit'  name='far fa-times fa-lg' onClick={this.cancelNew}/>
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

// function mapStateToProps(state){
//     return {
//         cards: state.cards
//     }
// }

// let TargetList = DropTarget(Types.CARD, listDropTarget, listDropCollect)(List);

export default connect(null, {updateListTitle, addCard, removeList})(List);