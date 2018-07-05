import React, {Component} from 'react';
import './Contact.css';
import {connect} from 'react-redux';
import axios from 'axios';

class Contact extends Component {
    constructor(){
        super();

        this.state = {
            message: '',
            emailSubject: '',
        }

        this.handleContact = this.handleContact.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

    }

    handleContact(e){
        this.setState({[e.target.name]: e.target.value})
    }

    sendEmail(){
        let {user, contactToggle} = this.props;
        let {message, emailSubject} = this.state;
        axios.post('/send/email', {user, message, emailSubject});
        this.setState({message: '', emailSubject:''})
        contactToggle();
    }

    render(){
        // console.log(this.props, this.state)
        return (
            <div className={this.props.contactClick ? 'contact-shown' : 'contact-hidden'}>
                <div className='contact-content'>
                    <h2 className='contact-title'>We want to hear from you!</h2>
                    <hr className='hr-contact'/>
                    <h3 className='contact-section'>Subject:</h3>
                    <input name='emailSubject' className='email-subject' onChange={this.handleContact}/>
                    <h3 className='contact-section'>Message:</h3>
                    <textarea name='message' className='email-message' rows='10' cols='45' onChange={this.handleContact} />
                    <button className='home-create-button send-email' onClick={this.sendEmail}>Send Email</button>
                    <button className='home-create-button' onClick={this.props.contactToggle}>Cancel</button>
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

export default connect(mapStateToProps)(Contact);