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
        updateBoard,
        addList,
    } from '../../ducks/reducer';
import {RIEInput} from 'riek';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import ColorMenu from './ColorMenu/ColorMenu';
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
            newDesc: '',
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
        this.getInfo();
    }

    componentDidUpdate(props){
        if (props.match.params.board !== this.props.match.params.board){
                this.getInfo();
        };
    }

    getInfo(){
        let {board} = this.props.match.params;
        let {getUser, getBoards, getCards, getLists, getSingleBoard} = this.props;
        axios.all([getUser(), getBoards(), getLists(board), getCards(board), getSingleBoard(board)])
        .then();
    }

    changeBoardName(val){
        this.props.updateBoard(this.props.singleBoard.id, {name: val.text});
    }

    handleBoard(e){
        this.setState({[e.target.name]: e.target.value})
    }

    editCard(obj){
        console.log(obj);
        this.setState({
            cardEditting: true, 
            editID: obj.id,
            editDesc: obj.desc,
            editTitle: obj.title,
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
        this.props.addList({newListTitle, board_id :this.props.singleBoard.id})
        this.cancelNewList();
    }

    editColor(){
        this.setState({colorMenu: !this.state.colorMenu})
    }

    render(){
        // let {backgroundColor, boardName} = this.props.location.state
        let {lists, singleBoard} = this.props;
        let {title, cardEditting, editDesc, editTitle, addingList, colorMenu} = this.state;

        let bgstyle = {};
        if(singleBoard.background_img){
            bgstyle = {backgroundImage: `url(${singleBoard.background_img})`};
        } else {
            bgstyle = {backgroundColor: singleBoard.background_color};
        }

        let listDisplay = lists.map(list => {
            return (
                <div className='list-parent' key={list.list_id}>
                    <List 
                    list_id={list.list_id}                                                                                                                                                                                                                                      
                    list_title={list.list_title}
                    author_id={list.author_id}
                    team_id={list.team_id}
                    board_id={singleBoard.id}
                    editFn={this.editCard}
                    />
                </div> 
            )
        })
        return(
            <div className={singleBoard.background_img ? 'board-parent board-image' : 'board-parent'} style={bgstyle}>
                {cardEditting ?
                    <div className='edit-card' onClick={this.cancelCardEdit}> 
                        <section className='edit-content' onClick={(e) => this.stopPropCard(e)}>
                            <div className='edit-title'>
                                {editTitle}
                                <FontAwesome className='delete'  name='far fa-times fa-lg' onClick={this.cancelCardEdit}/>
                            </div> 
                            <div className='description'>
                                {editDesc ? 
                                    {editDesc}
                                :
                                    <input name='newDesc' className='new-desc' onChange={this.handleBoard} />      
                                }
                            </div>
                        </section>
                    </div>
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
                        <p className='colormenu-button' onClick={this.editColor}>
                            Change Background
                        </p>
                        <ColorMenu colorClick={colorMenu} currentID={singleBoard.id} editColorFn={this.editColor}/>
                    </div> 
                    <div className='board-list'>
                        {listDisplay}
                        {addingList ? 
                            <div>
                                <input name='newListTitle' className='new-list-input' onChange={this.handleBoard}/>
                                <a className='delete-footer'>
                                    <button className='add-list-button' onClick={this.addNewList}>Add List</button> 
                                    <FontAwesome className='delete'  name='far fa-times fa-lg' onClick={this.cancelNewList}/>
                                </a>
                            </div> 
                            :
                            <a className='list-parent add-new' onClick={this.addingList}>
                                <FontAwesome className='add' name="far fa-plus" />
                                Add New List
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

export default withRouter(connect(mapStateToProps,{addList, getLists, getCards, getUser, getBoards, getSingleBoard, updateBoard})(Board));