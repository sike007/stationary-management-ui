import axios from "axios";
const url = 'http://localhost:8080/api/transaction'
class transaction{
    getAllTransactions(){
        return axios.get(url);
    }
    updateTransaction(pram1,data){
        return axios.patch(url+"/"+pram1,data)
    }
    createTransaction(data){
        return axios.post(url+"/save",data)
    }
}
export default new transaction();