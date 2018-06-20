import React, {Component} from 'react';
import Card from './Card';
import {DropTarget} from 'react-dnd';
import {Types} from '../../../../constants';
import {connect} from 'react-redux';
import {moveCard} from '../../../../ducks/reducer';

const cardListDropTarget = {
    hover(props, monitor, component){
        const canDrop = monitor.canDrop();
    },
    drop(props, monitor, component){
        const lastCard_x = monitor.getItem().card_x;
        const lastList = monitor.getItem().list_id;
        const nextList = props.list_id;
        // const nextCard_x = 


        if(monitor.didDrop()){
            return;
        }
        const item = monitor.getItem();
        console.log(props);
        let {id} = item.item;

        props.moveCard(id, nextList, props.board_id);
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
    // constructor(){
    //     super();

    //     this.state = {
    //     }
    // }

    // componentDidMount(){
    // }

    render(){
        // console.log(this.props);
        let {cards, list_id, editFn, connectDropTarget} = this.props;

        let cardDisplay = cards.filter(e => e.list_id === list_id).map((card, i) => {
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
                        id={card.id}
                        title={card.card_title}
                        desc={card.description}
                        list_id={card.list_id}
                        author_id={card.author_id}
                        card_x={i}
                    />
                </div> 
            )
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

export default connect(mapStateToProps, {moveCard})(DropCards);