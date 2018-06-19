import React, {Component} from 'react';
import Card from './Card';
import {DropTarget} from 'react-dnd';
import {Types} from '../../../../constants';
import {connect} from 'react-redux';

const cardListDropTarget = {
    hover(props, monitor, component){
        const canDrop = monitor.canDrop();
    },
    drop(props, monitor, component){
        if(monitor.didDrop()){
            return;
        }
        const item = monitor.getItem();
        console.log(item);
    }
};

function cardListDropCollect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item:monitor.getItem()
    }
};

class CardList extends Component {
    render(){
        let {cards, list_id, editFn, connectDropTarget} = this.props;
        let cardDisplay = cards.map(card => {
            if(card.list_id === list_id) {
                return (
                    <div className='card-parent' 
                        key={card.id} 
                        onClick={() => editFn({
                                        id: card.id, 
                                        desc: card.description, 
                                        title: card.card_title, 
                                        card_img: card.card_img, 
                                        card_file: card.card_file,
                                        list: {list_id: card.list_id, list_title: card.list_title }
                                    })}
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
        return connectDropTarget(
            <div className='cardlist-outside'>
                {cardDisplay}
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        cards: state.cards
    }
}

const DropCards = DropTarget(Types.CARD, cardListDropTarget, cardListDropCollect)(CardList);

export default connect(mapStateToProps)(DropCards);