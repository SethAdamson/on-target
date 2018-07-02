import React, {Component} from 'react';
import List from './List';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {moveListDB, moveListRender} from '../../../ducks/reducer';
import {DropTarget} from 'react-dnd';
import {Types, OFFSET_WIDTH, LIST_WIDTH, LIST_MARGIN} from '../../../constants';

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
  };

const listTarget = {
    hover(props, monitor, component){
        const hover_x = props.list_x;
        let item = monitor.getItem();
        const placeIdx = getPlaceIndex(
            monitor.getClientOffset().x,
            findDOMNode(component).scrollLeft
            );
        // console.log(placeIdx);
        component.setPlaceIdx(placeIdx);
        document.getElementById(`list${item.list_id}`).style.display = 'none';
        // console.log(hover_x);
    },
    drop(props, monitor, component){
        let drop_x = component.state.listPlaceIdx;
        let item = monitor.getItem();
        let {board_id, list_x, list_id} = item;
        let boardLists = props.lists.filter(list => list.board_id === board_id)
        let dragList = boardLists[list_x];
        document.getElementById(`list${item.list_id}`).style.display = 'block';


        if(list_x>drop_x){
            drop_x+=1;
        }
        // console.log('List Drop values', list_id, list_x, drop_x, board_id, props.lists);
        boardLists.splice(list_x, 1);
        boardLists.splice(drop_x, 0 , dragList)
        props.moveListRender(boardLists);
        props.moveListDB(list_id, list_x, drop_x, board_id);
        component.setPlaceIdx(undefined);
    }
};


function listDropCollect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item:monitor.getItem()
    };
}

class BoardList extends Component{
    constructor(){
        super();

        this.state = {
            listPlaceIdx: undefined,
        }

        this.setPlaceIdx = this.setPlaceIdx.bind(this);
        this.setDropValue = this.setDropValue.bind(this);

    }

    setPlaceIdx(val){
        this.setState({listPlaceIdx: val});
    }

    setDropValue(val){
        this.setState({listDrop: val});
    }

    render(){
        let {lists, connectDropTarget, canDrop} = this.props;
        let {listPlaceIdx} = this.state;
        
        let isPlaceHold = false;
        let listDisplay = [];
        let filteredLists = lists.filter(list => list.board_id === this.props.board_id)
        // console.log(filteredLists);
        filteredLists.forEach((list, i) => {
          if (canDrop) {
            isPlaceHold = false;
            if (i === 0 && listPlaceIdx === -1) {
              listDisplay.push(<div key="placeholder" className="list-parent placeholder" />);
            } else if (listPlaceIdx > i) {
              isPlaceHold = true;
            }
          }
          if (list !== undefined) {
            listDisplay.push(
                <div className='list-parent' key={list.list_id} id={`list${list.list_id}`}>
                    <List 
                    list_id={list.list_id}                                                                                                                                                                                                                                      
                    list_title={list.list_title}
                    author_id={list.author_id}
                    team_id={list.team_id}
                    board_id={this.props.board_id}
                    board_location={list.board_location}
                    editFn={this.props.editFn}
                    list_x={i}
                    setPlaceIdx={this.setPlaceIdx}
                    setDropValue={this.setDropValue}
                    />
                </div> 
            );
          }
          if (canDrop && listPlaceIdx === i) {
            listDisplay.push(<div key="placeholder" className="list-parent placeholder" />);
          }
        });
    
        // if placeholder index is greater than array.length, display placeholder as last
        if (isPlaceHold) {
          listDisplay.push(<div key="placeholder" className="list-parent placeholder" />);
        }

        return connectDropTarget(
            <div className='board-list-parent'>
                {listDisplay}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        lists: state.lists,
    }
}

let dndBoardList = DropTarget(Types.LIST, listTarget, listDropCollect)(BoardList);

export default connect(mapStateToProps,{moveListDB, moveListRender})(dndBoardList);