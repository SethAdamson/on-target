import React, {Component} from 'react';
import './ColorMenu.css';
import {connect} from 'react-redux';
import {updateBoard} from '../../../ducks/reducer';
import FontAwesome from 'react-fontawesome';


class ColorMenu extends Component {
    constructor(){
        super();

        this.state = {
            colors: [                
                {name: 'baseGreen', color:'#1ee6aa'},
                {name: 'red', color:'#c80000'},
                {name: 'purple', color:'#6400c8'},
                {name: 'sky', color:'#0096c8'},
                {name: 'darkGreen', color:'#14684f'},
                {name: 'yellow', color:'#fae600'},
                {name: 'orange', color:'#fa9600'},
                {name: 'blue', color:'#1919ff'},
                {name: 'pink', color:'#ff00ff'},
            ],

            images: [
                {name:'dog', img:'http://www.ultrahdfreewallpapers.com/uploads/large/animals/dog-hd-wallpaper-0018.jpg'},
                {name: 'giraffe', img:'https://newevolutiondesigns.com/images/freebies/animals-background-6.jpg'},
                {name: 'waterDrop', img:'http://www.kinyu-z.net/data/wallpapers/76/969432.jpg'},
                // {name: 'beach', img:'http://www.intrawallpaper.com/static/images/Hawaii-Beach-Wallpaper-HD_8pA2vrZ.jpg'},
            ]
        }

        this.updateColor = this.updateColor.bind(this);
        this.updateImage = this.updateImage.bind(this);

    }

    updateColor(val){
            this.props.updateBoard(this.props.currentID, {bg_color: val});
    }

    updateImage(val){
            this.props.updateBoard(this.props.currentID, {bg_img: val});
    }

    render() {
        let {colors, images} = this.state;
        let displayColors = colors.map((bgcolor, i) => {
            let style = {
                backgroundColor: bgcolor.color,
            }
            return(
                <span 
                    className='colormenu-choice' 
                    value={bgcolor.name}  
                    style={style} 
                    key={i}
                    onClick={() => this.updateColor(bgcolor.color)}
                     ></span>
            )
        })
        let displayImages = images.map((image, i) => {
            let style = {
                backgroundImage: `url(${image.img})`,
            }
            return(
                <span className='colormenu-choice' 
                    value={images.name}  
                    style={style}
                    key={i} 
                    onClick={() => this.updateImage(image.img)}></span>
            )
        })
        return (
            <div className={this.props.colorClick ? 'colormenu-shown' : 'colormenu-hidden'}>
                <div className='colormenu-content'>
                    <div className='colormenu-header'>
                        <h1 className='colormenu-title'>Select Background</h1>
                        <FontAwesome className='delete'  name='far fa-times fa-lg' onClick={this.props.editColorFn}/>
                    </div>
                    <hr />
                    <h2 className='colormenu-section'>
                    Colors
                    </h2>
                    <div className='options-table'>
                        {displayColors}
                    </div>
                    <h2 className='colormenu-section'>
                    Photos
                    </h2>
                    <div className='options-table'>
                        {displayImages}              
                    </div>  
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
    return {
        boards: state.boards,
    }
}

export default connect(mapStateToProps, {updateBoard})(ColorMenu);