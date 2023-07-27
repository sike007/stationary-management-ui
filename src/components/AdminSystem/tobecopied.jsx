import { useEffect, useState } from "react";
import * as React from 'react';
import items from "../../server/items";
import { Card, Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const AdminSystem = () => {

    const [ID, setID] = useState()
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [quant, setQuant] = useState(0)
    const [ret, setRet] = useState()
    const [i2, setI2] = useState()
    const [i3, setI3] = React.useState(0);
    const [i4, setI4] = React.useState();
    const [results, setResults] = useState(0);

    const handleClickOpenDelete = (e) => {
        setOpenDelete(true);
        setID(e);
    };
    const handleClickOpenEdit = (a, b, c) => {
        setOpenEdit(true);
        setQuant(b)
        setRet(c)
        setID(a);
    };
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleClickOpen3 = () => {
        setOpen3(true);
    };
    const handleClose1 = () => {
        items.deleteItem(ID).catch(error => { console.log(error) });
        setOpenDelete(false);
        window.location.reload();
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleC1 = () => {
        console.log({ "quantity": quant })
        items.updateItem(ID, { "quantity": quant, "returnable": ret }).catch(error => { console.log(error) });
        setOpenEdit(false);
        window.location.reload();
    }
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handle2 = () => {
        setOpen3(false);
    };
    const fun = () => {
        if (ret) { setRet(false) } else { setRet(true) }
    }
    const handleSubmit = (event) => {
        console.log('handleSubmit ran');
        event.preventDefault();
    }
    const saveAndCheck = (e) => {
        e.preventDefault();
        console.log({ "itemName": i2, "quantity": parseInt(i3), "returnable": i4 === 'true' })
        items.saveItem({ "itemName": i2, "quantity": i3, "returnable": i4 }).then((response) => {
            setResults(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error)
            handleClickOpen3();
        })
    }
    useEffect(() => {
        if (results !== 0) {
            setOpenAdd(false);
            window.location.reload()
        } else {
            setOpenAdd(false);
            setResults(0);
        }
    }, [results])
    function EditToolbar(props) {

        return (
            <GridToolbarContainer>
                <Button startIcon={<AddIcon />} onClick={handleClickOpenAdd}>
                    Add Item
                </Button>
            </GridToolbarContainer>
        );
    }


    const [rows, setRows] = useState([]);
    const getData = () => items.getAllItems()
        .then(response =>
            setRows(response.data.map((item) => {
                return {
                    id: item.itemId,
                    itemName: item.itemName,
                    quantity: item.quantity,
                    maxDays: item.maxDays
                }
            })));
    useEffect(() => { getData(); }, [])

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
            getActions: ({ id, quantity, maxDays }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => handleClickOpenEdit(id, quantity, maxDays)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleClickOpenDelete(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    return (
        <Card className="App-Card">
            <Typography variant="h4" component="h1" >
                INVENTORY
            </Typography>
            <Container component="main" maxWidth="md">
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: EditToolbar,
                        }}
                    />
                </div>
                <div>

                    <Dialog open={openDelete} onClose={handleCloseDelete} position={{ X: 0, Y: 140 }}>
                        <DialogTitle>
                            do you want to delete this item
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose1} color="primary">
                                Yes
                            </Button>
                            <Button onClick={handleCloseDelete} color="primary" autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog className="dialog1" open={openEdit} onClose={handleCloseEdit}>
                        <DialogTitle>
                            do you want to edit this item
                        </DialogTitle>
                        <DialogContent>
                            <button className="butt2" onClick={() => { if (quant !== 0) setQuant(quant - 1) }}>-</button>&nbsp;&nbsp;{quant}&nbsp;&nbsp;
                            <button className="butt2" onClick={() => { setQuant(quant + 1) }}>+</button>
                        </DialogContent>
                        <DialogContent>
                            <test>return type:{ret ? (<test>yes</test>) : (<test>no</test>)}&nbsp;&nbsp;</test>
                            <button className="butt2" onClick={fun}>change</button></DialogContent>
                        <DialogActions>

                            <Button onClick={handleC1} color="primary">
                                Yes
                            </Button>
                            <Button onClick={handleCloseEdit} color="primary" autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div >
                    <Dialog maxWidth="md" open={openAdd} onClose={handleCloseAdd} >
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
                                                            type="text"
                                                            placeholder="enter name"
                                                            name="i2"
                                                            value={i2}
                                                            className="form-control"
                                                            onChange={(e) => setI2(e.target.value)}
                                                        ></input>
                                                    </div>
                                                    <div className="form-group-mb-2">
                                                        <label className="form-label">
                                                            item count
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="enter count"
                                                            name="i3"
                                                            value={i3}
                                                            className="form-control"
                                                            onChange={(e) => setI3(e.target.value)}
                                                        ></input>
                                                    </div>
                                                    <div className="form-group-mb-2">
                                                        <label className="form-label">
                                                            returnable
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            value="true"
                                                            name="ok"
                                                            onChange={(e) => setI4(e.target.value)}
                                                        ></input>true
                                                        <input
                                                            type="radio"
                                                            value="false"
                                                            name="ok"
                                                            onChange={(e) => setI4(e.target.value)}
                                                        ></input>false
                                                    </div>
                                                    <button className='butt2' onClick={(e) => saveAndCheck(e)}>save</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleCloseAdd} color="primary" autoFocus>
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
            </Container >
        </Card >
    )
}
export default AdminSystem