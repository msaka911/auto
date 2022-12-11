import { Fragment, useRef,useState,useEffect } from 'react';
import { useAlert } from 'react-alert'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { isMobile } from 'react-device-detect';


import classes from './Form.module.css';
import validator from 'validator';

const Form = (props) => {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
//------------options for select------------
  const animatedComponents = makeAnimated();
  const options = [
    { value: 'free of accident', label: 'Free of Accident' },
    { value: 'free of repair', label: 'Free of repair' },
    { value: 'second-hand', label: 'Second-Hand' },
    { value: 'lease transfer', label: 'Lease Transfer' },
  ]
  const[selected,setSelect]=useState([]);

//----------------------------------------

  const alert = useAlert()
  const makeInputRef = useRef();
  const modelInputRef = useRef();
  const exteriorColor=useRef()
  const interorColor=useRef()
  const bodyStyle=useRef()
  const descriptionRef=useRef()
  const contactRef=useRef();
  const addressRef=useRef();
  const distance=useRef(0);
  const brand=useRef("")
  const year=useRef("")
  const vin=useRef("")



  function submitFormHandler(event) { 
    event.preventDefault();
    const axios = require('axios');
    const enteredMake = makeInputRef.current.value;
    const enteredModel = modelInputRef.current.value;
    const enteredExteriorColor = exteriorColor.current.value;
    const enteredInteriorColor = interorColor.current.value;
    const enteredBodyStyle = bodyStyle.current.value;
    const enteredContact=contactRef.current.value;
    const enteredAddress=addressRef.current.value;
    const enteredYear=year.current.value
    const enteredVin=vin.current.value
    const enteredDescription=descriptionRef.current.value

    //--------------check email, zip code, phone number---------------------//

    if(!validator.isMobilePhone(enteredContact,['en-CA'])){
      document.getElementById('contact').style.borderColor='red';
      alert.error("Please enter valid phone number",{onClose:()=>{
        document.getElementById('contact').style.borderColor='black';
        
      }})
      return
    }
    if(!validator.isPostalCode(enteredAddress,['CA'])){
      document.getElementById('address').style.borderColor='red';
      alert.error("Please enter valid zip code",{onClose:()=>{
        document.getElementById('address').style.borderColor='black';
      }})
      return
    }
    // if(validator.isMobilePhone(enteredContact,['en-CA'])&&validator.isEmail(enteredEmail)){
    //     axios.post('https://mybackend1.herokuapp.com/appointment',{
    //       make: enteredMake,
    //       model:enteredModel,
    //       bodyStyle:enteredBodystyle,
    //       exteriorColor: enteredExteriorColor,
  //         interorColor:enteredInteriorColor,
  //         description:enteredDescription,
    //       contact:enteredContact,
    //       address:enteredAddress,
    //       vin:enteredVin,
    //       mileage:enteredDistance,
    //       year:enteredYear,
    //     })
    //     .then(function (response) {
    //     alert.show("Thanks! \n We will process your request asap")
    //     document.getElementById('make').value="";
    //     document.getElementById('model').value="";
    //     document.getElementById('exteriorColor').value=""
    //     document.getElementById('interiorColor').value=""
    //     document.getElementById('bodystyle').value=""
    //     document.getElementById('contact').value="";
    //     document.getElementById('address').value=""
    //     document.getElementById('vin').value=""
    //     document.getElementById('mileage').value=""
    //     document.getElementById('description').value=""
    //     })
    //     .catch(function (error) {
    //       alert.error("cannot send the data")
    //     })
    // }
    // else{
    //     alert.error("Please fill valid contents")
    // }
  }


  return (
    <Fragment>
      <div className={classes.card} clicked={props.clicked}>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          <div className={classes.control}>
            <label htmlFor='name'>Make</label>
            <input type='text' placeholder='Make' id='make' ref={makeInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Model</label>
            <input type='text' placeholder='Model' id='model' ref={modelInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Body Style</label>
            <input type='text' placeholder='Body Style' id='bodystyle' ref={bodyStyle} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Exterior Color</label>
            <input type='text' placeholder='Exterior Color' id='exteriorColor' ref={exteriorColor} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Interior Color</label>
            <input type='text' placeholder='Interior Color' id='ineteriorcolor' ref={interorColor} />
          </div>
          <div className={classes.control}>
            <label htmlFor='contact'>Contact</label>
            <input type='text' placeholder='Tel' id='contact' ref={contactRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Vehicle vin#</label>
            <input type='text' placeholder='Vin#' id='vin' ref={vin} />
          </div>
          <div className={classes.control}>
         <div className={isMobile?classes.media:classes.selection}>
         <label><DriveEtaIcon/> Mileage
         <input
          id="mileage"
          type="number"
          min="0"
          ref={distance}
            />
         </label>
         <label>Manufactured Year
         <input
          type="number"
          min="2000"
          max="2050"
          ref={year}
            />
         </label>
         </div>
          <label htmlFor='select'>Selection for extra details</label>
          <Select 
          // closeMenuOnSelect={false}
          className={classes.control} 
          components={animatedComponents}
          isMulti
          onChange={options=>{setSelect(options)}}
          options={options}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='postal code'>Postal Code</label>
            <input  className={classes.postal} type='text' placeholder='Zip Code' id='address' ref={addressRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='description'>Vehicle Detail</label>
            <textarea type='text' rows={3} placeholder='Detail' id='description' ref={descriptionRef} />
          </div>
          <div className={classes.actions}>
            <button onClick={submitFormHandler} className='btn'>Submit</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
