import { Card } from "@mui/material"
import items from "../../server/items";
import { useEffect, useState } from "react";
import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
  } from '@material-ui/core';  
import Grid from '@material-ui/core/Grid';
import transaction from "../../server/transaction";


const Student = () => {
    const [quant , setQuant] = useState(0)
    const [item1,setItem1] = useState()  
    const [open1, setOpen1] = React.useState(false);
    const [item , setItem] = useState([])
    const [id,setId] = useState()
    const [count,setCount] = useState(0)
    const [type,setType] = useState()
    const [maxd , setMaxd] = useState()
    const [date1] = useState(new Date());
    useEffect(() => {
        setItem1(item.sort((a,b)=>(a.itemId-b.itemId)))
    }, [item])
    const handleClickOpen1 = (a,b,c,d) => {
        setId(a)
        setQuant(b)
        setType(c)
        setMaxd(d)
        setOpen1(true);
    };
    const handleca =()=>{
        setCount(0)
        setOpen1(false);
    }
    const getAll = () => {
        items.getAllItems().then((response) => {
            setItem(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })}
    const withdraw = (e) => {
        var ndate = new Date(date1.getTime());
        ndate.setDate(date1.getDate() + maxd);
        if(count===0){alert("Item quantity shouldn't be zero" )}
        else{
            if(quant<count){alert("Item quantity must be less than "+quant)}
            else{
                if(!type){
                    items.updateItem(id,{"quantity":quant-count})
                    window.location.reload()
                }
                else{
                    console.log({"stationaryItemId":id,"withdrawnQuantity":count,"returnDate":ndate.toLocaleDateString('en-GB'),"returned":false})
                    transaction.createTransaction(sessionStorage.getItem("id"),{"stationaryItemId":id,"withdrawnQuantity":count,"returnDate":ndate.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }).split('/').reverse().join('-'),"returned":false})
                    window.location.reload()
                }
            }
        }
    }
    
    // const handleC1 = () => {
    //     if(ret){
    //         console.log({"quantity":quant,"returnable":ret,"maxDays":days})
    //         items.updateItem(id,{"quantity":quant,"returnable":ret,"maxDays":days}).catch(error=>{console.log(error)});
    //         setOpen1(false);
    //         window.location.reload()
    //     }
    //     else{
    //         console.log({"quantity":quant,"returnable":ret,"maxDays":null})
    //         items.updateItem(id,{"quantity":quant,"returnable":ret,"maxDays":null}).catch(error=>{console.log(error);});
    //         setOpen1(false);
    //         window.location.reload()
    //     }
    // }
    const handleSubmit = (event) => {
        console.log('handleSubmit ran');
        event.preventDefault(); 
    }
    
    useEffect(() => {
            getAll();
        }, [])

    return (
    <div>
        <div><div>
        <Card className="App-Card">
            <h3>Student</h3>
            <table className="table table-bordered table-striped" >
                    <thead>
                        <th> No </th>
                        <th> Item Name </th>
                        <th> Item Quantity </th>
                        <th> Returnable Type </th>
                        <th> Borrow days</th>
                        <th> Actions</th> 
                    </thead>
                    <tbody>
                        {
                        item.map(
                            itm =>
                            <tr key = {itm.itemId}> 
                                <td> {itm.itemId}</td>
                                <td> {itm.itemName} </td>
                                <td> {itm.quantity===null ?<>0</>:itm.quantity} </td>
                                {itm.returnable ? (
                                    <td>Yes</td>
                                        ) : (
                                    <td>No</td>
                                )}
                                <td>{itm.maxDays===null ?<>-</>:itm.maxDays}</td>
                                <td >
                                    
                                    <Button onClick={()=>handleClickOpen1(itm.itemId,itm.quantity,itm.returnable,itm.maxDays)} color="info" variant="contained" >
                                        Withdraw
                                    </Button>
                                    
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </Card>
        
        <div >
            <Dialog maxWidth="md" open={open1} onClose={ handleca} > 
                <DialogTitle>
                Add the details here
                </DialogTitle>
                <div>
                    <div className="container">
                <div className="row">
                    <div >
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                
                                {/* <div className="form-group-mb-2">
                                <Grid container spacing={2} >
                                    <Grid container item xs={5} direction="column" >
                                    <>Item name : &nbsp;</>
                                        
                                    </Grid>
                                    <Grid container item xs={3} direction="column" >
                                    <input
                                        type = "text"
                                        //placeholder=item.itemName
                                        name = "i2"
                                        value = {items.}
                                       // className="form-control"
                                      // onChange={handleChange}
                                    ></input>
                                        
                                    </Grid>
                                    </Grid>
                                </div> */}
                                <div className="form-group-mb-2">
                                <Grid container spacing={2} >
                                    <Grid container item xs={5} direction="column" >
                                    <>Item Quantity : &nbsp;&nbsp;</>
                                        
                                    </Grid>
                                    <Grid container item xs={4} direction="column" >
                                    
                                    <input
                                        type = "number"
                                        min="1"
                                        placeholder="enter count"
                                        name = "i3"
                                        onChange={(e)=>setCount(e.target.value)}
                                    ></input>
                                        
                                    </Grid>
                                    </Grid>
                                </div>{/*
                                <div ><Grid container spacing={2} >
                                    <Grid container item xs={5} direction="column" >
                                    <>Returnable :</>
                                        
                                    </Grid>
                                    <Grid container item xs={4} direction="column" >
                                    <select id="mySelect"
                                        onChange={(e)=>setI4(e.target.value)}
                                        
                                    >
                                        <option disabled selected value=''> -- select an option -- </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        
                                    </select>
                                   
                                    </Grid>
                                    </Grid>
                                </div>
                                <div>
                                <Grid container spacing={2} >
                                <Grid container item xs={5} direction="column" >
                                    <>max days :</>
                                    
                                </Grid>
                                <Grid container item xs={4} direction="column" >
                                    
                                    {(i4==='Yes')?(<div className="form-group-mb-2">
                                    <input
                                        type = "number"
                                        placeholder="enter max days"
                                        name = "i1"
                                        
                                        onChange={(e)=>setI1(e.target.value)}
                                    ></input>
                                    </div>):
                                    (<div className="form-group-mb-2"><label className="form-label">
                                            -
                                        </label></div>)}
                                  
                                </Grid>
                                </Grid>
                </div>*/}
                                <DialogActions>
                                    <Button onClick={(e)=>withdraw(e)} color="primary" variant="contained" >
                                        Withdraw
                                    </Button>
                                    <Button onClick={handleca} color="secondary" variant="contained">
                                        Cancel
                                    </Button>
                                    
                                </DialogActions> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                    </div>
            </Dialog>
        </div>
        </div></div>
    </div>
    )
}
export default Student;
