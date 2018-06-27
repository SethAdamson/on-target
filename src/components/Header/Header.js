import React, {Component} from 'react';
import './Header.css';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import targetWhite from '../../images/targetWhite.png';
import {Link} from 'react-router-dom';
import BoardNav from './BoardNav/BoardNav';
import Contact from './Contact/Contact';
import {withRouter} from 'react-router-dom';

class Header extends Component {
    constructor(){
        super();

        this.state = {
            search: '',
            boardClick: false,
            contactClick: false,
        }

        this.changeHeader = this.changeHeader.bind(this);
        this.boardClickToggle = this.boardClickToggle.bind(this);
        this.contactClickToggle = this.contactClickToggle.bind(this);

    }

    changeHeader(e){
        this.setState({[e.target.name]: e.target.value});
    }

    boardClickToggle(){
        this.setState({boardClick: !this.state.boardClick})
    }

    contactClickToggle(){
        this.setState({contactClick: !this.state.contactClick})
    }

    render(){
        let {currentBoard} = this.props;
        let {boardClick, contactClick} = this.state;
        return(
            <div className='head-parent image-head1'>
                <div className='head-content'>
                    <div className='head-search'>
                        <BoardNav currentBoard = {currentBoard} boardClick={boardClick} clickToggle={this.boardClickToggle} className='boardnav' />
                        <button className='board-search' onClick={this.boardClickToggle}>
                            <p className='header-board-menu'>
                                <FontAwesome className='head-target' name='fas fa-bullseye fa-lg'/>
                                Boards
                            </p>
                        </button>
                        <input name='search' className='board-search head-input' onChange={this.changeHeader}/>
                        <FontAwesome  className='search-icon' name="far fa-search"></FontAwesome>
                    </div> 
                    {/* <Link to='/home' style={{textDecoration: 'none'}}> */}
                    <a className='head-title' href='/#/home' style={{textDecoration: 'none'}}>
                        <img className='title-logo' src={targetWhite} alt='logo' />
                        <h1 className='logo-title'>n-Target</h1>
                    </a> 
                    <div className='head-nav'>
                        <button className='board-search mini'>
                            <FontAwesome className='head-new' name='far fa-plus-square fa-lg' />
                        </button>
                        <button className='board-search mini' onClick={this.contactClickToggle}>
                            <FontAwesome className='head-note' name='far fa-at fa-lg' />
                        </button>
                        <Contact contactClick={contactClick} contactToggle={this.contactClickToggle} />
                        <Link to={`/profile/${this.props.user.id}`}>
                            <img className='profile-img' src={this.props.user.profile_img} alt='profile' />
                        </Link>
                    </div> 
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        boards: state.board
    }
}

export default withRouter(connect(mapStateToProps)(Header));