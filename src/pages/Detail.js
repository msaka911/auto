import { useParams } from 'react-router-dom';
import classes from './Detail.module.css';
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { isMobile } from 'react-device-detect';
import { useAlert } from 'react-alert'
import { Fragment } from 'react/cjs/react.production.min';
import {Buffer} from 'buffer';

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
            {storedData.img.map((image,index)=>{
                
                var firstKey = Object.keys(image)[0];
                var data=image[firstKey].data
                 var base64=new Buffer(data).toString('base64')
                 return(
                    <div>
                    <img src={`data:image/jpeg;base64,${base64}`} alt={`Image${index}`} />
                    </div>
                 )
            })}
            </Slider>
            <div className={classes.label}>
                <div className={classes.wrap}>
                    <h5 className={classes.detail}><h5>Mileage:</h5> {storedData.mileage} KM</h5>
                    <label className={classes.detail}><h5>Drivetrain:</h5>   {storedData.drivetrain} </label>
                    <label className={classes.detail}><h5>Transmission:</h5>   Automatic</label>
                    <label className={classes.detail}><h5>Exterior Colour:</h5>  {storedData.color} </label>
                    <div>
                        <label className={classes.detail}>${parseInt(storedData.price)}</label>
                        <label className={classes.subtitle}>Price does not include taxes and licensing fees</label>
                    </div>
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