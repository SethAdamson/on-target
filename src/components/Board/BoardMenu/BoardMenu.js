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
            styles: false,
            deleteSelect: false,
            homeRedirect: false,
            colors: [                
                {name: 'baseGreen', color:'#1ee6aa'},
                {name: 'red', color:'#c83232'},
                {name: 'purple', color:'#8232c8'},
                {name: 'sky', color:'#0096c8'},
                {name: 'darkGreen', color:'#14684f'},
                {name: 'yellow', color:'#e6e664'},
                {name: 'orange', color:'#c87d19'},
                {name: 'blue', color:'#234bdc'},
                {name: 'pink', color:'#c84bc8'},
            ],

            images: [
                {name: 'dog', img:'http://www.ultrahdfreewallpapers.com/uploads/large/animals/dog-hd-wallpaper-0018.jpg'},
                {name: 'waterDrop', img:'http://www.ultrahdfreewallpapers.com/uploads/large/3d-and-abstract/3d-hd-wallpaper-0933.jpg'},
                {name: 'winter', img:'http://www.ultrahdfreewallpapers.com/uploads/large/nature/4k-nature-wallpaper-0055.jpg'},
                {name: 'lion', img:'http://www.ultrahdfreewallpapers.com/uploads/large/animals/lion-hd-wallpaper-363.jpg'},
                {name: 'desert', img:'http://www.ultrahdfreewallpapers.com/uploads/large/nature/4k-nature-wallpaper-0005.jpg'},
                {name: 'mountain', img:'http://www.ultrahdfreewallpapers.com/uploads/large/nature/nature-1080p-wallpaper-0011.jpg'},
                {name: 'beach', img:'http://www.ultrahdfreewallpapers.com/uploads/large/nature/nature-hd-background-0031.jpg'},
                {name: 'usa', img:'http://www.ultrahdfreewallpapers.com/uploads/large/flags/usa-flag-wallpaper-001.jpg'},
                {name: 'eagle', img:'http://www.ultrahdfreewallpapers.com/uploads/large/birds/eagle-hd-wallpaper-download-0024.jpg'},
            ],

            styles: [
                {name: 'blue-paper', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-1.jpg'},
                {name: 'green-paper', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-2.jpg'},
                {name: 'red-paper', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-3.jpg'},
                {name: 'orange-stripe', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-4.jpg'},
                {name: 'camo', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-5.jpg'},
                {name: 'purple-cloud', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-6.jpg'},
                {name: 'grey-cloud', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-7.jpg'},
                {name: 'orange-hex', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-8.jpg'},
                {name: 'green-hex', img:'https://s3-us-west-1.amazonaws.com/on-target-media/Backgrounds/BG-9.jpg'},

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
        this.styleToggle = this.styleToggle.bind(this);

    }

    updateColor(val){
        let {boards} = this.props;
        this.props.updateBoard(this.props.currentID, {bg_color: val}, boards);
    }

    updateImage(val){        
        let {boards} = this.props;
        this.props.updateBoard(this.props.currentID, {bg_img: val}, boards);
        boards.map(board => {
            if(board.id === this.props.currentID){
                board.background_img = val
            }
        })
    }

    bgToggle(){
        this.setState({bgSelect: !this.state.bgSelect, colorSelect: false, imgSelect: false, deleteSelect: false})
    }

    colorToggle(){
        this.setState({colorSelect: !this.state.colorSelect, imgSelect: false, styleSelect: false})
    }

    imgToggle(){
        this.setState({imgSelect: !this.state.imgSelect, colorSelect: false, styleSelect: false})
    }

    styleToggle(){
        this.setState({styleSelect: !this.state.styleSelect, colorSelect: false, imgSelect: false})
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
        let {colors, images, styles, styleSelect, bgSelect, colorSelect, imgSelect, deleteSelect, homeRedirect} = this.state;
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
                    value={image.name}  
                    style={style}
                    key={i} 
                    onClick={() => this.updateImage(image.img)}></span>
            )
        })
        let displayStyles = styles.map((styling, i) => {
            let style = {
                backgroundImage: `url(${styling.img})`,
            }
            return(
                <span className='boardmenu-choice' 
                    value={styling.name}  
                    style={style}
                    key={i} 
                    onClick={() => this.updateImage(styling.img)}></span>
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
                    <h2 className='boardmenu-section-title' onClick={this.bgToggle}>Change Background</h2>
                    {bgSelect ?
                        <div className='background-menu'>
                            <h3 className='boardmenu-section grow' onClick={this.colorToggle}>
                                Colors
                            </h3>
                            {colorSelect ? 
                                <div className='options-table'>
                                    {displayColors}
                                </div>
                            :
                                <br className='display-none'/>
                            }
                            <h3 className='boardmenu-section grow' onClick={this.imgToggle}>
                                Photos
                            </h3>
                            {imgSelect ? 
                                <div className='options-table'>
                                    {displayImages}              
                                </div> 
                            :
                                <br className='display-none'/>
                            }
                            <h3 className='boardmenu-section grow' onClick={this.styleToggle}>
                                Styles
                            </h3>
                            {styleSelect ? 
                                <div className='options-table'>
                                    {displayStyles}              
                                </div> 
                            :
                                <br className='display-none'/>
                            }
                            <hr />
                        </div>
                    : 
                        <hr />
                    }
                    <h2 className='boardmenu-section-title' name='bgSelect' onClick={this.deleteToggle}>Delete Board</h2>
                    {deleteSelect ?
                        <h3 className='boardmenu-section grow delete-board' onClick={this.removeBoard}>
                            Delete "{currentName}" and all contents? 
                            <FontAwesome className='delete-icon'  name='far fa-trash fa-lg'  />
                        </h3>
                    :
                        <br className='display-none'/>
                    }
                    <hr className='bottom-hr'/>
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