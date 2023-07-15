
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import adm from "../../server/adm";
import { Alert } from 'bootstrap';
    


const AdminLogin = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const handleSystem = () => {
        navigate('/admin/system',{state:{who:results.admin.adminName}})
        handleClose()
      }
    const handleClose = () => {
        setAnchorEl(null);
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
                                        type = "text"
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
        </div>
        
    )
}
export default AdminLogin