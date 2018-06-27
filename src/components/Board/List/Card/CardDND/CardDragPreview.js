import React from 'react';
import Card from '../Card';

const styles = {
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
  width: '235px',
  height: '75px',
  backgroundColor: 'rgba(250,250,250)',
  borderRadius: '5px'
};

function CardDragPreview(props){

  return (
    <div style={styles}>
      <Card title={props.title}/>
    </div>
  );
};


export default CardDragPreview;