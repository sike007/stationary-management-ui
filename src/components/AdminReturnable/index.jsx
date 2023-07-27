import { Card } from "@mui/material"
import { useEffect, useState } from "react";
import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
  } from '@mui/material';  
import Grid from '@mui/material/Grid';
import transaction from "../../server/transaction";


const AdminReturnable = () => {
    const [item , setItem] = useState([])
    const [open1, setOpen1] = React.useState(false);
    const [id,setId] = useState()
    const [i1,setI1] = useState()
    const [date1] = useState(new Date())
    const [item1,setItem1] = useState()
    const handleca =()=>{
        setOpen1(false);
    }
    useEffect(() => {
        setItem1(item.sort((a,b)=>(a.transactionId-b.transactionId)))
    }, [item])
    const return1=()=>{
        var ndate = new Date(date1.getTime());
        ndate.setDate(date1.getDate() + parseInt(i1));
        transaction.updateOneTransaction(id,{"returnDate":ndate.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-')}).then((response)=>{console.log(response)}).catch(error=>{console.log(error)})
        window.location.reload()
        
    }
    const getAll = () => {
        transaction.getAllTransactions().then((response) => {
            setItem(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })}
        useEffect(() => {
            getAll();
        }, [])
        const handleClickOpen1 = (a) => {
            setId(a)
            setOpen1(true);
        };
        const handleSubmit = (event) => {
            console.log('handleSubmit ran');
            event.preventDefault(); 
        }
        
    return (
        <div>
            <div><div>
        <Card className="App-Card">
            <h3>Collectable Items</h3>
            <table className="table table-bordered table-striped" >
                    <thead>
                        <th> No </th>
                        <th> Student Name</th>
                        <th> Item Name </th>
                        <th> Item Quantity </th>
                        <th> Return Date</th>
                        <th> Actions</th> 
                    </thead>
                    <tbody>
                        {
                        item.map(
                            itm =>
                            {return !itm.returned?<tr open={itm.returned} key = {itm.transactionId}> 
                            <td> {itm.transactionId}</td>
                            <td> {itm.student.studentName}</td>
                            <td> {itm.stationaryItem.itemName} </td>
                            <td> {itm.withdrawnQuantity===null ?<>0</>:itm.withdrawnQuantity} </td>
                            <td>{itm.returnDate===null ?<>-</>:itm.returnDate}</td>
                            <td >
                                
                                <Button onClick={()=>handleClickOpen1(itm.transactionId)} color="info" variant="contained" >
                                    change
                                </Button>
                                
                            </td>
                        </tr>:<></>}
                        )
                    }
                </tbody>
            </table>
        </Card>
        <div >
        <Dialog maxWidth="md" open={open1} onClose={ handleca} > 
                <DialogTitle>
                Change the return date here
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
                                    <>Borrow Date : &nbsp;&nbsp;</>
                                        
                                    </Grid>
                                    <Grid container item xs={4} direction="column" >
                                    
                                    <input
                                        type = "number"
                                        min="0"
                                        placeholder="enter count"
                                        name = "i1"
                                        onChange={(e)=>setI1(e.target.value)}
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
                                    <Button onClick={(e)=>return1(e)} color="primary" variant="contained" >
                                        change
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
export default AdminReturnable
