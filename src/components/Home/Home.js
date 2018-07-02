import React, {Component} from 'react';
import './Home.css';
import Nav from './Nav/Nav';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getLists, 
        getCards, 
        getUser, 
        getBoards,
        addBoard
} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import homeVideo from '../../media/HomeVideo.mp4';
import LogoTarget from '../../media/LogoTarget.png';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            newBoardName: '',
        }

        this.handleHome = this.handleHome.bind(this);
        this.addNewBoard = this.addNewBoard.bind(this);

    }

    componentDidMount(){
        // let {getUser, getBoards, getCards, getLists} = this.props;
        // axios.all([getUser(), getBoards(), getLists(), getCards()]);
    }

    handleHome(e){
        this.setState({[e.target.name]: e.target.value});
    }

    addNewBoard(){
        let {newBoardName} = this.state;
        let {boards, user, addBoard} = this.props;
        addBoard({newBoardName, author_id: user.id}).then(res => {
            // console.log(res);
            let newID = 0;
            res.value.forEach(e => {
                if(e.id > newID){
                    newID = e.id;
                }
            })
            this.props.history.push(`/boards/${user.id}/${newID}`)
        })   
    }

    render(){
        // console.log(this.props);
        let display = this.props.boards.map(board => {
            let bgstyle = {};
            if(board.background_img){
                bgstyle = {backgroundImage: `url(${board.background_img})`};
            } else {
                bgstyle = {backgroundColor: board.background_color};
            }
            return (
                <Link to={{
                            pathname: `/boards/${this.props.user.id}/${board.id}`,
                            state: {
                                backgroundColor: board.background_color,
                                boardName: board.name,
                            }
                        }} 
                    style={{textDecoration: 'none', color: 'grey'}} 
                    key={board.id}>
                    
                    <div className='boards-list'>
                        <span className='home-background-piece' style={bgstyle}>
                        </span>
                        <h3 className='boards-list-name'>
                            {board.name}
                        </h3>
                    </div> 
                </Link>
            )
        })
        return(
            <div className='home-parent'>
                <div className='home-header'>
                    <Header/>
                </div>
                <div className='home-content'>
                    <Nav />
                    <div className='create-board'>
                        <video className='home-video' autoPlay='true' muted>
                            <source src={homeVideo} type='video/mp4'/>
                        </video>
                        <h2 className='create-title'>Get <img src={LogoTarget} alt='logo' className='logo-home-create' /> today!</h2>
                        <input name='newBoardName' className='home-create' onChange={this.handleHome} placeholder='Enter Title Here'/>
                        <button className='home-create-button' onClick={this.addNewBoard}>Create Your Board</button>
                    </div>
                    <div className='home-list'>
                        <h2 className='home-list-title'>My Boards</h2>
                        {display}
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

export default connect(mapStateToProps, {getUser, getBoards, addBoard, getCards, getLists})(Home);
