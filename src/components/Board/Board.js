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
import FontAwesome from 'react-fontawesome';

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
        }

        this.changeBoardName = this.changeBoardName.bind(this);
        this.editCard = this.editCard.bind(this);
        this.cancelCardEdit = this.cancelCardEdit.bind(this);
        this.handleBoard = this.handleBoard.bind(this);

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

    handleBoard(e){
        this.setState({[e.target.name]: e.target.value})
    }

    editCard(obj){
        console.log(obj);
        this.setState({
            cardEditting: true, 
            editID: obj.id,
            editDesc: obj.desc,
            editTitle: obj.title
        })
    }

    cancelCardEdit(){
        this.setState({cardEditting: false});
    }

    render(){
        // let {backgroundColor, boardName} = this.props.location.state
        let {lists, singleBoard} = this.props;
        let {title, cardEditting, editDesc, editTitle} = this.state;
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
            <div className='board-parent' style={{backgroundColor: singleBoard.background_color}}>
                {cardEditting ?
                    <div className='edit-card' > 
                        <section className='edit-content'>
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