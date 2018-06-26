import React, {Component} from 'react';
import './Card.css';
import {DragSource, DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import {Types} from '../../../../constants';
import axios from 'axios';
import {getEmptyImage} from 'react-dnd-html5-backend';

const cardSource = {
    // canDrag(props){
    //     return props.isReady;
    // }
    isDragging(props, monitor){
        // console.log(props);
        return monitor.getItem().id === props.id;
    },
    beginDrag(props, monitor, component){
        // console.log(props);
        const {id, title, card_x, list_id} = props;
        const {clientWidth, clientHeight} = findDOMNode(component);
        return {id, title, card_x, list_id, clientHeight, clientWidth};
    },
    endDrag(props, monitor, component){
        if(!monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        // console.log(item, dropResult);
        
        // CardActions.moveCardToList(item.id, dropResult.listId);
    }
};

const cardTarget = {
    hover(props, monitor, component){
        const hover_x = props.card_x;
        // console.log(hover_x);
        props.updateDropX(hover_x);
    },
    drop(props, monitor, component){
        const drop_x = props.card_x;
        // console.log(drop_x);
        props.updateDropX(drop_x);
    }
}

function sourceCollect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}

function dropCollect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
    };
}


class Card extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        let {card_x, id} = this.props;
        axios.put(`/cards/update/${id}`, {card_x}).catch(e => console.log(e));
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
    }

    // componentDidUpdate(props){
    //     if(props.card_x !== this.props.card_x){
    //         let {card_x, id} = this.props;
    //         axios.put(`/cards/update/${id}`, {card_x}).then();
    //     }
    // }

    render(){
        // console.log(this.props);
        let{title, isDragging, connectDragSource, connectDropTarget, connectDragPreview} = this.props
        return connectDragSource(connectDropTarget(
            <div className='card-content'>
                <a className='card-title'>
                    {title}
                </a> 
            </div> 
        ))
    }
}

let sourcing = DragSource(Types.CARD, cardSource, sourceCollect)(Card);
export default DropTarget(Types.CARD, cardTarget, dropCollect)(sourcing);
