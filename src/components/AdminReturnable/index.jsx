import { Box, Card, Container,Alert,Snackbar } from "@mui/material"
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
import VerticalTab from "../VerticalTab";


const AdminReturnable = () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [id,setId] = useState()
    const [i1,setI1] = useState()
    const [date1] = useState(new Date())
    const [item1,setItem1] = useState([])
    const [reload, setReload] = useState(0) 
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
        setReload(reload+1)

        setOpen1(false)
    }
        const handleClickOpen1 = (a) => {
            setId(a)
            setOpen1(true);
        };
        const handleSubmit = (event) => {
            console.log('handleSubmit ran');
            event.preventDefault(); 
        }
        const handleChange=(e)=>{
            setOpen2(true);
            return1(e)
        }
        const handleC = () => {
            setOpen2(false);
            
        };
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
        useEffect(() => { getData(); }, [reload]) 
        useEffect(() => {
            setItem1(rows.slice().sort((a,b)=>(a.id-b.id)))
            setItem1(current =>
                current.filter(employee => {
                  return !employee.returnable ;
                }),
              );
        }, [rows])
    
        const columns = [
            { field: 'id', headerName: 'ID', flex: .2,  align: 'left', headerAlign: 'left' },
            {field: 'student', headerName: 'Student Name', flex: .4,  align: 'left', headerAlign: 'left' },
            { field: 'itemName', headerName: 'Item Name', flex: .4,  align: 'left', headerAlign: 'left' },
            { field: 'quantity', headerName: 'Quantity to be return', type: 'number', flex: .4,  align: 'left', headerAlign: 'left' },
            {
                field: 'maxDays',
                headerName: 'Return Date',
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
                headerName: 'Actions',
                align: 'center', headerAlign: 'center',
                cellClassName: 'actions',
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => handleClickOpen1(id)}
                            color="inherit"
                            title="Edit"
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
                <VerticalTab activeTab='1' />
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
                Change the return date here
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
                                    <>Borrow Days : &nbsp;&nbsp;</>
                                        
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
                                </div>    <DialogActions>
                                    <Button onClick={handleca} color="primary" variant="contained">
                                        Cancel
                                    </Button>
                                    <Button onClick={(e)=>handleChange(e)} color="secondary" variant="contained" >
                                        change
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
        <div><Snackbar open={open2} onClose={handleC} 
                anchorOrigin={{vertical:'top' ,horizontal:'center'}}>
                <Alert onClose={handleC} severity="success" >
                Borrow date changed successfully
                </Alert>
            </Snackbar>
        </div>
        </div></div>
    </div>
    )
}
export default AdminReturnable
