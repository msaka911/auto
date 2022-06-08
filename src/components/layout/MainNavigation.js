import { NavLink } from 'react-router-dom';


import classes from './MainNavigation.module.css';

import { isMobile } from 'react-device-detect';
const MainNavigation = () => {


  return (
    <header className={isMobile?classes.media:classes.header}>
      <div className={classes.top}>
      <h3 className={classes.logo}>CANLOVEADA &nbsp;  AUTO</h3>
      <h5 className={classes.contact}>Contact Info</h5>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/quotes' className={(navData) => (navData.isActive ? `${classes.active}` : '')}>
              Home
            </NavLink>
          </li>
          <li>
          <NavLink to='/inventory'  className={(navData) => (navData.isActive ? `${classes.active}` : '')}>
              Inventory
            </NavLink>
          </li>

          <li>
          <NavLink to='/new-quote'  className={(navData) => (navData.isActive ? `${classes.active}` : '')}>
              File A Quote
            </NavLink>
          </li>
          <li>
            <NavLink to='/login'  className={(navData) => (navData.isActive ? `${classes.active}` : '')}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
