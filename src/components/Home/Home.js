import React, {Component} from 'react';
import './Home.css';
import Nav from './Nav/Nav';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

class Home extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    componentDidMount(){
        this.props.getUser();
    }

    render(){
        return(
            <div>
                <Header/>
                <Nav />
                Home
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Home);
