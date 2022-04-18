import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { stateActions } from '../store/store';

import React, {useState } from "react";
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";

const ProductItem = (props) => {
  const { title, price, description,image1,image2,image3,id} = props;
  
  const [nav1,setSlider1]=useState("")
  const [nav2,setSlider2]=useState("")
  
  const dispatch=useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: false,
  };




  //---------adding active dots----------

  return (
    <li className={classes.item} key={id}>
      <div className={classes.card}>
        <header>
          <div>
          <h3 >{title}</h3>
          <h5 >hi</h5>
          <h5 >hi</h5>
          </div>
          <div className={classes.price}>${parseInt(price.substring(2))}</div>
        </header>
        <div className={classes.container}>
      <Slider 
          {...settings} 
          asNavFor={nav2}
          ref={slider => (setSlider1(slider))}>
          <div>
          <img src={`data:image/jpeg;base64,${image1}`} alt="Image1" onLoad={()=>dispatch(stateActions.increament())}/>
          </div>
          <div>
          <img src={`data:image/jpeg;base64,${image2}`}  alt="Image2" onLoad={()=>dispatch(stateActions.increament())}/>
          </div>
          <div>
          <img src={`data:image/jpeg;base64,${image3}`}  alt="Image3"onLoad={()=>dispatch(stateActions.increament())}/>
          </div>
          </Slider>
        <div className={classes.slider2}>
        <Slider
          asNavFor={nav1}
          ref={slider => (setSlider2(slider))}
          slidesToShow={2.65}
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
          <p>{description}</p>
          
          <div className={classes.actions}>
        {/* <button onClick={adding}>Adding to quote cart</button> */}
        </div>
      </div>
    </li>
    
  );
};

export default ProductItem;