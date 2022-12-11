
import { useEffect, useState, useRef} from 'react';
import classes from './Inventory.module.css';
import Select from 'react-select'
import { useSelector,useDispatch} from 'react-redux';


const Test=(props)=>{

    const data=useSelector(state=>state.count)
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
        sorted=mockData.sort((a,b)=>a.year -b.year)
        setMockData([...sorted])
      }
      else if(event.value==options[1].value){
        sorted=mockData.sort((a,b)=>b.year -a.year)
        setMockData([...sorted])
      }
      else if(event.value==options[2].value){
        sorted=mockData.sort((a,b)=>a.price -b.price)
        setMockData([...sorted])
      }
      else if(event.value==options[3].value){
        sorted=mockData.sort((a,b)=>b.price -a.price)
        setMockData([...sorted])
      }
    }
    const [mockData,setMockData]=useState([{uid:"1",year:"1999",price:"1000"},{uid:"2",year:"1997",price:"1200"},{uid:"4",year:"2004",price:"50"},{uid:"3",year:"1998",price:"12000"},{uid:"5",year:"1990",price:"3000"}])
    

    const handlePrice=()=>{
        var minValue=parseInt(min.current.value)
        var maxValue=parseInt(max.current.value)
        var changedArray=mockData.filter(item=>parseInt(item.price)>minValue).filter(item=>parseInt(item.price)<maxValue)
        setMockData(changedArray)
    }

    const handleReset=()=>{
        setMockData([{uid:"1",year:"1999",price:"1000"},{uid:"2",year:"1997",price:"1200"},{uid:"4",year:"2004",price:"50"},{uid:"3",year:"1998",price:"12000"},{uid:"5",year:"1990",price:"3000"}])
    }

    const handleClick=(command)=>{

      var sorted
      if (command=="year"){
        sorted=mockData.sort((a,b)=>a.year -b.year)
        setMockData([...sorted])
        console.log(mockData)
         
      }
      else{
        sorted=mockData.sort((a,b)=>a.price -b.price)
        setMockData([...sorted])
        console.log(mockData)
      }


    }


    return(
        <>
        <button onClick={()=>handleClick("year")}>sort by year</button>
        <button onClick={()=>handleClick("price")}>sort by price</button>
        <div className={classes.filter} >
          <label style={{marginRight:"1rem"}}>Price Range</label>
          <div>
            $<input ref={min} type="number" placeholder='min' style={{marginRight:"1rem",width:"6rem",borderRadius:"0.4rem"}}></input>
            $<input ref={max} type="number" placeholder='max' style={{marginRight:"1rem",width:"6rem",borderRadius:"0.4rem"}}></input>
            <button onClick={handlePrice} style={{marginRight:"1rem",width:"6rem",borderRadius:"0.4rem"}}>Go</button>
          </div>
        </div>
        <div className={classes.filter} >
        <button className="btn" onClick={handleReset} style={{borderRadius:"0.7rem",padding: "0.2rem 0.3rem",fontSize:"1rem"}}>Reset filter</button>
        </div>
        <div className={classes.wrapper}>
       
       <div className={classes.filter} >
          <label>
          Sort By
          </label>
          <Select onChange={(event)=>handleSelect(event)} className={classes.select} styles={customStyles} options={options}/>
        </div>
      </div>
        {/* {props.mockData
        .map((item)=>
            <div style={{color:"white",marginBottom:"3rem"}}>
               <h3>{item.uid}</h3> 
               <h3>{item.year}</h3> 
            </div>
        )} */}
            {/* <label style={{color:"white",marginBottom:"3rem"}}>{number}</label> */}
            <>
            {mockData
            .map((item)=>
                <div style={{color:"white",marginBottom:"3rem"}}>
                    <h3>{item.uid}</h3> 
                    <h3>{item.year}</h3> 
                    <h3>{item.price}</h3> 
                </div>
            )}
            
            </>
            
        </>
        
    )
}


export default Test