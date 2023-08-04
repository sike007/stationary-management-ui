import { Box, Card, Container, Alert,Snackbar, Tooltip } from "@mui/material"
import items from "../../server/items";
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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import VerticalTab from "../VerticalTab";


const Student = () => {
    const [quant , setQuant] = useState()
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [Id,setId] = useState()
    const [count,setCount] = useState()
    const [type,setType] = useState()
    const [maxd , setMaxd] = useState()
    const [date1] = useState(new Date());
    const [reload,setReload] = useState(0);
    useEffect(()=>{
        items.getOneItem(Id).then((response)=>{setType(response.data.returnable); setQuant(response.data.quantity); setMaxd(response.data.maxDays)}).catch(
            error=>{console.log(error)}
        )
    },[Id])
    const handleClickOpen1 = (a) => {
        setId(a)
        setOpen1(true);
    };
    const handleclick = (e)=>{
        
        withdraw(e);
    };
    const handleClose = ()=>{
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
    };
    const handleClick1=(e)=>{
        setOpen4(true);
        setQuant(e);
    }
    const handleca =()=>{
        setCount()
        setOpen1(false);
    }
    const withdraw = (e) => {
        var ndate = new Date(date1.getTime());
        ndate.setDate(date1.getDate() + maxd);
        console.log(count)
        if(count==='0' || count===undefined){setOpen3(true)}
        else{
            if(quant<count){handleClick1(quant)}
            else{
                if(!type){
                    items.updateItem(Id,{"quantity":quant-count})
                    setReload(reload+1)
                    setOpen1(false)
                    setCount()
                }
                else{
                    console.log({"stationaryItemId":Id,"withdrawnQuantity":count,"returnDate":ndate.toLocaleDateString('en-GB'),"returned":false})
                    transaction.createTransaction(sessionStorage.getItem("id"),{"stationaryItemId":Id,"withdrawnQuantity":count,"returnDate":ndate.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }).split('/').reverse().join('-'),"returned":false}).catch(error=>{console.log(error)})
                    setReload(reload+1)
                    setOpen1(false)
                    setCount()
                    setOpen2(true)
                }
            }
        }
    }
   
    const handleSubmit = (event) => {
        console.log('handleSubmit ran');
        event.preventDefault(); 
    };
    const handleInput=(e)=>{
        const value = e.target.value;
                if (/^[0-9]*$/.test(value)) {
                    setCount(value);
                    
                }
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
                })));
        useEffect(() => { getData(); }, [reload])
    
        const columns = [
           // { field: 'id', headerName: 'ID', flex: .2, align: 'left', headerAlign: 'left' },
            { field: 'itemName', headerName: 'Item Name', flex: .4, align: 'left', headerAlign: 'left' },
           // { field: 'quantity', headerName: 'Quantity in Stock', type: 'number', flex: .3, align: 'left', headerAlign: 'left' },
            // {
            //     field: 'maxDays',
            //     headerName: 'To be returned in (days)',
            //     valueGetter: (params) => {
            //         if (!params.value)
            //             return "Not returnable";
            //         return params.value;
            //     }, flex: .4, 
            //     align: 'left', headerAlign: 'left' 
            // },
            //{ field: 'quantity', headerName: 'Quantity in Stock', type: 'number', flex: .3, align: 'left', headerAlign: 'left' },
            {
                field: 'maxDays',
                headerName: 'To be returned in (days)',
                valueGetter: (params) => {
                    if (!params.value)
                        return "Non-returnable";
                    return params.value;
                }, flex: .4, 
                align: 'left', headerAlign: 'left' 
            },
            {
                field: 'actions',
                type: 'actions', 
                align: 'center', headerAlign: 'center',
                headerName: 'Actions',
                cellClassName: 'actions',
                getActions: (params) => {
                    return [
                        <GridActionsCellItem
                            icon={<Tooltip title="Withdraw"><ShoppingBagIcon /></Tooltip>}
                            label="Edit"
                            className="gridbutton1"
                            onClick={() => handleClickOpen1(params.id)}
                            color="inherit"
                        />,
                    ];
                },
            },
        ];

    return (
    <div>
        <div><div>
        <Card className="App-Card">
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', }}>
                <VerticalTab activeTab='0' />
                <Container component="main" >
                    <div style={{ width: '100%' , paddingTop: "30px"}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                            sorting: {
                                sortModel: [{field: 'itemName', sort: 'asc'}],
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                    />
                    </div>
                </Container>
            </Box>
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
                                <div className="form-group-mb-2">
                                <Grid container spacing={2} >
                                    <Grid container item xs={5} direction="column" >
                                    <>Item Quantity : &nbsp;&nbsp;</>
                                        
                                    </Grid>
                                    <Grid container item xs={4} direction="column" >
                                    
                                    <input
                                        type = "number"
                                        min="1"
                                        placeholder="enter count(positive only)"
                                        style={{width: "210px"}}
                                        name = "i3"
                                        value={count}
                                        onChange={handleInput}
                                    ></input>
                                        
                                    </Grid>
                                    </Grid>
                                </div> <DialogActions>
                                    <Button onClick={handleca} color="primary" variant="contained">
                                        Cancel
                                    </Button>
                                    <Button onClick={(e)=>handleclick(e)} color="secondary" variant="contained" >
                                        Withdraw
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
        <>
        <Snackbar open={open2} onClose={handleClose} autoHideDuration={6000} 
                anchorOrigin={{vertical:'top' ,horizontal:'center'}}>
                <Alert onClose={handleClose} severity="success" >
                Item withdrawn successfully
                </Alert>
        </Snackbar>
        <Snackbar open={open3} onClose={handleClose} autoHideDuration={6000}
                anchorOrigin={{vertical:'top' ,horizontal:'center'}}>
                <Alert onClose={handleClose} severity="error" >
                Item quantity shouldn't be zero
                </Alert>
        </Snackbar>
        <Snackbar open={open4} onClose={handleClose} autoHideDuration={6000}
                anchorOrigin={{vertical:'top' ,horizontal:'center'}}>
                    
                <Alert onClose={handleClose} severity="error" >
                {"Item quantity must be lessthan or equal to "+quant}
                </Alert>
        </Snackbar>    
        </>
        </div></div>
    </div>
    )
}
export default Student;
