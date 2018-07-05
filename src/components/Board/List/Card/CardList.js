import React, {Component} from 'react';
import Card from './Card';
import {findDOMNode} from 'react-dom';
import {DropTarget} from 'react-dnd';
import {Types, CARD_HEIGHT, CARD_MARGIN, OFFSET_HEIGHT} from '../../../../constants';
import {connect} from 'react-redux';
import {moveCardSame, moveCardList, getCards} from '../../../../ducks/reducer';
import _ from 'lodash';

function getPlaceIndex(y, scrollY) {
    // shift placeholder if y position more than card height / 2
    const yPos = y - OFFSET_HEIGHT + scrollY;
    let placeIdx;
    if (yPos < CARD_HEIGHT / 2) {
      placeIdx = -1; // place at the start
    } else {
      placeIdx = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
    }
    return placeIdx;
  }

const cardListDropTarget = {
    hover(props, monitor, component){
        const canDrop = monitor.canDrop();
        const item = monitor.getItem();
        const placeIdx = getPlaceIndex(
            monitor.getClientOffset().y,
            findDOMNode(component).scrollTop
          );
        component.setState({placeIdx});
        document.getElementById(`card${item.id}`).style.display = 'none';

    },
    drop(props, monitor, component){
        const item = monitor.getItem();
        document.getElementById(`card${item.id}`).style.display = 'block';
        const lastCard_x = monitor.getItem().card_x;
        const lastList = monitor.getItem().list_id;
        const nextList = props.list_id;
        let drop_x = component.state.placeIdx;
        let {id} = item;
        let boardCards = [...props.cards];

        if(monitor.didDrop()){
            return;
        }
        if(lastList !== nextList){
            drop_x += 1;
        }
        if(lastCard_x > drop_x){
            drop_x +=1;
        }
        if(lastList === nextList && lastCard_x === drop_x){
            return;
        } else if (lastList !== nextList){
            props.moveCardList(id, nextList, lastList, lastCard_x, drop_x, props.board_id, boardCards);
        } else if(lastList === nextList){
            props.moveCardSame(id, lastCard_x, drop_x, lastList, props.board_id, boardCards);
        }
        // console.log(id, nextList, lastList, lastCard_x, drop_x, props.board_id, boardCards);

    }
};

function cardListDropCollect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem(),
    }
};

class CardList extends Component {
    constructor(){
        super();

        this.state = {
            drop_x: undefined,
            placeIdx: undefined,
        }

        this.updateDropX = this.updateDropX.bind(this);

    }

    updateDropX(val){
        this.setState({drop_x: val})
    }

    render(){
        // console.log(this.props);
        let {cards, list_id, editFn, connectDropTarget, isOver, canDrop} = this.props;
        let {drop_x, placeIdx} = this.state;
        
        let isPlaceHold = false;
        let cardList = [];
        let cardsToSort = _.orderBy(cards, 'list_location');        

        cardsToSort.filter(e => e.list_id === list_id).forEach((card, i) => {
          if (isOver && canDrop) {
            isPlaceHold = false;
            if (i === 0 && placeIdx === -1) {
              cardList.push(<div key={"placeholder"+i} className="card-parent placeholder" />);
            } else if (placeIdx > i) {
              isPlaceHold = true;
            }
          }
          if (card !== undefined) {
            cardList.push(
                <div className='card-parent' 
                    key={card.id} 
                    id = {`card${card.id}`}
                    onClick={() => editFn({
                        id: card.id, 
                        desc: card.description, 
                        title: card.card_title,
                        editLocation: card.list_location, 
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
                        updateDropX = {this.updateDropX}
                        findCard = {this.findCard}
                        dropOutside = {this.dropOutside}
                    />
                </div> 
            );
          }
          if (isOver && canDrop && placeIdx === i) {
            cardList.push(<div key={"placeholder"+i} className="card-parent placeholder" />);
          }
        });
    
        // if placeholder index is greater than array.length, display placeholder as last
        if (isPlaceHold) {
          cardList.push(<div key="placeholder" className="card-parent placeholder" />);
        }
    
        // if there is no items in cards currently, display a placeholder anyway
        if (isOver && canDrop && cardList.length === 0) {
          cardList.push(<div key="placeholder" className="card-parent placeholder" />);
        }

        return connectDropTarget(
            <div className='cardlist-outside'>
                {cardList}
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

export default connect(mapStateToProps, {moveCardSame, moveCardList, getCards})(DropCards);