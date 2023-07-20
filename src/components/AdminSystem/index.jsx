import { useEffect, useState } from "react";
import * as React from 'react';  
import items from "../../server/items";
import { Card, FormControlLabel} from "@mui/material";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Timg from "../../images/targetLogo.png";
import Checkbox from "@mui/material/Checkbox";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
  } from '@material-ui/core';
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';  import TextField from '@mui/material/TextField';
const AdminSystem = () => {

    const [item , setItem] = useState([])
    const [id,setId] = useState()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [quant , setQuant] = useState(0)
    const [ret,setRet] = React.useState()
    const [i2,setI2] = useState()
    const [i3, setI3] = React.useState(0);
    const [i4, setI4] = React.useState(true);
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
    const handleC1 = (open1) => {
        console.log({"quantity":quant})
        items.updateItem(id,{"quantity":quant,"returnable":ret}).catch(error=>{console.log(error)});
        setOpen1(false);
        window.location.reload();
    }
    const handleaa =(event1)=>{setRet(event1.target.value);};
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
        
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Confirm the action
                </DialogTitle>
                {/* <Box position="absolute" top={0} right={0}>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box> */}
                <DialogContent>
                <Typography>Are you sure you want to delete this item?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained" >
                        Cancel
                    </Button>
                    <Button onClick={handleClose1} color="secondary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

        <div>
        
            <Dialog className="dialog1" open={open1} onClose={handleC} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Confirm the action
                </DialogTitle>
                <DialogContent>
                <Typography>Item quantity</Typography>
                
                <TextField
                    id="outlined-number"
                    
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={event => setQuant(event.target.value)}
                    
                    />

                </DialogContent>
               <DialogContent>
               <test>returnable type : {ret ? (<test>yes</test>) : (<test>no</test>)}&nbsp;&nbsp;</test>
                    <button className="butt2" onClick={fun}>change</button>
                 </DialogContent>

            
                
                <DialogActions>
                    <Button onClick={handleC} color="primary" variant="contained" >
                        Cancel
                    </Button>
                    <Button onClick={handleC1} color="secondary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>  

    
        <div >
            <Dialog maxWidth="md" open={open2} onClose={handleCa} > 
            <div >
                <IconButton >
                    <CloseOutlinedIcon className='align-right' onClick={handleCa} />
                </IconButton></div>
                <DialogTitle>
                    <div>
                    <div className="container">
                <div className="column">
                    <div >
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group-mb-2">
                                    <label className="form-label" color="#c11d1d">
                                        Name
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
                                    <label className="form-label" color="#c11d1d">
                                        Item Quantity
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
                                <div >
                                    <label color="#c11d1d">Returnable</label>
                                    <Checkbox defaultChecked
                                    
                                    onChange={(e)=>setI4(e.target.i4)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    
                                        
                                       
                                
                                </div>
                                <button className='butt2' onClick={(e)=>saveAndCheck(e)}>save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                    </div>
                </DialogTitle>
                
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