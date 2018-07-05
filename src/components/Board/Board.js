import React, {Component} from 'react';
import './Board.css';
import BoardList from './List/BoardList';
import Header from '../Header/Header';
import CardEdit from './List/CardEdit/CardEdit';
import {connect} from 'react-redux';
import {getLists, 
        getCards, 
        getUser, 
        getBoards, 
        getSingleBoard,
        updateBoard,
        addList,
        removeCard
    } from '../../ducks/reducer';
import {RIEInput} from 'riek';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import BoardMenu from './BoardMenu/BoardMenu';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Board extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
            cardEditting: false,
            editID: 0,
            editTitle: '',
            editDesc: '',
            editImg: '',
            editFile: '',
            editList: '',
            editLocation: '',
            addingList: false,
            newListTitle: '',
            colorMenu: false,
        }

        this.changeBoardName = this.changeBoardName.bind(this);
        this.editCard = this.editCard.bind(this);
        this.cancelCardEdit = this.cancelCardEdit.bind(this);
        this.handleBoard = this.handleBoard.bind(this);
        this.cancelNewList = this.cancelNewList.bind(this);
        this.addingList = this.addingList.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.editColor = this.editColor.bind(this);

    }

    componentDidMount(){
        let {board} = this.props.match.params;
        this.props.getSingleBoard(board);
    }

    componentDidUpdate(props){
        if (props.match.params.board !== this.props.match.params.board){
                this.getInfo();
        };
    }

    getInfo(){
        let {board} = this.props.match.params;
        let {getUser, getBoards, getCards, getLists, getSingleBoard} = this.props;
        axios.all([getUser(), getBoards(), getLists(board), getCards(board), getSingleBoard(board)]);
    }

    changeBoardName(val){
        let {board} = this.props.match.params;
        this.props.updateBoard(board, {name: val.text}, this.props.boards);
    }

    handleBoard(e){
        this.setState({[e.target.name]: e.target.value})
    }

    editCard(obj){
        // console.log(obj);
        this.setState({
            cardEditting: true, 
            editID: obj.id,
            editDesc: obj.desc,
            editTitle: obj.title,
            editImg: obj.card_img,
            editFile: obj.card_file,
            editList: obj.list,
            editLocation: obj.list_location
        })
    }

    cancelCardEdit(){
        this.setState({cardEditting: false});
    }

    stopPropCard(e){
        e.stopPropagation();
    }

    cancelNewList(){
        this.setState({addingList:false, newListTitle: ''})
    }

    addingList(){
        this.setState({addingList:true})
    }

    addNewList(){
        let {newListTitle} = this.state;
        let boardLocation = this.props.lists.filter(l => l.board_id === this.props.singleBoard.id).length;
        this.props.addList({newListTitle, board_id :this.props.singleBoard.id, boardLocation})
        this.cancelNewList();
    }

    editColor(){
        this.setState({colorMenu: !this.state.colorMenu})
    }

    render(){
        let {singleBoard} = this.props;
        let thisBoard = this.props.boards.filter(board => board.id === +this.props.match.params.board);
        if(thisBoard.length !== 0){
            singleBoard = thisBoard[0];
        }
        // console.log(this.props.boards);
        let {title, cardEditting, editID, editDesc, editTitle, addingList, colorMenu, editFile, editImg, editLocation, editList, listPlaceIdx, listCanDrop, listIsOver} = this.state;
        
        let bgstyle = {};
        if(singleBoard){
            if(singleBoard.background_img){
                bgstyle = {backgroundImage: `url(${singleBoard.background_img})`};
            } else {
                bgstyle = {backgroundColor: singleBoard.background_color};
            }
        }

        return(
            <div className={singleBoard.background_img ? 'board-parent board-image' : 'board-parent'} style={bgstyle}>
                {cardEditting ?
                    <CardEdit handleBoard={this.handleBoard} 
                        editDesc={editDesc} 
                        editID={editID} 
                        editTitle={editTitle} 
                        cancelCardEdit={this.cancelCardEdit}
                        stopPropCard={this.stopPropCard}
                        editLocation={editLocation}
                        editList={editList}
                        editImg={editImg}
                        editFile={editFile}
                        removeCard={this.props.removeCard}
                        board_id={singleBoard.id}
                        />
                    :
                    <section className='no-edit'>
                    </section>
                }
                <Header currentBoard = {singleBoard.id}/>
                <div className='board-content'>
                    <div className='board-header'>
                        <RIEInput value={singleBoard.name ? singleBoard.name : title} 
                                propName='text' 
                                className='board-name'
                                change={this.changeBoardName} 
                                validate={_.isString}/>
                        <p className='boardmenu-button' onClick={this.editColor}>
                            <FontAwesome className='menu-icon'  name='fas fa-ellipsis-v fa-lg' />
                            Menu
                        </p>
                        <BoardMenu colorClick={colorMenu} currentID={singleBoard.id} currentName={singleBoard.name} editColorFn={this.editColor}/>
                    </div> 
                    <div className='board-list-outer'>
                        <BoardList board_id={singleBoard.id} editFn={this.editCard}/>
                        {addingList ? 
                            <div>
                                <a className='add-list list-title'>
                                    <input name='newListTitle' className='new-list-input' onChange={this.handleBoard}/>
                                    <button className='add-button add-btn-list' onClick={this.addNewList}>Add</button> 
                                    <FontAwesome className=' add exit'  name='far fa-times fa-lg' onClick={this.cancelNewList}/>
                                </a>
                            </div> 
                            :
                            <a className='add-list add-list-outer' onClick={this.addingList}>
                                <FontAwesome className='add' name="far fa-plus" />
                                <h4 className='list-title-input'>Add New List</h4>
                            </a>
                        }
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

export default withRouter(connect(mapStateToProps,{removeCard, addList, getLists, getCards, getUser, getBoards, getSingleBoard, updateBoard})(Board));