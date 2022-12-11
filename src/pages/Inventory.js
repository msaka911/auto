import ProductItem from '../components/ProductItem';
import classes from './Inventory.module.css';
import { useState,useEffect,useMemo,useRef} from 'react';
import { useAlert } from 'react-alert'
import LoadingSpinner from "../components/UI/LoadingSpinner"
import { useSelector,useDispatch} from 'react-redux';
import { Fragment } from 'react/cjs/react.production.min';
import store, { stateActions } from '../store/store';
import SearchInput, {createFilter} from 'react-search-input'
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import PaginatedItems from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import Select from 'react-select'
import Button2 from '../components/UI/Button2';
const axios = require('axios');




//-------------------------------------------pagination---------------------------------------------------------------



const Inventory = (props) => {

//--------------test------



//-------------
  const location = useLocation()
  const navigate=useNavigate();

  
  const selectInputRef=useRef()

  const [searchTerm,setTerm]=useState("");
  const [reachCount,setCount]=useState(false)
  const [focused,setFocus]=useState(false)
  const [data,setData]=useState([])
  const [filteredData,setFiltered]=useState([])

  const alert=useAlert();
  const dispatch=useDispatch()
  const count=useSelector(state=>state.count)
  const storedData=useSelector(state=>state.items)


  


useEffect(()=>{
  if(!storedData){
    axios.get('http://localhost:3000/auto')
    // axios.get('https://mybackend1.herokuapp.com/auto')
    .then(function (response) {
      dispatch(stateActions.setItems(response.data),
      setData(response.data),
      )})
    .catch(function (error) {
      alert.error("cannot load the page")
    })
  }
  },[])

useEffect(()=>{
   if(count===storedData?.length){
    setCount(true)
  }
},
[])


useEffect(() => {
    // runs on location, i.e. route, change
    if(storedData){
      setCount(true)
      setData(storedData)
    }
    // console.log('handle route change here', location)
  }, [location,storedData])


useMemo(()=>{
  if(focused){
    setFiltered(Object.values(storedData)?.filter(obj=>obj.make.toLowerCase()?.includes(searchTerm.toLowerCase())))
    if (filteredData?.length>6){
      setFiltered(filteredData?.slice(0,6))
    }
    if(searchTerm.length===0){
      setFiltered([])
    }
  }
 }
,
[searchTerm,focused])


useEffect(()=>{
  if(storedData&&focused){
    setData(storedData)
  }
},[storedData,focused])



// const filtering=(id)=>{
//   const clickedItem=filteredData?.find((obj)=>obj._id===id)

//   setData([clickedItem])
//   const scroll=document.getElementById('scroll')
//   scroll.scrollIntoView({behavior:'smooth'})
//   setFocus(false)
// }



const page=useMemo((storedData)=>{
  if (data){
    console.log(data?.length)
    return  <PaginatedItems itemsPerPage={8}  storeData={storedData} />
  }
  else{
    return null
  }
},[storedData])

//---------------filter and sort--------------------
const min=useRef()
const max=useRef()

const customStyles = {
  control: base => ({
    ...base,
    height: "2rem",
    minHeight: "2rem"
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '2rem',
    padding: '0 0.3rem',
  })
};

const options = [
  { value: 'Year Ascending', label: 'Year Ascending' },
  { value: 'Year Descending', label: 'Year Descending' },
  { value: 'Price Ascending', label: 'Price Ascending' },
  { value: 'Price Descending', label: 'Price Descending' }
]

const handleSelect=(event)=>{
    var sorted
    if(event.value==options[0].value){
      sorted=data.sort((a,b)=>a.year -b.year)
      setData([...sorted])
    }
    else if(event.value==options[1].value){
      sorted=data.sort((a,b)=>b.year -a.year)
      setData([...sorted])
    }
    else if(event.value==options[2].value){
      sorted=data.sort((a,b)=>a.price -b.price)
      setData([...sorted])
    }
    else if(event.value==options[3].value){
      sorted=data.sort((a,b)=>b.price -a.price)
      setData([...sorted])
    }
    }

    const handlePrice=()=>{
      var minValue=parseInt(min.current.value)
      var maxValue=parseInt(max.current.value)
      var changedArray=data.filter(item=>parseInt(item.price)>minValue).filter(item=>parseInt(item.price)<maxValue)
      setData(changedArray)
    }

    const handleReset=()=>{
      setData(storedData)
      selectInputRef.current.setValue(" ")
      }

   const handleClick=(command)=>{

    var sortArray
    if (command=="year"){
      sortArray=data.sort((a,b)=>a.year -b.year)
      setData([...sortArray])       
    }
    else{
      sortArray=data.sort((a,b)=>a.price -b.price)
      setData([...sortArray])
    }


  }

//------------------------------------------------
return (
    <Fragment>

      {/* <Test></Test> */}

     <div className='centered' style={{display:reachCount?'none':'block'}}>
              <LoadingSpinner />
     </div>



     <div style={{display:reachCount?'block':'none'}}>
     
        <SearchInput className={isMobile?classes.media:classes.serachinput}  onFocus={()=>setFocus(true)} onChange={(input)=>setTerm(input)}  placeholder="Search by brand"/>
        {(focused&&filteredData.length>0)?(filteredData.map(items => {
          var firstKey = Object.keys(items.img[0])[0]
          console.log(firstKey)
          var data=items.img[0][firstKey].data.data
          var base64=new Buffer(data).toString('base64')

          return (
            <div className= {isMobile?classes.mediaSearchBar:classes.searchBar} key={items._id} onClick={()=> navigate(`/details/${items._id}`)}> 
              <h5 >{items.make+"  "}{items.model}</h5>
              <img src={`data:image/jpeg;base64,${base64}`}  alt="Image1"/>
              {/* <h5 >{items.brand}</h5> */}
              <h5 >{items.price}</h5>
            </div>
          )
        })):((filteredData.length===0&&focused&&searchTerm)?<div className= {classes.noresult}><h5 >No result found</h5></div>:null)}
      </div>


     {/* <section className={classes.products} style={{display:reachCount?'block':'none'}}>
      <h2>Inventory</h2>
        <ul id="scroll">
          {(data)?.map(product=><ProductItem
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            brand={product.brand}
            mileage={product.mileage}
            description={product.description}
            image1={product.image1}
            image2={product.image2}
            image3={product.image3}
          />)}
        </ul>
      </section> */}
      <br/>
      <div className={classes.filterParent}>

      <div className={classes.filter} >
        <div style={{justifyItems:'space-between',display:'flex',flexDirection:"column"}}>
          <Button2 onClick={()=>handleClick("year")}>sort by year</Button2>
          <Button2 onClick={()=>handleClick("price")}>sort by price</Button2> 
        </div>
          <label style={{marginTop:"1.5rem",marginBottom:"0.2rem"}}>Price Range</label>
          <div style={{alignItems:'center',justifyItems:'space-between',display:'flex',flexDirection:"column"}} >
            <input ref={min} type="number" placeholder='min' style={{margin:"0.3rem",width:"6rem",borderRadius:"0.4rem"}}></input>
            <input ref={max} type="number" placeholder='max' style={{margin:"0.3rem",width:"6rem",borderRadius:"0.4rem"}}></input>
          </div>
          <button className="btn" onClick={handlePrice} style={{marginTop:"0.3em",padding: "0.1rem 0.5rem",fontSize:"1rem",borderRadius:"0.4rem"}}>Go</button>
        <div className={classes.filter}>
          <label  style={{marginTop:"1.5rem",marginBottom:"0.2rem"}}>
            Sort By
          </label>
          <Select onChange={(event)=>handleSelect(event)} className={classes.select} styles={customStyles} options={options} ref={selectInputRef} />
          <button className="btn" onClick={handleReset} style={{marginTop:"1rem",borderRadius:"0.7rem",padding: "0.2rem 0.4rem",fontSize:"1rem"}}>Reset filter</button>
       </div>
    </div>

  </div>

      {/*-----------------------------------------------------------*/}

        {reachCount?page:null}
</Fragment>
           )
};





export default Inventory;