import React, {Component} from 'react';
import './List.css';
import CardList from './Card/CardList';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {RIEInput} from 'riek';
import _ from 'lodash';
import {
        updateListTitle,
        addCard,
        removeList,
    } from '../../../ducks/reducer';
import {DragSource} from 'react-dnd';
import {Types} from '../../../constants';
import axios from 'axios';

const listSource = {
    // canDrag(props){
    //     return props.isReady;
    // }
    isDragging(props, monitor){
        // console.log(props);
        return monitor.getItem().id === props.id;
    },
    beginDrag(props, monitor, component){
        // console.log(props);
        const {list_id, title, list_x, board_id} = props;
        return {list_id, title, list_x, board_id};
    },
    endDrag(props, monitor, component){
        const item = monitor.getItem();
        if(!monitor.didDrop()) {
            document.getElementById(`list${item.list_id}`).style.display = 'block';
        }
    }
};

function listSourceCollect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}


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

    componentDidMount(){
        let {list_x, list_id} = this.props;
        axios.put(`/lists/update/${list_id}`, {list_x}).catch(e => console.log(e));
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
        let {list_id, author_id, board_id, cards} = this.props;
        let cardLocation = cards.filter(card => card.list_id === list_id).length;
        this.props.addCard({newCardTitle, list_id, author_id, board_id, cardLocation})
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
        let {list_id, list_title, editFn, connectDragSource, board_id} = this.props;
        let {adding, newCardTitle} = this.state;
        // console.log(this.props);
        return connectDragSource(
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
                            <form className='add-new add-input'>
                                <input name='newCardTitle' className='list-new-card' onChange={this.changeCard}/>   
                                <button className='add-card-button' onClick={newCardTitle ? this.addNewCard : this.cancelNew}>Add</button> 
                                <FontAwesome className='add exit'  name='far fa-times fa-lg' onClick={this.cancelNew}/>
                            </form>
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

let dndList = DragSource(Types.LIST, listSource, listSourceCollect)(List);

export default connect(mapStateToProps, {updateListTitle, addCard, removeList})(dndList);