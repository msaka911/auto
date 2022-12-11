import { Fragment } from 'react/cjs/react.production.min';
import classes from './Footer.module.css';
import { isMobile } from 'react-device-detect';
import { Button } from '@mui/material';
const Footer=()=>{
    return(
        <Fragment>
        <div className={isMobile?classes.media:classes.wrapper}>
            <div className={classes.align}> 
                <h4>Locations</h4>
                <Button  sx={{fontSize:"1rem",fontWeight:"bold"}}>505 Highway 7 East</Button>
            </div>
            <div className={classes.align}>
                <h4>Contact Us </h4>
                <Button sx={{fontSize:"1rem",fontWeight:"bold"}}>canloveada@gmail.com</Button>
            </div>
            <div className={classes.align}>
                <h4>Hours Of Operation</h4>
                <Button  sx={{fontSize:"1rem",fontWeight:"bold"}}>MON-SAT 9:00am-6:00pm</Button>
            </div>
        </div>
        <div>
            <h6 style={{margin:"auto",width:"100%",color:"white", textAlign:"center"}}>All Rights reserved CANLOVEADA INC.</h6>
        </div>

        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
              width="400"
              height="320"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />    
        </Fragment>
    )
}

export default Footer;