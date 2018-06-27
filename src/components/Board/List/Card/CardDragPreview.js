import React from 'react';
import Card from './Card';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};

const propTypes = {
  card: PropTypes.object
};

const CardDragPreview = (props) => {
  styles.width = `${props.card.clientWidth || 235}px`;
  styles.height = `${props.card.clientHeight || 75}px`;

  return (
    <div style={styles}>
      <Card item={props.card.item} />
    </div>
  );
};


export default CardDragPreview;