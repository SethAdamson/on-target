import React, {Component} from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Nav from '../Home/Nav/Nav';
import {connect} from 'react-redux';
import {getUser, getBoards} from '../../ducks/reducer';
import {RIEInput} from 'riek';
import _ from 'lodash';

class Profile extends Component {
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
        let {profile_img, first_name, last_name, username, email} = this.props.user;
        return(
            <div className='profile-parent'>
                <div className='home-header'>
                    <Header/>
                </div>
                <div className='profile-content'>
                    <Nav />
                    <div className='profile-section'>
                        <h1 className='profile-title'> 
                            Profile
                        </h1>
                    <div className='profile-display'>
                        <img src={profile_img} alt='Profile' className='profile-picture' />
                        <div className='profile-info'>
                            <div className='profile-input'>
                                Name:
                                {`${first_name} ${last_name}`}
                                {/* <RIEInput value={`${first_name} ${last_name}`}
                                    propName='text' 
                                    className='profile-name-input'
                                    change={this.changeProfileName} 
                                    validate={_.isString}/> */}
                            </div>    
                            <div className='profile-input'>
                                Username:
                                {username}
                            </div>    
                            <div className='profile-input'>
                                Email:
                                {email}
                            </div>    
                        </div> 
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
    }
}

export default connect(mapStateToProps, {getUser, getBoards})(Profile);
