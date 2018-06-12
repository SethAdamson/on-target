import React, {Component} from 'react';
import './Board.css';
import List from './List/List';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getLists, getCards, getUser, getBoards, getSingleBoard} from '../../ducks/reducer';

class Board extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
        }
    }

    componentDidMount(){
        this.props.getUser();
        this.props.getBoards();
        this.props.getLists(this.props.match.params.board);
        this.props.getCards(this.props.match.params.board);
        this.props.getSingleBoard(this.props.match.params.board);
        // this.setState({title: this.props.lists[0].board_name});
    }



    render(){
        let {lists, singleBoard} = this.props
        console.log(singleBoard);
        let listDisplay = lists.map(list => {
            return (
                <div className='list-parent' key={list.list_id}>
                    <List 
                    list_id={list.list_id}                                                                                                                                                                                                                                      
                    list_title={list.list_title}
                    author_id={list.author_id}
                    team_id={list.team_id}
                    />
                </div> 
            )
        })
        return(
            <div className='board-parent' style={{backgroundColor: '#1ee6aa'}}>
                <Header/>
                <div className='board-content'>
                    <h2 className='board-name'></h2>
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

export default connect(mapStateToProps,{getLists, getCards, getUser, getBoards, getSingleBoard})(Board);
