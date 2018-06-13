import React, {Component} from 'react';
import './Board.css';
import List from './List/List';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getLists, 
        getCards, 
        getUser, 
        getBoards, 
        getSingleBoard,
        updateBoardName
    } from '../../ducks/reducer';
import {RIEInput} from 'riek';
import _ from 'lodash';

class Board extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
        }

        this.changeBoardName = this.changeBoardName.bind(this);

    }

    componentDidMount(){
        let {board} = this.props.match.params
        this.props.getUser();
        this.props.getBoards();
        this.props.getLists(board);
        this.props.getCards(board);
        this.props.getSingleBoard(board);
    }

    changeBoardName(val){
        this.props.updateBoardName(this.props.singleBoard.id, {name: val.text});
    }



    render(){
        // let {backgroundColor, boardName} = this.props.location.state
        let {lists, singleBoard} = this.props;
        let {title} = this.state;
        let listDisplay = lists.map(list => {
            return (
                <div className='list-parent' key={list.list_id}>
                    <List 
                    list_id={list.list_id}                                                                                                                                                                                                                                      
                    list_title={list.list_title}
                    author_id={list.author_id}
                    team_id={list.team_id}
                    board_id={singleBoard.id}
                    />
                </div> 
            )
        })
        return(
            <div className='board-parent' style={{backgroundColor: singleBoard.background_color}}>
                <Header/>
                <div className='board-content'>
                    <div className='board-header'>
                        <RIEInput value={singleBoard.name ? singleBoard.name : title} 
                                propName='text' 
                                className='board-name'
                                change={this.changeBoardName} 
                                validate={_.isString}/>
                    </div> 
                    <div className='board-list'>
                        {listDisplay}
                    </div> 
                </div>
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        boards: state.boards,
        lists: state.lists,
        singleBoard: state.singleBoard
    }
}

export default connect(mapStateToProps,{getLists, getCards, getUser, getBoards, getSingleBoard, updateBoardName})(Board);