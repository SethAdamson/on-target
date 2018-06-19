import React, {Component} from 'react';
import './Card.css';
import {DragSource} from 'react-dnd';
import {Types} from '../../../../constants';

const cardSource = {
    // canDrag(props){
    //     return props.isReady;
    // }
    isDragging(props, monitor){
        console.log(props);
        return monitor.getItem().id === props.id;
    },
    beginDrag(props, monitor, component){
        console.log(props);
        const item = {id: props.id};
        return item;
    },
    endDrag(props, monitor, component){
        if(!monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log(item, dropResult);
        
        // CardActions.moveCardToList(item.id, dropResult.listId);
    }
};

function collect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}


class Card extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        console.log(this.props);
        let{title, isDragging, connectDragSource} = this.props
        return connectDragSource(
            <div className='card-content' >
                <a className='card-title'>
                    {title}
                </a> 
            </div> 
        )
    }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);