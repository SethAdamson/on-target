import React, {Component} from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Nav from '../Home/Nav/Nav';
import {connect} from 'react-redux';
import {getUser, getBoards} from '../../ducks/reducer';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            editting: false,
            fName: props.user.first_name,
            lName: props.user.last_name,
            usernameLocal: props.user.username,
            emailLocal: props.user.email,
            imgLocal: props.user.profile_img
        }

        this.editToggle = this.editToggle.bind(this);
        this.handleProfile = this.handleProfile.bind(this);

    }

    componentDidMount(){
        this.props.getUser();
        this.props.getBoards();
    }

    editToggle(){
        this.setState({editting: !this.state.editting});
    }

    handleProfile(e){
        this.setState({[e.target.name]: e.target.value})
    }

    updateProfile(){
        let {id} = this.props.user;
        let {fName, lName, usernameLocal, emailLocal} = this.state;
        this.props.updateProfile(id, fName, lName, usernameLocal, emailLocal);
    }

    render(){
        let {editting, nameLocal, usernameLocal, emailLocal,  fName, lName, imgLocal} = this.state;
        console.log(this.props, usernameLocal, emailLocal, fName, lName);
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
                            <img src={imgLocal} alt='Profile' className='profile-picture' />
                            <div className='profile-info'>
                                <div className='profile-list'>
                                    <h4 className='profile-section-title'>Name:</h4>
                                    {editting ?
                                        <div className='profile-name-input'>
                                            <input types='text' name='fName' className='profile-input' value={fName} onChange={this.handleProfile}/>
                                            <input types='text' name='lName' className='profile-input' value={lName} onChange={this.handleProfile}/>
                                        </div> 
                                    :
                                        <div className='profile-list-name'>{`${fName} ${lName}`}</div> 
                                    }
                                </div>    
                                <div className='profile-list'>
                                    <h4 className='profile-section-title'>Username:</h4>
                                    {editting ?
                                        <input types='text' name='usernameLocal'  className='profile-input' value={usernameLocal} onChange={this.handleProfile}/>
                                    :
                                        <div className='profile-list-name'>{usernameLocal}</div> 
                                    }
                                </div>    
                                <div className='profile-list'>
                                    <h4 className='profile-section-title'>Email:</h4>
                                    {editting ?
                                        <input types='text' name='emailLocal' className='profile-input' value={emailLocal} onChange={this.handleProfile}/>
                                    :
                                        <div className='profile-list-name'>{emailLocal}</div> 
                                    }
                                </div>
                                {editting ?
                                        <button className='home-create-button profile-edit' onClick={this.editToggle}>Save Changes</button>
                                    :
                                        <button className='home-create-button profile-edit' onClick={this.editToggle}>Edit Profile</button> 
                                    } 
                                <a href={process.env.REACT_APP_LOGOUT} className='logout-tag' >
                                    <button className='home-create-button logout'>Log Out</button>
                                </a>
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
