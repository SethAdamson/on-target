import React, {Component} from 'react';
import './Header.css';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import targetWhite from '../../images/targetWhite.png';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(){
        super();

        this.state = {
            search: '',
        }

        this.changeHeader = this.changeHeader.bind(this);

    }

    changeHeader(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        // console.log(this.props);
        return(
            <div className='head-parent'>
                <div className='head-content'>
                    <div className='head-search'>
                        <button className='board-search'>
                            <img className='head-target' src={targetWhite} alt='boards' />
                            Boards
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
                        <button className='board-search mini'>New</button>
                        <button className='board-search mini'>Note</button>
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
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);