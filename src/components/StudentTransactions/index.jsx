import { Card } from "@mui/material"
import items from "../../server/items";
import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from '@material-ui/core';  
import Grid from '@material-ui/core/Grid';
import transaction from "../../server/transaction";


const Transaction = () => {
    const [item , setItem] = useState([])
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
    return (
        <div class name="body">
        <header className="header1">
            </header>
        <Card className="App-Card">
            <h3>Student Transactions</h3>
            <table className="table table-bordered table-striped" >
                    <thead>
                        <th> No </th>
                        <th> Item Id </th>
                        <th> Item Quantity </th>
                        <th> Borrow days</th>
                        <th> actions</th> 
                    </thead>
                    <tbody>
                        {
                        item.map(
                            itm =>
                            <tr key = {itm.transactionId}> 
                                <td> {itm.transactionId}</td>
                                <td> {itm.stationaryItemId} </td>
                                <td> {itm.withdrawnQuantity===null ?<>0</>:itm.withdrawnQuantity} </td>
                                <td>{itm.returnDate===null ?<>-</>:itm.returnDate}</td>
                                <td >
                                    
                                    <Button  color="info" variant="contained" >
                                        return
                                    </Button>
                                    
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </Card>
    </div>
    )
}
export default Transaction
