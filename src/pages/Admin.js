import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert'
import classes from "./Admin.module.css"
import { Fragment } from "react"
import Button from "../components/UI/Button"
import { useRef} from "react"
import { stateActions } from "../store/store"
import { useNavigate } from "react-router-dom"
import { isMobile } from "react-device-detect"

const Admin=()=>{
    const files=useRef("")
    const price=useRef(0)
    const description=useRef("");
    const name=useRef("");
    const item=useRef("");
    const mileage=useRef("")
    const drivetrain=useRef("")
    const color=useRef("")

    const alert=useAlert();

    const navigate=useNavigate();

    const token=useSelector((state)=>state.token)

   

    const uploadFile=(event)=>{
        event.preventDefault();
        const axios = require('axios');
        const formData = new FormData();
        const file = files.current.files
        formData.append('images',file)
        
        Array.from(file).forEach((element)=>{
            formData.append('images',element)
        })

        formData.append('price',price.current.value)
        formData.append('description',description.current.value)
        formData.append('name',name.current.value)
        formData.append('mileage',mileage.current.value)
        formData.append('drivetrain',drivetrain.current.value)
        formData.append('color',color.current.value)
      
        const config = {
            headers: { Authorization: `Bearer ${token}`,
                      },
            
        };
        
        axios.post('https://mybackend1.herokuapp.com/auto/upload',
        // axios.post('http://localhost:3001/upload',
          formData,
          config
        ).then((response)=>{
            alert.show("Images successfully uploaded")
            name.current.value="";
            mileage.current.value="";
            description.current.value="";
            price.current.value="";
            color.current.value="";
            drivetrain.current.value="";

        }   
        ).catch(function(error){
            alert.error(error.response.data)
        })
    }

    const deleteItem=(event)=>{
        event.preventDefault();
        const axios = require('axios');
        const deletedItem=item.current.value
        // axios.post(`http://localhost:3001/deleteItem?name=${deletedItem}`,{},
        axios.post(`https://mybackend1.herokuapp.com/auto/deleteItem?uid=${deletedItem}`,{},

        {headers: {Authorization: `Bearer ${token}`}}
        ).then((response)=>{
            alert.show("Item successfully deleted")
        }  
        ).catch(function(error){
            console.log(error)
            alert.error(error.response.data.toString())
        })
    }
    
    const dispatch=useDispatch();
    
    const loggedin=useSelector((state)=>state.loggedin)
    const logOut=(event)=>{
        event.preventDefault();
        
        dispatch(stateActions.setState(false))
        dispatch(stateActions.setToken(""))
        navigate('/login')
    }
    return(
    <Fragment>
        <form className={classes.card} onSubmit={uploadFile}>
         <h3>Upload</h3>
            <div className={isMobile?classes.media:classes.wrapper}>
           
            <div>
                <label>Price</label>
                <input type="number" min="0" ref={price}/>
            </div>
            <div>
                <label>Name</label>
                <input type="text" ref={name}/>
            </div>
            <div>
                <label>Mileage</label>
                <input type="number" min="0" ref={mileage}/>
            </div>
            <div>
                <label>Drivetrain</label>
                <input type="text"  ref={drivetrain}/>
            </div>
            <div>
                <label>Color</label>
                <input type="text"  ref={color}/>
            </div>
            </div>
         <div>
                <label>Description</label>
                <textarea rows={3} type="text"ref={description} />
         </div>
         <input type="file" multiple ref={files}/>
        <Button>Submit</Button>
        </form>
     <form className={classes.card} onSubmit={deleteItem}>
            <h3>Delete inventory</h3>
                <div className={classes.wrapper}>
                   <div>
                       <label>UID</label>
                       <input type="text" ref={item}/>
                   </div>
                </div>
        <Button>Submit</Button>
    </form>

    <Button className={classes.logout} onClick={logOut}>Log Out</Button>
    </Fragment>
    )
}


export default Admin;