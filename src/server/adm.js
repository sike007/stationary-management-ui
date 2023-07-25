import axios from "axios";
const url = 'http://localhost:8080/inventory/v1/admin'
class adm{
    loginAdmin(creds){
        return axios.post(url+"/login",creds);
    }
    getAdminName(){
        return axios.get(url);
    }
}
export default new adm();