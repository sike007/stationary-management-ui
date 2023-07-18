
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import adm from "../../server/adm";
import { Navigation } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
    


const AdminLogin = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleSystem = () => {
        navigate('/admin/system',{state:{who:results.admin.adminName}})
        handleClose()
      }
    const handleClose = () => {
        setAnchorEl(null);
      };
      const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose1 = () => {
        setOpen(false);
    };
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [results,setResults] = useState({});
    const saveAndCheck = (e) => {
        e.preventDefault();
        console.log({ "adminEmail":name, "adminPassword":pass})
        adm.loginAdmin({ "adminEmail":name, "adminPassword":pass} ).then((response)=>{ setResults(response.data)
            console.log(response.data);}).catch(error => {
            console.log(error)
            setName("")
            setPass("")
            handleClickOpen();
        })
    }
    useEffect(()=>{
        if(results.status){
            handleSystem()
        }
      },[results])
      
      
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">Admin login</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group-mb-2">
                                    <label className="form-label">
                                        email
                                    </label>
                                    <input
                                        type = "text"
                                        placeholder="enter email"
                                        name = "name"
                                        value = {name}
                                        className="form-control"
                                        onChange={(e)=>setName(e.target.value)}
                                    ></input>
                                </div>
                                <div className="form-group-mb-2">
                                    <label className="form-label">
                                        password
                                    </label>
                                    <input
                                        type = "password"
                                        placeholder="enter password"
                                        name = "pass"
                                        value = {pass}
                                        className="form-control"
                                        onChange={(e)=>setPass(e.target.value)}
                                    ></input>
                                </div>
                                
                                <button className='butt' onClick={(e)=>saveAndCheck(e)}>next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <Dialog open={open} onClose={handleClose1}>
                <DialogTitle>
                    invalid email or password 
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </div>
        
    )
}
export default AdminLogin