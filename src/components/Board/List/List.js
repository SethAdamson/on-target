import React, {Component} from 'react';
import './List.css';
import {findDOMNode} from 'react-dom';
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
import {DragSource, DropTarget} from 'react-dnd';
import {Types, OFFSET_WIDTH, LIST_WIDTH, LIST_MARGIN} from '../../../constants';
import axios from 'axios';

function getPlaceIndex(x, scrollX) {
    // shift placeholder if y position more than card height / 2
    const xPos = x - OFFSET_WIDTH + scrollX;
    let placeIdx;
    if (xPos < LIST_WIDTH / 2) {
      placeIdx = -1; // place at the start
    } else {
      placeIdx = Math.floor((xPos - LIST_WIDTH / 2) / (LIST_WIDTH + LIST_MARGIN));
    }
    return placeIdx;
  }

const listSource = {
    // canDrag(props){
    //     return props.isReady;
    // }
    isDragging(props, monitor){
        console.log(props);
        return monitor.getItem().id === props.id;
    },
    beginDrag(props, monitor, component){
        console.log(props);
        const {list_id, title, list_x, board_id} = props;
        return {list_id, title, list_x, board_id};
    },
    endDrag(props, monitor, component){
        if(!monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log(item, dropResult);
    }
};

const listTarget = {
    hover(props, monitor, component){
        const hover_x = props.list_x;
        let item = monitor.getItem();
        const placeIdx = getPlaceIndex(
            monitor.getClientOffset().x,
            findDOMNode(component).scrollLeft
          );
        props.setPlaceIdx(placeIdx);
        document.getElementById(item.list_id).style.display = 'none';
        console.log(hover_x);
    },
    drop(props, monitor, component){
        const drop_x = props.list_x;
        let item = monitor.getItem();
        document.getElementById(item.list_id).style.display = 'block';
        console.log(drop_x);
    }
}

function listSourceCollect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}

function listDropCollect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item:monitor.getItem()
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
        axios.put(`/lists/update/${list_id}`, {list_x}).then();
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
        let {list_id, list_title, editFn, connectDropTarget, connectDragSource, board_id, isOver, canDrop, setDropValues} = this.props;
        let {adding} = this.state;
        setDropValues(isOver, canDrop);
        console.log(this.props);
        return connectDragSource(connectDropTarget(
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
        ))
    }
}

// function mapStateToProps(state){
//     return {
//         cards: state.cards
//     }
// }

let dndList = DropTarget(Types.LIST, listTarget, listDropCollect)(DragSource(Types.LIST, listSource, listSourceCollect)(List));

export default connect(null, {updateListTitle, addCard, removeList})(dndList);