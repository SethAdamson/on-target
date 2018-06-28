import React, {Component} from 'react';
import './UserBoards.css';
import Header from '../Header/Header';
import Nav from '../Home/Nav/Nav'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBoards, getUser} from '../../ducks/reducer';


class UserBoards extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    componentDidMount(){
        this.props.getUser();
        this.props.getBoards();
    }

    render(){
        console.log(this.props);
        let {boards} = this.props;
        let display = boards.map(board => {
            let bgstyle = {};
            if(board.background_img){
                bgstyle = {backgroundImage: `url(${board.background_img})`};
            } else {
                bgstyle = {backgroundColor: board.background_color};
            }
            return (
                <Link to={`/boards/${this.props.user.id}/${board.id}`} key={board.id} style={{ textDecoration: 'none' }}>
                    <div className={`userboard-display`}  onClick={this.props.clickToggle}>
                            <span className='userboard-list-background' style={bgstyle}>
                                <h3 className='userboard-list-title'>
                                    {board.name}
                                </h3>
                            </span>
                    </div> 
                </Link>
            )
        })
        return(
            <div className='userboard-parent'>
                <div className='home-header'>
                    <Header/>
                </div>
                <div className='userboard-content'>
                    <Nav />
                    <div className='userboard-list'>
                        <h1 className='userboard-title'> 
                            My Boards
                        </h1>
                    <div className='userboard-display'>
                        {display}
                    </div> 
                    </div> 
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        boards: state.boards
    }
}

export default connect(mapStateToProps, {getBoards, getUser})(UserBoards);
