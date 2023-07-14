import { useEffect, useState } from "react";
import * as React from 'react';  
import { useLocation } from "react-router-dom"
import items from "../../server/items";
import { Card} from "@mui/material";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const AdminSystem = (pa) => {
    const location = useLocation();
    const [item , setItem] = useState([])
    const [id,setId] = useState()
    useEffect(() => {

        getAll();
    }, [])
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = (e) => {
        setOpen(true);
        setId(e);
    };
    const handleClose1 = () => {
        setOpen(false);
        items.deleteItem(id).catch(error=>{console.log(error)});
        window.location.reload();
    }
    const handleClose = () => {
        setOpen(false);
    };
    const getAll = () => {
        items.getAllItems().then((response) => {
            setItem(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
    
    return(
        <div>
        <Card className="App-Card">
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Item Id </th>
                    <th> Item Name </th>
                    <th> Item Quantity </th>
                    <th> returnable type </th>
                    <th> actions</th>
                </thead>
                <tbody>
                    {
                        item.map(
                            itm =>
                            <tr key = {itm.itemId}> 
                                <td> {itm.itemId} </td>
                                <td> {itm.itemName} </td>
                                <td> {itm.quantity} </td>
                                {itm.returnable ? (
                                    <td>yes</td>
                                        ) : (
                                    <td>no</td>
                                )}
                                <td className="fit">
                                    <span className="actions">
                                    <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => alert("bye")}
                                        />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => handleClickOpen(itm.itemId)}
                                        />
                                        
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            
        </Card>
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    do you want to delete this item
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
        
    )
}
export default AdminSystem