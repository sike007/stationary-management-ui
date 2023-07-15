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
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [quant , setQuant] = useState(0)
    const [ret,setRet] = useState(false)
    useEffect(() => {

        getAll();
    }, [])
    
    const handleClickOpen = (e) => {
        setOpen(true);
        setId(e);
    };
    const handleClickOpen1 = (a,b,c) => {
        setOpen1(true);
        setQuant(b)
        setRet(c)
        setId(a);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose1 = () => {
        items.deleteItem(id).catch(error=>{console.log(error)});
        setOpen(false);
        window.location.reload();
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleC1 = () => {
        console.log({"quantity":quant})
        items.updateItem(id,{"quantity":quant,"returnable":ret}).catch(error=>{console.log(error)});
        setOpen1(false);
        window.location.reload();
    }
    const handleC = () => {
        setOpen1(false);
    };
    const handleCa1 = () => {
        setOpen2(false);
        window.location.reload();
    }
    const handleCa = () => {
        setOpen2(false);
    };
    const getAll = () => {
        items.getAllItems().then((response) => {
            setItem(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
    const fun = () => {
        if(ret){setRet(false)}else{setRet(true)}
    }
    return(
        <div>
            <div>
                <button className="butt" onClick={handleClickOpen2}>add item</button>
            </div>
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
                                            onClick={() => handleClickOpen1(itm.itemId,itm.quantity,itm.returnable)}
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
        <div>
            <Dialog open={open1} onClose={handleC}>
                <DialogTitle>
                    do you want to add this item
                </DialogTitle>
                <DialogContent>
                    <button className="butt3" onClick={()=>{setQuant(quant-1)}}>-</button>&nbsp;&nbsp;{quant}&nbsp;&nbsp;
                    <button className="butt2" onClick={()=>{setQuant(quant+1)}}>+</button>
                </DialogContent>
                <DialogContent>
                    <test>return type:{ret ? (<test>yes</test>) : (<test>no</test>)}&nbsp;&nbsp;</test>
                    <button className="butt" onClick={fun}>change</button></DialogContent>
                <DialogActions>
                
                    <Button onClick={handleC1} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleC} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        <div>
            <Dialog open={open2} onClose={handleCa}>
                <DialogTitle>
                    do you want to edit this item
                </DialogTitle>
                <DialogActions>
                
                    <Button onClick={handleCa1} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleCa} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
        
    )
}
export default AdminSystem