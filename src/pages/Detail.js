import { useParams } from 'react-router-dom';
import classes from './Detail.module.css';
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { isMobile } from 'react-device-detect';
import { useAlert } from 'react-alert'
import { Fragment } from 'react/cjs/react.production.min';

const Detail=()=>{
    const [storedData,setData]=useState([]);

    const params=useParams();
    const getId=params.id

    const axios = require('axios');
    const alert=useAlert();
    
    useEffect(()=>{
        // axios.get('http://localhost:3001/realestate')
        axios.get(`https://mybackend1.herokuapp.com/auto/details/${getId}`)
        .then(function (response) {
            setData(response.data)
            })
        .catch(function (error) {
            alert.error("cannot load the item")
        })
        },[])

    if(storedData.length===0){
        return(<div sytle={{color:"white"}}>No such product</div>)
    }
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        autoplay: true,
        arrows:isMobile?false:true,
        drggable:true
      };
    
      return(
        <Fragment>
        <div className={classes.wrapper}>
            <h3 className={isMobile?classes.h2:classes.detail}>{storedData.name}</h3>
            <Slider 
            className={isMobile?classes.mediaSlider:classes.slider}
            {...settings} 
            >
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[0].data}`} alt="Image1" />
            </div>
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[1].data}`}  alt="Image2"/>
            </div>
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[2].data}`}  alt="Image3"/>
            </div>
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[3].data}`}  alt="Image4"/>
            </div>
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[4].data}`}  alt="Image5"/>
            </div>
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[5].data}`}  alt="Image6"/>
            </div>
            <div>
            <img src={`data:image/jpeg;base64,${storedData.img[6].data}`}  alt="Image6"/>
            </div>
            </Slider>
            <div className={classes.label}>
                <div className={classes.wrap}>
                    <h5 className={classes.detail}>Mileage: {storedData.mileage} KM</h5>
                    <div>
                        <label className={classes.price}>${parseInt(storedData.price)}</label>
                        <label className={classes.subtitle}>Price does not include taxes and licensing fees</label>
                    </div>
                    <label className={classes.detail}>Drivetrain:   {storedData.drivetrain} </label>
                    <label className={classes.detail}>Transmission:   Automatic</label>
                    <label className={classes.detail}>Exterior Colour:  {storedData.color} </label>
                </div>
                <text className={classes.text}>{storedData.description}</text>
            <div style={{display:"flex", gap:isMobile?"0.8rem":"1.5rem"}}>
            </div>  
            </div>
          </div>
          </Fragment>
      )
    
    
}



export default Detail;