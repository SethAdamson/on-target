import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

export default function Nav() {
    return(
        <div>
            <ul>
                <Link to='/home'>
                    <li className='nav-button nav-home'>Home</li>
                </Link>
                <Link to='/boards'>
                    <li className='nav-button nav-home'>Boards</li>
                </Link>
                <Link to='/profile'>
                    <li className='nav-button nav-home'>Profile</li>
                </Link>

            </ul>
        </div> 
    )
}

