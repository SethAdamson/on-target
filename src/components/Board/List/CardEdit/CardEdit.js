import React from 'react';
import './CardEdit.css';
import FontAwesome from 'react-fontawesome';

export default function CardEdit(props) {
    let {editDesc, editTitle, handleBoard, cancelCardEdit, stopPropCard, editLocation} = props;
    return (
        <div className='edit-card' onClick={cancelCardEdit}> 
            <section className='edit-content' onClick={(e) => stopPropCard(e)}>
                <div className='edit-title'>
                    <FontAwesome className='cardedit-delete'  name='far fa-times fa-lg' onClick={cancelCardEdit}/>
                    <h1 className='cardedit-title'>{editTitle}</h1>
                    <h3 className='cardedit-location'>{editLocation.list_title}</h3>
                </div> 
                <div className='description'>
                    {editDesc ? 
                        {editDesc}
                    :
                        <input name='newDesc' className='new-desc' onChange={handleBoard} />      
                    }
                </div>
            </section>
        </div>
    )
}