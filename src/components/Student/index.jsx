import { Card } from "@mui/material"
import items from "../../server/items";
import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from 'react-router-dom';

const Student = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const [item , setItem] = useState([])
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
     };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getAll = () => {
        items.getAllItems().then((response) => {
            setItem(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })}
    const handletransaction =()=>{
        navigate('/transaction')
        handleClose()
    }  
   
    useEffect(() => {
            getAll();
        }, [])

    return (
    <div>
        <header className="header1">
            <button className="butt" onClick={handletransaction}>My Transactions</button>
            </header>
        <Card className="App-Card">
            <h3>Student</h3>
            <table className="table table-bordered table-striped" >
                    <thead>
                        <th> No </th>
                        <th> Item Name </th>
                        <th> Item Quantity </th>
                        <th> returnable type </th>
                        <th> max days</th>
                        <th> actions</th> 
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
                                    <td>yes</td>
                                        ) : (
                                    <td>no</td>
                                )}
                                <td>{itm.maxDays===null ?<>-</>:itm.maxDays}</td>
                                
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </Card>
        </div>
    )
}
export default Student;