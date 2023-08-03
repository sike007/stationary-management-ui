import { Box, Card, Container, Typography } from "@mui/material"
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
    const [quant , setQuant] = useState(0)
    const [item1,setItem1] = useState([])  
    const [open1, setOpen1] = React.useState(false);
    const [Id,setId] = useState()
    const [count,setCount] = useState(0)
    const [type,setType] = useState()
    const [maxd , setMaxd] = useState()
    const [date1] = useState(new Date());
    useEffect(()=>{
        items.getOneItem(Id).then((response)=>{setType(response.data.returnable); setQuant(response.data.quantity); setMaxd(response.data.maxDays)}).catch(
            error=>{console.log(error)}
        )
    },[Id])
    const handleClickOpen1 = (a) => {
        setId(a)
        setOpen1(true);
    };
    const handleca =()=>{
        setCount(0)
        setOpen1(false);
    }
    const withdraw = (e) => {
        var ndate = new Date(date1.getTime());
        ndate.setDate(date1.getDate() + maxd);
        if(count===0){alert("Item quantity shouldn't be zero" )}
        else{
            if(quant<count){alert("Item quantity must be less than "+quant)}
            else{
                if(!type){
                    items.updateItem(Id,{"quantity":quant-count})
                    window.location.reload()
                }
                else{
                    console.log({"stationaryItemId":Id,"withdrawnQuantity":count,"returnDate":ndate.toLocaleDateString('en-GB'),"returned":false})
                    transaction.createTransaction(sessionStorage.getItem("id"),{"stationaryItemId":Id,"withdrawnQuantity":count,"returnDate":ndate.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }).split('/').reverse().join('-'),"returned":false})
                    window.location.reload()
                }
            }
        }
    }
    
    // const handleC1 = () => {
    //     if(ret){
    //         console.log({"quantity":quant,"returnable":ret,"maxDays":days})
    //         items.updateItem(id,{"quantity":quant,"returnable":ret,"maxDays":days}).catch(error=>{console.log(error)});
    //         setOpen1(false);
    //         window.location.reload()
    //     }
    //     else{
    //         console.log({"quantity":quant,"returnable":ret,"maxDays":null})
    //         items.updateItem(id,{"quantity":quant,"returnable":ret,"maxDays":null}).catch(error=>{console.log(error);});
    //         setOpen1(false);
    //         window.location.reload()
    //     }
    // }
    const handleSubmit = (event) => {
        console.log('handleSubmit ran');
        event.preventDefault(); 
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
        useEffect(() => { getData(); }, [])
        useEffect(() => {
            console.log(rows.slice().sort((a,b)=>(a.id-b.id)))
            setItem1(rows.slice().sort((a,b)=>(a.id-b.id)))
        }, [rows])
    
        const columns = [
            { field: 'id', headerName: 'ID', flex: .2, align: 'left', headerAlign: 'left' },
            { field: 'itemName', headerName: 'Item Name', flex: .6, align: 'left', headerAlign: 'left' },
            { field: 'quantity', headerName: 'Quantity in Stock', type: 'number', flex: .3, align: 'left', headerAlign: 'left' },
            {
                field: 'maxDays',
                headerName: 'To be returned in (days)',
                valueGetter: (params) => {
                    if (!params.value)
                        return "Not returnable";
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
                            icon={<ShoppingBagIcon />}
                            label="Edit"
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
                        rows={item1}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
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
                                    <>Item Quantity : &nbsp;&nbsp;</>
                                        
                                    </Grid>
                                    <Grid container item xs={4} direction="column" >
                                    
                                    <input
                                        type = "number"
                                        min="1"
                                        placeholder="enter count"
                                        name = "i3"
                                        onChange={(e)=>setCount(e.target.value)}
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
                                    <Button onClick={(e)=>withdraw(e)} color="primary" variant="contained" >
                                        Withdraw
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
export default Student;
