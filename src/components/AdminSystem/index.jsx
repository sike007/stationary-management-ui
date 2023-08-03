import { useEffect, useState } from "react";
import * as React from 'react';  
import items from "../../server/items";
import { Card, Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Grid from '@mui/material/Grid';
 
const AdminSystem = () => {
    const [item1,setItem1] = useState([])  
    const [Id,setId] = useState()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [quant , setQuant] = useState(0)
    const [days , setDays] = useState(0)
    const [ret,setRet] = React.useState()
    const [i2,setI2] = useState()
    const [i3, setI3] = React.useState(0);
    const [i1, setI1] = useState();
    const [i4, setI4] = React.useState('no');
    const [results,setResults] = useState(0);
    const [ch,setCh] = useState(0);
    
    
    const handleClickOpen = (e) => {
        setOpen(true);
        setId(e);
    };
    useEffect(()=>{
        console.log('ok')
        items.getOneItem(Id).then((response)=>{setRet(response.data.returnable); setQuant(response.data.quantity); setDays(response.data.maxDays)}).catch(
            error=>{console.log(error)}
        )
    },[ch])
    const handleClickOpen1 = (a) => {
        
        setId(a);
        setCh(ch+1)
        setOpen1(true)
        

    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClickOpen3 = () => {
        setOpen3(true);
    };
    const handleClose1 = () => {
        items.deleteItem(Id).catch(error=>{console.log(error)});
        setOpen(false);
        window.location.reload();
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleC1 = () => {
        if(ret){
            console.log({"quantity":quant,"returnable":ret,"maxDays":days})
            items.updateItem(Id,{"quantity":quant,"returnable":ret,"maxDays":days}).catch(error=>{console.log(error)});
            setOpen1(false);
            window.location.reload()
        }
        else{
            console.log({"quantity":quant,"returnable":ret,"maxDays":null})
            items.updateItem(Id,{"quantity":quant,"returnable":ret,"maxDays":null}).catch(error=>{console.log(error);});
            setOpen1(false);
            window.location.reload()
        }
    }
    const handleC = () => {
        setOpen1(false);
        
    };
    const handleCa = () => {
        setI2()
        setI3(0)
        setI4('no')
        setOpen2(false);
    };
    const handle2 = () => {
        setOpen3(false);
    };
    const fun = () => {
        if(ret){setRet(false)}else{setRet(true)}
    }
    const handleSubmit = (event) => {
        console.log('handleSubmit ran');
        event.preventDefault(); 
    }
    const saveAndCheck = (e) => {
        e.preventDefault();
        console.log({ "itemName":i2, "quantity":parseInt(i3),"returnable":i4==='Yes',"maxDays":parseInt(i1)})
        items.saveItem({ "itemName":i2, "quantity":parseInt(i3),"returnable":i4==='Yes',"maxDays":parseInt(i1)}).then((response)=>{ setResults(response.data)
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
    function EditToolbar(props) {

        return (
            <GridToolbarContainer>
                <Button startIcon={<AddIcon />} onClick={handleClickOpen2}>
                    Add Item
                </Button>
            </GridToolbarContainer>
        );
    }


    const [rows, setRows] = useState([]);
    const getData = () => items.getAllItems()
        .then(response =>
            setRows(response.data.map((ite) => {
                return {
                    id: ite.itemId,
                    itemName: ite.itemName,
                    quantity: ite.quantity,
                    maxDays: ite.maxDays,
                    returnable: ite.returnable
                }
            }))).catch(error=>{console.log(error)});
    useEffect(() => { getData(); }, [])
    useEffect(() => {
        console.log(rows.slice().sort((a,b)=>(a.id-b.id)))
        setItem1(rows.slice().sort((a,b)=>(a.id-b.id)))
    }, [rows])

    const columns = [
        { field: 'id', headerName: 'ID', flex: .2 },
        { field: 'itemName', headerName: 'Item Name', flex: .6 },
        { field: 'quantity', headerName: 'Quantity in Stock', type: 'number', flex: .3 },
        {
            field: 'maxDays',
            headerName: 'To be returned in (days)',
            valueGetter: (params) => {
                if (!params.value)
                    return "Not returnable";
                return params.value;
            }, flex: .4
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            cellClassName: 'actions',
            getActions: (params ) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => handleClickOpen1(params.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleClickOpen(params.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    return(
        <div>
            <Card className="App-Card">
            <Typography variant="h4" component="h1" >
                INVENTORY
            </Typography>
            <Container component="main" maxWidth="md">
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={item1}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10},
                            },
                        }}
                        pageSizeOptions={[5,10]}
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: EditToolbar,
                        }}
                    />
                </div>
                </Container>
        </Card>
        <div>
        
            <Dialog open={open} onClose={handleClose} position={{ X: 0, Y: 140 }}>
                <DialogTitle>
                    Confirm the action
                </DialogTitle>
                
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
        
            <Dialog className="bd-example text-white example-margin" style={{padding: "0rem"}} open={open1} onClose={handleC} >
                <DialogTitle>
                   Edit the details here
                </DialogTitle>
                <DialogContent className="pr-4">
                <Grid container spacing={2} >
                    <Grid container item xs={5} direction="column" >
                      <>Item Quantity :</>  
                    </Grid>
                    <Grid container item xs={4} direction="column" >
                    <input
                                        type = "number"
                                        placeholder="enter count"
                                        name = "i3"
                                        min="0"
                                        //value = {i3}
                                        //className="form-control"
                                        onChange={event => setQuant(event.target.value)}
                                    ></input>
               
                    </Grid>
                </Grid>

                </DialogContent>
                <DialogContent className="pr-4">
                <Grid container spacing={2} >
                    <Grid className="margin1" direction="column" >
                    <>Borrow Days :</>
                        
                    </Grid>
                    <Grid className="margin1" direction="column" >
                    {ret?<>
                    <button className="pl-4" onClick={()=>{if(days!==0)setDays(days-1)}}>-</button>&nbsp;&nbsp;{days===null ?<>{setDays(0)}</>:days}&nbsp;&nbsp;
                    <button className="pl-4" onClick={()=>{setDays(days+1)}}>+</button></>:<>&nbsp;0</>}
                        
                    </Grid>
                </Grid>
                </DialogContent>
               <DialogContent className="pr-4">
               <Grid container spacing={2} >
                    <Grid container item xs={5} direction="column" >
                    <>Returnable : </>
                    </Grid>
                    <Grid container item xs={4} direction="column" >
                        <test>{ret ? (<test>Yes</test>) : (<test>No</test>)}&nbsp;&nbsp;</test>
                    <button className="pl-4" onClick={fun}>Change</button>
                    </Grid>
                </Grid>
               
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
            
            <DialogTitle>
                   Add the details here
                </DialogTitle>
                    <div>
                    <div className="container">
                <div className="row">
                    <div >
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                
                                <div className="form-group-mb-2">
                                <Grid container spacing={2} >
                                    <Grid className="margin2" container item xs={5} direction="column" >
                                    <>Item Name : &nbsp;</>
                                        
                                    </Grid>
                                    <Grid className="margin2" container item xs={4} direction="column" >
                                    <input
                                        type = "text"
                                        placeholder="enter name"
                                        name = "i2"
                                        value = {i2}
                                       // className="form-control"
                                        onChange={(e)=>setI2(e.target.value)}
                                    ></input>
                                        
                                    </Grid>
                                    </Grid>
                                </div>
                                <div className="form-group-mb-2">
                                <Grid className="margin2" container spacing={2} >
                                    <Grid container item xs={5} direction="column" >
                                    <>Item Quantity : &nbsp;&nbsp;</>
                                        
                                    </Grid>
                                    <Grid className="margin2" container item xs={4} direction="column" >
                                    <input
                                        type = "number"
                                        placeholder="enter count"
                                        name = "i3"
                                        min="0"
                                        //value = {i3}
                                        //className="form-control"
                                        onChange={(e)=>setI3(e.target.value)}
                                    ></input>
                                        
                                    </Grid>
                                    </Grid>
                                </div>
                                <div ><Grid container spacing={2} >
                                    <Grid className="margin2" container item xs={5} direction="column" >
                                    <>Returnable :</>
                                        
                                    </Grid>
                                    <Grid className="margin2" container item xs={4} direction="column" >
                                    <select id="mySelect"
                                        onChange={(e)=>setI4(e.target.value)}
                                        
                                    >
                                        <option disabled selected value=''> -- select an option -- </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        
                                    </select>
                                    {/* <Checkbox defaultChecked
                                    
                                    onChange={(e)=>setI4(e.target.i4)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    /> */}
                                        
                                    </Grid>
                                    </Grid>
                                </div>
                                <div>
                                <Grid container spacing={2} >
                                <Grid className="margin2" container item xs={5} direction="column" >
                                    <>Borrow Days :</>
                                    
                                </Grid>
                                <Grid className="margin2" container item xs={4} direction="column" >
                                    
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
                                </div>
                                <DialogActions>
                                    <Button onClick={(e)=>saveAndCheck(e)} color="primary" variant="contained" >
                                        Save
                                    </Button>
                                    <Button onClick={handleCa} color="secondary" variant="contained">
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