import { useEffect, useState } from "react";
import * as React from 'react';  
import items from "../../server/items";
import { Card} from "@mui/material";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Button , Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Timg from "../../images/targetLogo.png"

const AdminSystem = () => {

    const [item , setItem] = useState([])
    const [id,setId] = useState()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [quant , setQuant] = useState(0)
    const [ret,setRet] = useState()
    const [i2,setI2] = useState()
    const [i3, setI3] = React.useState(0);
    const [i4, setI4] = React.useState();
    const [results,setResults] = useState(0);
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
    const handleClickOpen3 = () => {
        setOpen3(true);
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
    const handleCa = () => {
        setOpen2(false);
    };
    const handle2 = () => {
        setOpen3(false);
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
    const handleSubmit = (event) => {
        console.log('handleSubmit ran');
        event.preventDefault(); 
    }
    const saveAndCheck = (e) => {
        e.preventDefault();
        console.log({ "itemName":i2, "quantity":parseInt(i3),"returnable":i4==='true'})
        items.saveItem({ "itemName":i2, "quantity":i3,"returnable":i4}).then((response)=>{ setResults(response.data)
            console.log(response.data);}).catch(error => {
            console.log(error)
            handleClickOpen3();
        })
    }
    useEffect(()=>{
        if(results !== 0){
            setOpen2(false);
            window.location.reload()}else{
            setOpen2(false);
            setResults(0);
        }
    },[results])
    return(
        <div>
            <header className="header1">
            <img src={Timg} className="App-logo1"  />
            <button className="butt" onClick={handleClickOpen2}>add item</button>
            <button className="butt" >collectable items</button>
            </header>
            <div>
                
                </div>
            <Card className="App-Card">
                <table className="table table-bordered table-striped" >
                    <thead>
                        <th> No </th>
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
                                <td> {itm.itemId}</td>
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
        
            <Dialog open={open} onClose={handleClose} position={{ X: 0, Y: 140 }}>
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
            <Dialog className="dialog1" open={open1} onClose={handleC}>
                <DialogTitle>
                    do you want to edit this item
                </DialogTitle>
                <DialogContent>
                    <button className="butt2" onClick={()=>{if(quant!==0)setQuant(quant-1)}}>-</button>&nbsp;&nbsp;{quant}&nbsp;&nbsp;
                    <button className="butt2" onClick={()=>{setQuant(quant+1)}}>+</button>
                </DialogContent>
                <DialogContent>
                    <test>return type:{ret ? (<test>yes</test>) : (<test>no</test>)}&nbsp;&nbsp;</test>
                    <button className="butt2" onClick={fun}>change</button></DialogContent>
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
        <div >
            <Dialog maxWidth="md" open={open2} onClose={handleCa} > 
                <DialogTitle>
                    <div>
                    <div className="container">
                <div className="row">
                    <div >
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group-mb-2">
                                    <label className="form-label">
                                        name
                                    </label>
                                    <input
                                        type = "text"
                                        placeholder="enter name"
                                        name = "i2"
                                        value = {i2}
                                        className="form-control"
                                        onChange={(e)=>setI2(e.target.value)}
                                    ></input>
                                </div>
                                <div className="form-group-mb-2">
                                    <label className="form-label">
                                        item count
                                    </label>
                                    <input
                                        type = "number"
                                        placeholder="enter count"
                                        name = "i3"
                                        value = {i3}
                                        className="form-control"
                                        onChange={(e)=>setI3(e.target.value)}
                                    ></input>
                                </div>
                                <div className="form-group-mb-2">
                                    <label className="form-label">
                                        returnable
                                    </label>
                                    <input
                                        type = "radio"
                                        value = "true"
                                        name = "ok"
                                        onChange={(e)=>setI4(e.target.value)}
                                    ></input>true
                                    <input
                                        type = "radio"
                                        value = "false"
                                        name = "ok"
                                        onChange={(e)=>setI4(e.target.value)}
                                    ></input>false
                                </div>
                                <button className='butt2' onClick={(e)=>saveAndCheck(e)}>save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                    </div>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCa} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        <div>
            <Dialog open={open3} onClose={handle2}>
                <DialogTitle>
                    name shouldn't be empty or same
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handle2} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
    )
}
export default AdminSystem