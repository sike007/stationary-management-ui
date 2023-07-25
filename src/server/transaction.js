import axios from "axios";
const url = 'http://localhost:8080/inventory/v1/transaction'
class transaction{
    getAllTransactions(){
        return axios.get(url);
    }
    createTransaction(pram,data){
        return axios.post(url+"/"+pram,data)
    }
    getTransactionByStudent(pram,data){
        return axios.get(url+"/all/by_student_id?id="+pram,data)
    }
    updateOneTransaction(pram,data){
        return axios.patch(url+"/"+pram,data)
    }
}
export default new transaction();
