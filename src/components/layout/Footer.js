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
            </div>
        </div>
        <div>
            <h6 style={{margin:"auto",width:"100%",color:"white", textAlign:"center"}}>All Rights reserved CANLOVEADA INC.</h6>
        </div>
        </Fragment>
    )
}

export default Footer;