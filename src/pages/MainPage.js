
import {useNavigate} from 'react-router-dom';

import { Fragment } from 'react/cjs/react.production.min';
import { useParallax } from 'react-scroll-parallax';
import image from "../assets/Hero-Image.png"
import classes from './MainPage.module.css';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import group from "../assets/interior.png"
import finance from "../assets/Finance-Icon.jpeg"
import warranty from "../assets/Warranty-Icon.jpeg"
import lease from "../assets/Lease-Icon.jpeg"
import { isMobile } from 'react-device-detect';

const MainPage = () => {
  const { ref } = useParallax({ speed: (isMobile?-10:-40) })
  
  

  const navigate=useNavigate();

   //page animation------------------------------------------------------------
   const allSections = document.querySelectorAll('section');

   
   const revealSection = function (entries, observer) {
     const [entry] = entries;
   
     if (!entry.isIntersecting) return;
   
     entry.target.classList.remove('section--hidden');
     observer.unobserve(entry.target);
   };
   
   const sectionObserver = new IntersectionObserver(revealSection, {
     root: null,
     threshold: 0.15,
   });
   
   allSections.forEach(function (section) {
     sectionObserver.observe(section);
     section.classList.add('section--hidden');
   });
   //------------------------------------------------------------


  return (
  <Fragment>
  <header className={isMobile?classes.media:classes.welcome}>
    <h2>Welcome To</h2>
    <h1>CANLOVEADA Sales</h1>
    <img  ref={ref}  src={image}></img>
    <Button onClick={()=>{navigate('/inventory')}}>Inventory</Button>
  </header>
  <section className={[classes.section,"bottom"].join(" ")}>
    <Card title="Finance" description="Our best advisors" button="Apply for Finance">
      <img src={finance}/>
    </Card>
    <Card title="Lease" description="Lease can be great options" button="Apply for Lease">
    <img src={lease}/>
    </Card>
    <Card i title="Warranty" description="Extended Warranty" button="Know More">
    <img src={warranty}/>
    </Card>
  </section>
  <section className={isMobile?[classes.mediaSection,"bottom"].join(" "):[classes.introduction,"bottom"].join(" ")}>
   <h2>BUY WITH CONFIDENCE</h2>
   <p>With our amazing collection on the lot, we guarantee you’ll be extremely satisfied with your choices. Come and test drive one now. 
      Sometimes we offer an incredible discount on a select vehicle. Right now, that includes our extensive Vehicle collection. Whether you’re 
      looking for new or used, large or small, bare essentials or fully equipped, we know you’ll ride away from YST AUTO SALES with an awesome set of wheels to call your own.
   </p>
  </section>

  

  <section className={isMobile?[classes.mediaGroup,"bottom"].join(" "):[classes.group,"bottom"].join(" ")}>
  <h2>Auto Group</h2>
  <img src={group} ></img>
  </section>
  

  <section className="section section--quote section--last">
      <div className="section__title">
        <h3 className="section__header">
          Get free quote for your car now!
        </h3>
      </div>
      <button className="btn"  onClick={()=>{navigate(`/new-quote`)}}>Free Quote!</button>
    </section>
  </Fragment>
  );
};

export default MainPage;
