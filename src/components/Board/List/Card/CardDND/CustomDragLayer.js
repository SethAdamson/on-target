import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import {Types} from '../../../../../constants';
import CardDragPreview from './CardDragPreview';
import _ from 'lodash';

// function snapToGrid(x, y) {
//     const snappedX = Math.round(x / 16) * 16;
//     const snappedY = Math.round(y / 16) * 16;
  
//     return [snappedX, snappedY];
// }

const layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
};

let subscribedToOffsetChange = false;

let dragPreviewRef = null;

function getItemStyles(props) {
	const { initialOffset, currentOffset } = props
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		}
	}

    let { x, y } = currentOffset;
    
    // if (props.snapToGrid) {
    //     x -= initialOffset.x;
    //     y -= initialOffset.y;
    //     [x, y] = snapToGrid(x, y);
    //     x += initialOffset.x;
    //     y += initialOffset.y;
    // }

	const transform = `translate(${x}px, ${y}px)`
	return {
		transform,
		WebkitTransform: transform,
	}
}

function CustomDragLayer (props) {
	const { item, itemType, isDragging } = props

	function renderItem() {
		switch (itemType) {
			case Types.CARD:
				return <CardDragPreview title={item.title}/>
			default:
				return null
		}
	}

	if (!isDragging) {
		return null
	}
	return (
		<div style={layerStyles}>
			<div style={getItemStyles(props)}>{renderItem()}</div>
		</div>
	)
}

let updates = 0;
export default DragLayer(monitor => {
    if(updates++ %10 === 0){
        return {
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: setInterval(monitor.getSourceClientOffset, 100),
            isDragging: monitor.isDragging(),
        }
    } else {
        return {
            // item: monitor.getItem(),
            // itemType: monitor.getItemType(),
            // initialOffset: monitor.getInitialSourceClientOffset(),
            // isDragging: monitor.isDragging(),
        }
    }
})(CustomDragLayer)
