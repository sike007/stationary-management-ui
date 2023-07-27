import { Card } from "@mui/material"
import { useEffect, useState } from "react";
import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
  } from '@mui/material';  
import transaction from "../../server/transaction";


const Transaction = () => {
    const [item , setItem] = useState([])
    const [open1, setOpen1] = React.useState(false);
    const [id,setId] = useState()
    const [item1,setItem1] = useState()
    const handleca =()=>{
        setOpen1(false);
    }
    useEffect(() => {
        setItem1(item.sort((a,b)=>(a.transactionId-b.transactionId)))
    }, [item])
    const return1=()=>{
        transaction.updateOneTransaction(id,{"returned":true})
        window.location.reload()
    }
    const getAll = () => {
        transaction.getTransactionByStudent(sessionStorage.getItem('id')).then((response) => {
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
    return (
        <div class name="body">
        <header className="header1">
            </header>
        <Card className="App-Card">
            <h3>Student Transactions</h3>
            <table className="table table-bordered table-striped" >
                    <thead>
                        <th> No </th>
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
                            <td> {itm.stationaryItem.itemName} </td>
                            <td> {itm.withdrawnQuantity===null ?<>0</>:itm.withdrawnQuantity} </td>
                            <td>{itm.returnDate===null ?<>-</>:itm.returnDate}</td>
                            <td >
                                
                                <Button onClick={()=>handleClickOpen1(itm.transactionId)} color="info" variant="contained" >
                                    return
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
                Do you want to return this item
                </DialogTitle>
                <DialogActions>
                    <Button onClick={return1} color="primary" variant="contained" >
                        return
                    </Button>
                    <Button onClick={handleca} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </DialogActions> 
            </Dialog>
        </div>
    </div>
    )
}
export default Transaction
