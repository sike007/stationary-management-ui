import axios from "axios";
const url = 'http://localhost:8080/inventory/v1/stationary_item'
class items{
    getAllItems(){
        return axios.get(url);
    }
    deleteItem(pram){
        return axios.delete(url+"/"+pram)
    }
    updateItem(pram1,data){
        return axios.patch(url+"/"+pram1,data)
    }
    saveItem(data){
        return axios.post(url+"/add_item ",data)
    }
}
export default new items();