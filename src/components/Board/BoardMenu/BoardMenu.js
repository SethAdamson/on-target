import React, {Component} from 'react';
import './BoardMenu.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateBoard, removeBoard} from '../../../ducks/reducer';
import FontAwesome from 'react-fontawesome';


class BoardMenu extends Component {
    constructor(){
        super();

        this.state = {
            bgSelect: false,
            colorSelect: false,
            imgSelect: false,
            deleteSelect: false,
            homeRedirect: false,
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
        this.bgToggle = this.bgToggle.bind(this);
        this.colorToggle = this.colorToggle.bind(this);
        this.imgToggle = this.imgToggle.bind(this);
        this.deleteToggle = this.deleteToggle.bind(this);
        this.removeBoard = this.removeBoard.bind(this);
        this.menuToggle = this.menuToggle.bind(this);

    }

    updateColor(val){
            this.props.updateBoard(this.props.currentID, {bg_color: val});
    }

    updateImage(val){
            this.props.updateBoard(this.props.currentID, {bg_img: val});
    }

    bgToggle(){
        this.setState({bgSelect: !this.state.bgSelect, colorSelect: false, imgSelect: false, deleteSelect: false})
    }

    colorToggle(){
        this.setState({colorSelect: !this.state.colorSelect, imgSelect: false})
    }

    imgToggle(){
        this.setState({imgSelect: !this.state.imgSelect, colorSelect: false})
    }

    deleteToggle(){
        this.setState({deleteSelect: !this.state.deleteSelect, bgSelect: false, colorSelect: false, imgSelect: false})
    }

    removeBoard(){
        this.props.removeBoard(this.props.currentID);
        this.setState({homeRedirect: true});
    }

    menuToggle(){
        this.props.editColorFn();
        this.setState({            
            bgSelect: false,
            colorSelect: false,
            imgSelect: false,
            deleteSelect: false,
        })
    }

    render() {
        let {colors, images,bgSelect, colorSelect, imgSelect, deleteSelect, homeRedirect} = this.state;
        let {currentName} = this.props
        let displayColors = colors.map((bgcolor, i) => {
            let style = {
                backgroundColor: bgcolor.color,
            }
            return(
                <span 
                    className='boardmenu-choice' 
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
                <span className='boardmenu-choice' 
                    value={images.name}  
                    style={style}
                    key={i} 
                    onClick={() => this.updateImage(image.img)}></span>
            )
        })

        if(homeRedirect){
            return(<Redirect to='/home' />)
        }

        return (
            <div className={this.props.colorClick ? 'boardmenu-shown' : 'boardmenu-hidden'}>
                <div className='boardmenu-content'>
                    <div className='boardmenu-header'>
                        <h1 className='boardmenu-title'>Menu & Settings</h1>
                        <FontAwesome className='delete'  name='far fa-times fa-lg' onClick={this.menuToggle}/>
                    </div>
                    <hr />
                    <h2 className='boardmenu-title' onClick={this.bgToggle}>Change Background</h2>
                    {bgSelect ?
                        <div className='background-menu'>
                            <h3 className='boardmenu-section' onClick={this.colorToggle}>
                                Colors
                            </h3>
                            {colorSelect ? 
                                <div className='options-table'>
                                    {displayColors}
                                </div>
                            :
                                <br />
                            }
                            <h3 className='boardmenu-section' onClick={this.imgToggle}>
                                Photos
                            </h3>
                            {imgSelect ? 
                                <div className='options-table'>
                                    {displayImages}              
                                </div> 
                            :
                                <br />
                            }
                            <hr />
                        </div>
                    : 
                        <hr />
                    }
                    <h2 className='boardmenu-title' name='bgSelect' onClick={this.deleteToggle}>Delete Board</h2>
                    {deleteSelect ?
                        <h3 className='boardmenu-section'>
                            Delete "{currentName}" and all contents? 
                            <FontAwesome className='delete-icon'  name='far fa-trash fa-lg' onClick={this.removeBoard} />
                        </h3>
                    :
                        <br />
                    }
                    <hr />
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

export default connect(mapStateToProps, {updateBoard, removeBoard})(BoardMenu);