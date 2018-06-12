import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Nav(props) {
    return(
        <div>
            <ul>
                <Link to='/home'>
                    <li className='nav-button nav-home'>Home</li>
                </Link>
                <Link to='/boards'>
                    <li className='nav-button nav-home'>Boards</li>
                </Link>
                <Link to={`/profile/${props.user.id}`}>
                    <li className='nav-button nav-home'>Profile</li>
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

