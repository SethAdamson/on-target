import React, {Component} from 'react';
import './BoardNav.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class BoardNav extends Component {
    constructor(){
        super();

    }

    render(){
        let {currentBoard, boards} = this.props;
        let boardsList = [...boards];
        if(this.props.currentBoard){
            boardsList = boards.filter(board => board.id !== currentBoard);
        } 
        let display = boardsList.map(board => {
            let bgstyle = {};
            if(board.background_img){
                bgstyle = {backgroundImage: `url(${board.background_img})`};
            } else {
                bgstyle = {backgroundColor: board.background_color};
            }
            return (
                <Link to={`/boards/${this.props.user.id}/${board.id}`} key={board.id} style={{textDecoration: 'none', color: 'grey'}}>
                    <div className={`boards-list board-display grow`}  onClick={this.props.clickToggle}>
                            <span className='home-background-piece smaller-pic' style={bgstyle}>
                            </span>
                            <h3 className='boards-list-name smaller-name'>
                                {board.name}
                            </h3>
                    </div> 
                </Link>
            )
        })
        return (
            <div className={this.props.boardClick ? 'boardnav-shown' : 'boardnav-hidden'}>
                <div className='boardnav-content'>
                    <h2 className='boardnav-title'>Active Boards</h2>
                    {display}
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        boards: state.boards,
    }
}

export default withRouter(connect(mapStateToProps)(BoardNav));