import classes from './Button2.module.css';

const Button2=(props)=>{
    return (
        <button {...props} className={classes.button}></button>
    )
}

export default Button2;