import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert'
import classes from "./Admin.module.css"
import { Fragment } from "react"
import Button from "../components/UI/Button"
import { useRef} from "react"
import { stateActions } from "../store/store"
import { useNavigate } from "react-router-dom"
import { isMobile } from "react-device-detect"
import { DriveEtaRounded } from "@mui/icons-material"

const Admin=()=>{
    const files=useRef("")
    const id=useRef("")

    const price=useRef(0)
    const description=useRef("");
    const model=useRef("");
    const make=useRef("");
    const mileage=useRef("")
    const engine=useRef("")
    const drivetrain=useRef("")
    const exteriorColor=useRef("")
    const interiorColor=useRef("")
    const bodyStyle=useRef("")
    const year=useRef("")
    const transimission=useRef("")

    const alert=useAlert();

    const navigate=useNavigate();

    const token=useSelector((state)=>state.token)

   

    const uploadFile=(event)=>{
        event.preventDefault();
        const axios = require('axios');
        const formData = new FormData();
        const file = files.current.files
        const count=files.current.files.length

        formData.append('images',file)
        
        Array.from(file).forEach((element)=>{
            formData.append('images',element)
        })
        
        formData.append('price',price.current.value)
        formData.append('description',description.current.value)
        formData.append('model',model.current.value)
        formData.append('make',make.current.value)
        formData.append('transimission',mileage.current.value)
        formData.append('mileage',mileage.current.value)
        formData.append('drivetrain',drivetrain.current.value)
        formData.append('exteriorColor',exteriorColor.current.value)
        formData.append('interiorColor',interiorColor.current.value)
        formData.append('bodyStyle',bodyStyle.current.value)
        formData.append('year',year.current.value)
        formData.append('engine',engine.current.value)
        formData.append('description',description.current.value)

        const config = {
            headers: { Authorization: `Bearer ${token}`,
                      },
            
        };
        if(count==7&&price.current.value&&model.current.value&&make.current.value&&mileage.current.value&&drivetrain.current.value&&exteriorColor.current.value&&interiorColor.current.value&&engine.current.value&&year.current.value&&bodyStyle.current.value&&transimission.current.value&&description.current.value&&engine.current.value)
        {
            axios.post('https://mybackend1.herokuapp.com/auto/upload',
            // axios.post('http://localhost:3000/auto/upload',
              formData,
              config
            ).then((response)=>{
                alert.show("Images successfully uploaded")
                make.current.value="";
                model.current.value="";
                transimission.current.value="";
                mileage.current.value="";
                description.current.value="";
                price.current.value="";
                exteriorColor.current.value="";
                interiorColor.current.value="";
                drivetrain.current.value="";
                engine.current.value="";
                description.current.value="";
            }   
            ).catch(function(error){
                alert.error(error.response.data)
            })
        }
        else{
            alert.error("Please fill all the fields")
        }

    }

    const deleteItem=(event)=>{
        event.preventDefault();
        const axios = require('axios');
        const deletedItem=id.current.value
        // axios.post(`http://localhost:3000/auto/deleteItem/${deletedItem}`,{},
        //`https://mybackend1.herokuapp.com/auto/deleteItem/${deletedItem}`
        axios.post(`https://mybackend1.herokuapp.com/auto/deleteItem/${deletedItem}`,{},

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
                <label>Make</label>
                <input type="text" ref={make}/>
            </div>
            <div>
                <label>Model</label>
                <input type="text" ref={model}/>
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
                <label>transimission</label>
                <input type="text"  ref={transimission}/>
            </div>
            <div>
                <label>Body Style</label>
                <input type="text"  ref={bodyStyle}/>
            </div>
            <div>
                <label>Exterior Color</label>
                <input type="text"  ref={exteriorColor}/>
            </div>
            <div>
                <label>Interior Color</label>
                <input type="text"  ref={interiorColor}/>
            </div>
            <div>
                <label>Manufactured Year</label>
                <input type="year"  ref={year}/>
            </div>
            <div>
                <label>Engine</label>
                <input type="text"  ref={engine}/>
            </div>
            <div>
                <label>Description</label>
                <textarea rows={10} type="text"ref={description} />
            </div>
            </div>
            <input type="file" multiple ref={files}/>
        <Button>Submit</Button>
        </form>
     <form className={classes.card} onSubmit={deleteItem}>
            <h3>Delete inventory</h3>
                <div className={classes.wrapper}>
                   <div>
                       <label>Id</label>
                       <input type="text" ref={id}/>
                   </div>
                </div>
        <Button>Submit</Button>
    </form>

    <Button className={classes.logout} onClick={logOut}>Log Out</Button>
    </Fragment>
    )
}


export default Admin;