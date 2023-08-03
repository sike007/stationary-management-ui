import { Box, Card, Container,Alert,Snackbar  } from "@mui/material"
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
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import VerticalTab from "../VerticalTab";


const Transaction = () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [id,setId] = useState()
    const [item1,setItem1] = useState([])
    const handleca =()=>{
        setOpen1(false);
    }
    const return1=()=>{
        transaction.updateOneTransaction(id,{"returned":true})
        window.location.reload()
    }
    const handleClickOpen1 = (a) => {
            setId(a)
            setOpen1(true);
        };
    const handleClose= ()=>{
            setOpen2(false);
        };
    const return2=()=>{
        setOpen2(true);
        return1();

    };
        const [rows, setRows] = useState([]);
        const getData = () => transaction.getTransactionByStudent(sessionStorage.getItem('id'))
            .then(response =>
                setRows(response.data.map((ite) => {
                    return {
                        id: ite.transactionId,
                        itemName: ite.stationaryItem.itemName,
                        quantity: ite.withdrawnQuantity,                        
                        maxDays: ite.returnDate,
                        returnable: ite.returned,
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
            { field: 'id', headerName: 'ID', flex: .2,  align: 'left', headerAlign: 'left' },
            { field: 'itemName', headerName: 'Item Name', flex: .4,  align: 'left', headerAlign: 'left' },
            { field: 'quantity', headerName: 'Quantity to be return', type: 'number', flex: .4,  align: 'left', headerAlign: 'left' },
            {
                field: 'maxDays',
                headerName: 'Return Date',
                align: 'left', headerAlign: 'left',
                valueGetter: (params) => {
                    if (!params.value)
                        return "Not returnable";
                    return params.value;
                }, flex: .4
            },
            {
                field: 'actions',
                type: 'actions',  
                align: 'center', headerAlign: 'center' ,
                headerName: 'Actions',
                cellClassName: 'actions',
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<KeyboardReturnIcon />}
                            label="Edit"
                            onClick={() => handleClickOpen1(id)}
                            color="inherit"
                        />,
                    ];
                },
            },
        ];
    return (
        <div class name="body">
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
                Do you want to return this item
                </DialogTitle>
                <DialogActions>
                    <Button onClick={return2} color="primary" variant="contained" >
                        return
                    </Button>
                    <Button onClick={handleca} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </DialogActions> 
            </Dialog>
        </div>
        <><Snackbar open={open2} onClose={handleClose} 
                anchorOrigin={{vertical:'top' ,horizontal:'center'}}>
                <Alert onClose={handleClose} severity="success" >
                Item returned successfully
                </Alert>
            </Snackbar>
            
            </>
    </div>
    )
}
export default Transaction
