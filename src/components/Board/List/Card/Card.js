import React, {Component} from 'react';
import './Card.css';
import {DragSource} from 'react-dnd';
import {Types} from '../../../../constants';

const cardSource = {
    // canDrag(props){
    //     return props.isReady;
    // }
    isDragging(props, monitor){
        return monitor.getItem().id === props.id
    },
    beginDrag(props, monitor, component){
        const item = {id: props.id};
        return item;
    },
    endDrag(props, monitor, component){
        if(!monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        
        // CardActions.moveCardToList(item.id, dropResult.listId);
    }
};

function collect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}


class Card extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        let{title} = this.props
        return(
            <a className='card-content'>
                {title}
            </a> 
        )
    }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);