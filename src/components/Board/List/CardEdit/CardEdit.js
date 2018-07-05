import React, {Component} from 'react';
import './CardEdit.css';
import FontAwesome from 'react-fontawesome';
import {RIEInput} from 'riek';
import _ from 'lodash';
import {connect} from 'react-redux';
import {updateCardTitle, updateCardDesc} from '../../../../ducks/reducer';

class CardEdit extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            newDesc: props.editDesc,
            newAttach: props.editFile,
        }

        this.handleCardEdit = this.handleCardEdit.bind(this);
        this.changeCardTitle = this.changeCardTitle.bind(this);
        this.rmvCard = this.rmvCard.bind(this);
        this.updateDesc = this.updateDesc.bind(this);

    }

    rmvCard(){
        let {board_id, editID, cancelCardEdit, editLocation, editList, removeCard} = this.props;
        removeCard(board_id, editID, editLocation, editList.list_id);
        cancelCardEdit();
    }

    handleCardEdit(e){
        this.setState({[e.target.name]: e.target.value})
    }

    changeCardTitle(val){
        this.props.updateCardTitle(this.props.editID, {title: val.text});
    }

    updateDesc(){
        let {editID, cancelCardEdit, updateCardDesc} = this.props;
        let {newDesc} = this.state;
        updateCardDesc(editID, newDesc);
        cancelCardEdit();
    }

    render (){
        let {board_id, editDesc, editTitle, editID, cancelCardEdit, stopPropCard, editLocation, editList, removeCard} = this.props;
        let {newDesc, newAttach} = this.state;
        // console.log(newDesc);
        return (
            <div className='edit-card' onClick={cancelCardEdit}> 
                <section className='edit-content' onClick={(e) => stopPropCard(e)}>
                    <div className='edit-title'>
                        <RIEInput value={editTitle} 
                            propName='text' 
                            className='cardedit-title'
                            change={this.changeCardTitle} 
                            validate={_.isString}/>
                        <FontAwesome className='cardedit-exit'  name='far fa-times fa-lg' onClick={cancelCardEdit}/>
                    </div> 
                    <div className='edit-description'>
                        <h3 className='cardedit-location'>Current List: {editList.list_title}</h3>
                        <h4 className='cardedit-list'>Description:</h4>
                        <textarea name='newDesc' className='new-desc' rows='5' cols='60' value={newDesc ? newDesc : ''} onChange={this.handleCardEdit} />
                        <button type='' className='add-button newdesc-btn' onClick={this.updateDesc} >Update Description</button>      
                        {/* <h4 className='cardedit-list'>Attachment:</h4>
                        <input type='file' name='newAttach' className='new-attach' value={newAttach ? newAttach : undefined} onChange={this.handleCardEdit} />       */}
                    </div>
                    <div className='cardedit-delete' onClick={this.rmvCard}>
                        <h3 className='cardedit-delete-title'>Remove Card?</h3>
                        <FontAwesome className='delete-icon' name='far fa-trash fa-lg' onClick={this.rmvCard} />
                    </div> 
                </section>
            </div>
        )
    }
}

export default connect(null,{updateCardTitle, updateCardDesc})(CardEdit);