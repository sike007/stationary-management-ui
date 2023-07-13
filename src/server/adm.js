import axios from "axios";
const url = 'http://localhost:8080/api/admin'
class adm{
    getAllAdm(){
        return axios.get(url);
    }
    loginAdmin(creds){
        return axios.post(url+"/login",creds);
    }
}
export default new adm();