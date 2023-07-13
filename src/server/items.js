import axios from "axios";
const url = 'http://localhost:8080/api/stationaryItem'
class items{
    getAllItems(){
        return axios.get(url);
    }
}
export default new items();