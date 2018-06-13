import React, {Component} from 'react';
import './Home.css';
import Nav from './Nav/Nav';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser, getBoards} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
        }

        this.changeHome = this.changeHome.bind(this);

    }

    componentDidMount(){
        this.props.getUser();
        this.props.getBoards();
    }

    changeHome(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        // console.log(this.props);
        let display = this.props.boards.map(board => {
            return (
                <div className='boards-list' key={board.id}>
                    <Link to={`/${this.props.user.id}/${board.id}/${board.name}`}>
                        {board.name}
                    </Link>
                </div> 
            )
        })
        return(
            <div className='home-parent'>
                <Header/>
                <div className='home-content'>
                    <Nav />
                    <div className='create-board'>
                        <h2 className='create-title'>Get your life On-Target today!</h2>
                        <input name='title' className='home-create' onChange={this.changeHome}/>
                        <button className='home-create-button'>Create Your Board</button>
                    </div>
                    <div className='home-list'>
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

export default connect(mapStateToProps, {getUser, getBoards})(Home);
