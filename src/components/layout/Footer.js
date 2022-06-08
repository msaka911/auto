import { Fragment } from 'react/cjs/react.production.min';
import classes from './Footer.module.css';
import { isMobile } from 'react-device-detect';

const Footer=()=>{
    return(
        <Fragment>
        <div className={isMobile?classes.media:classes.wrapper}>
            <div>
                <h4>Visit Our Location</h4>
            </div>
            <div>
                <h4>Contact Us</h4>
            </div>
            <div>
                <h4>Hourse Of Operation</h4>
            </div>
        </div>
        <div>
            <h6 style={{margin:"auto",width:"100%",color:"white", textAlign:"center"}}>All Rights reserved CANLOVEADA INC.</h6>
        </div>
        </Fragment>
    )
}

export default Footer;