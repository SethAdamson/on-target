import React, {Component} from 'react';
import './NewBoard.css';
import {connect} from 'react-redux';
import {addBoard} from '../../../ducks/reducer';
import FontAwesome from 'react-fontawesome';
import {Redirect} from 'react-router-dom';

class NewBoard extends Component {
    constructor(){
        super();

        this.state = {
            newBoardName: '',
            redirect: false,
            pathBoard: undefined,
            pathUser: undefined,
        }

        this.newBoard = this.newBoard.bind(this);
        this.handleNewBoard = this.handleNewBoard.bind(this);

    }

    handleNewBoard(e){
        this.setState({[e.target.name]: e.target.value})
    }

    newBoard(){
        let {newBoardName} = this.state;
        let {user, addBoard} = this.props;
        addBoard({newBoardName, author_id: user.id}).then(res => {
            // console.log(res);
            let newID = 0;
            res.value.forEach(e => {
                if(e.id > newID){
                    newID = e.id;
                }
            })
            // console.log(user.id, newID);
            this.setState({redirect: true, pathUser: user.id, pathBoard: newID})
        })   
    }

    render(){
        // console.log(this.props, this.state)
        let {redirect, pathBoard, pathUser} = this.state;
        if(redirect){
            return(
                <Redirect to={`/boards/${pathUser}/${pathBoard}`} />
            )
        }
        return (
            <div className={this.props.newBoardClick ? 'newboard-shown' : 'newboard-hidden'}>
                <div className='newboard-content'>
                    <h2 className='newboard-title'>
                        Create a new Board
                        <FontAwesome className='delete newboard-delete'  name='far fa-times fa-lg' onClick={this.props.newBoardToggle}/>
                    </h2>
                    <input name='newBoardName' className='home-create newboard-title' placeholder='Enter Title Here' onChange={this.handleNewBoard}/>
                    <button className='home-create-button send-email' onClick={this.newBoard}>Create</button>
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

export default connect(mapStateToProps, {addBoard})(NewBoard);