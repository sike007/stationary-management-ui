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
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


const Transaction = () => {
    const [open1, setOpen1] = React.useState(false);
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
            { field: 'id', headerName: 'ID', flex: .2 },
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
        <header className="header1">
            </header>
        <Card className="App-Card">
            <h3>Student Transactions</h3>
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
                Do you want to return this item
                </DialogTitle>
                <DialogActions>
                    <Button onClick={return1} color="primary" variant="contained" >
                        return
                    </Button>
                    <Button onClick={handleca} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </DialogActions> 
            </Dialog>
        </div>
    </div>
    )
}
export default Transaction
