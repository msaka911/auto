import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../store/store';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import React, {useState } from "react";
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const { title, price, description,image1,image2,image3,id,mileage} = props;
  console.log(props)
  const [nav1,setSlider1]=useState("")
  const [nav2,setSlider2]=useState("")
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
//---------------------------------------arrow style----------------------


const LeftArrow = ({ style, onClick }) => (
<button
  style={{ ...style,borderWidth: "0", left: 0, marginLeft:"-1rem", backgroundColor: "white",top: "50%",position:"absolute", zIndex:"99", border: "0:" }}
  onClick={onClick}
  className="arrowLeft"
>
  <ArrowBackIosNewIcon fontSize='large'/>
</button>
);

const RightArrow = ({ style, onClick }) => (
  <button
    style={{ ...style, borderWidth: "0",right: 0,marginRight:"-2rem", backgroundColor: "white",top: "50%",position:"absolute", zIndex:"99", border: "0:"}}
    onClick={onClick}
    className="arrowRight"
  >
    <ArrowForwardIosIcon fontSize='large'/>
  </button>
  );



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    drggable:true,
    fade: true,
    arrows: isMobile?false:true,
    prevArrow: <LeftArrow />,
    nextArrow:<RightArrow/>
  };




  //---------adding active dots----------

  return (
    <li className={classes.item} key={id}>
      <div className={isMobile?classes.media:classes.card}>
        <header className={classes.header}>
          <div className={classes.title}>
            <h3>{title}</h3>
            <h5 >Mileage: &nbsp; {mileage} KM</h5>
            <label className={classes.subtitle}>Price does not include taxes and licensing fees.</label>
            <label className={classes.transmission}>Transmission: &nbsp; Automatic</label>
          </div>
          <h3 className={classes.price}>Price: &nbsp; ${parseInt(price)}</h3>
        </header>
        <div className={classes.container}>
      <Slider 
          className={isMobile?classes.slider:null}
          {...settings} 
          asNavFor={nav2}
          ref={slider => (setSlider1(slider))}>
          <div>
          <img src={`data:image/jpeg;base64,${image1}`} alt="Image1" onLoad={()=>dispatch(stateActions.increament())} onClick={()=> navigate(`/details/${id}`)}/>
          </div>
          <div>
          <img src={`data:image/jpeg;base64,${image2}`}  alt="Image2" onLoad={()=>dispatch(stateActions.increament())} onClick={()=> navigate(`/details/${id}`)}/>
          </div>
          <div>
          <img src={`data:image/jpeg;base64,${image3}`}  alt="Image3"onLoad={()=>dispatch(stateActions.increament())} onClick={()=> navigate(`/details/${id}`)}/>
          </div>
          </Slider>
        <div className={classes.slider2}>
        <Slider
          asNavFor={nav1}
          ref={slider => (setSlider2(slider))}
          slidesToShow={2}
          swipeToSlide={true}
          focusOnSelect={true}
          arrows={false}
        >          
        <div>
        <img src={`data:image/jpeg;base64,${image1}`}  alt="Image1"/>
        </div>
        <div>
        <img src={`data:image/jpeg;base64,${image2}`}  alt="Image2"/>
        </div>
        <div>
        <img src={`data:image/jpeg;base64,${image3}`}  alt="Image3"/>
        </div>
        </Slider>
        </div>
        </div>
          <div className={classes.actions}>
        </div>
      </div>
    </li>
    
  );
};

export default ProductItem;