import React, {Component} from 'react';
import './Profile.css';
import Header from '../Header/Header';

export default class Profile extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div className='profile-parent'>
                <div className='home-header'>
                    <Header/>
                </div>
                <div className='profile-content'>
                    Profile
                </div> 
            </div> 
        )
    }
}
