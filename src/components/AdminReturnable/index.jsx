import { Card, Container } from "@mui/material"
import { useEffect, useState } from "react";
import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
  } from '@mui/material';  
import transaction from "../../server/transaction";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';


const AdminReturnable = () => {
    const [open1, setOpen1] = React.useState(false);
    const [id,setId] = useState()
    const [i1,setI1] = useState()
    const [date1] = useState(new Date())
    const [item1,setItem1] = useState([])
    const handleca =()=>{
        setI1()
        setOpen1(false);
    }
    const return1=()=>{
        var ndate = new Date(date1.getTime());
        ndate.setDate(date1.getDate() + parseInt(i1));
        transaction.updateOneTransaction(id,{"returnDate":ndate.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-')}).then((response)=>{console.log(response)}).catch(error=>{console.log(error)})
        window.location.reload()
        
    }
        const handleClickOpen1 = (a) => {
            setId(a)
            setOpen1(true);
        };
        const handleSubmit = (event) => {
            console.log('handleSubmit ran');
            event.preventDefault(); 
        }
        const [rows, setRows] = useState([]);
        const getData = () => transaction.getAllTransactions()
            .then(response =>
                setRows(response.data.map((ite) => {
                    return {
                        id: ite.transactionId,
                        itemName: ite.stationaryItem.itemName,
                        quantity: ite.withdrawnQuantity,                        
                        maxDays: ite.returnDate,
                        returnable: ite.returned,
                        student: ite.student.studentName
                    }
                })));
        useEffect(() => { getData(); }, []) 
        useEffect(() => {
            setItem1(rows.slice().sort((a,b)=>(a.id-b.id)))
            setItem1(current =>
                current.filter(employee => {
                  return !employee.returnable ;
                }),
              );
        }, [rows])
    
        const columns = [
            { field: 'id', headerName: 'ID', flex: .2 },
            {field: 'student', headerName: 'Student Name', flex: .4 },
            { field: 'itemName', headerName: 'Item Name', flex: .4 },
            { field: 'quantity', headerName: 'Quantity to be return', type: 'number', flex: .4 },
            {
                field: 'maxDays',
                headerName: 'Return Date',
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
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => handleClickOpen1(id)}
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
            <h3>Collectable Items</h3>
            <Container component="main" maxWidth="md">
                <div style={{ width: '100%' }}>
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
        </Card>
        <div >
        <Dialog maxWidth="md" open={open1} onClose={ handleca} > 
                <DialogTitle>
                Change the return date here
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
                                    <>Borrow Date : &nbsp;&nbsp;</>
                                        
                                    </Grid>
                                    <Grid container item xs={4} direction="column" >
                                    
                                    <input
                                        type = "number"
                                        min="0"
                                        placeholder="enter count"
                                        name = "i1"
                                        onChange={(e)=>setI1(e.target.value)}
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
                                    <Button onClick={(e)=>return1(e)} color="primary" variant="contained" >
                                        change
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
export default AdminReturnable
