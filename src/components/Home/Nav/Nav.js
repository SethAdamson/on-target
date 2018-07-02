import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

function Nav(props) {
    return(
        <div className='nav-content'>
            <ul className='navbar'>
                <Link to='/home' style={{textDecoration: 'none', color: 'grey'}}>
                    <span className='nav-list grow'>
                        <FontAwesome className='nav-icon' name='far fa-home fa-lg'/>
                        <li className='nav-button nav-home'>Home</li>
                    </span>
                </Link>
                <Link to='/myboards' style={{textDecoration: 'none', color: 'grey'}}>
                    <span className='nav-list grow'>
                        <FontAwesome className='nav-icon' name='fas fa-bullseye fa-lg'/>
                        <li className='nav-button nav-home'>Boards</li>
                    </span>
                </Link>
                <Link to={`/profile/${props.user.id}`} style={{textDecoration: 'none', color: 'grey'}}>
                    <span className='nav-list grow'>
                        <FontAwesome className='nav-icon' name='fas fa-user-circle fa-lg'/>
                        <li className='nav-button nav-home'>Profile</li>
                    </span>
                </Link>

            </ul>
        </div> 
    )
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Nav);

