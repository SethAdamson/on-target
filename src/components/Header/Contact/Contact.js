import React, {Component} from 'react';
import './Contact.css';
import {connect} from 'react-redux';

class Contact extends Component {
    constructor(){
        super();

        this.state = {
            message: '',
            emailSubject: '',
        }

        this.handleContact = this.handleContact.bind(this);

    }

    handleContact(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        console.log(this.props, this.state)
        return (
            <div className={this.props.contactClick ? 'contact-shown' : 'contact-hidden'}>
                <div className='contact-content'>
                    <h2 className='contact-title'>We want to hear from you!</h2>
                    <hr />
                    <h3 className='contact-section'>Subject:</h3>
                    <input name='emailSubject' className='email-subject' onChange={this.handleContact}/>
                    <h3 className='contact-section'>Message:</h3>
                    <input name='message' className='email-message' onChange={this.handleContact}/>
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