import axios from "axios";
const url = 'http://localhost:8080/api/stationaryItem'
class items{
    getAllItems(){
        return axios.get(url);
    }
    deleteItem(pram){
        return axios.delete(url+"/"+pram)
    }
}
export default new items();