import { Card } from "@mui/material"
import { useState , useEffect}  from "react"
import items from "../../server/items"


const Home = () => {
    useEffect(
        () =>
          {window.history.pushState(null, document.title, window.location.href);
            window.addEventListener('popstate', function (event){
                window.history.pushState(null, document.title,  window.location.href);
            });})
    const [item , setItem] = useState([])
    useEffect(() => {

        getAll();
    }, [])

    const getAll = () => {
        items.getAllItems().then((response) => {
            setItem(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
    return (
        <div>
        <Card className="App-Card">
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Item Id </th>
                    <th> Item Name </th>
                    <th> Item Quantity </th>
                    <th> returnable type </th>
                </thead>
                <tbody>
                    {
                        item.map(
                            itm =>
                            <tr key = {itm.itemId}> 
                                <td> {itm.itemId} </td>
                                <td> {itm.itemName} </td>
                                <td> {itm.quantity} </td>
                                {itm.returnable ? (
                                    <td>yes</td>
                                        ) : (
                                    <td>no</td>
                                )}
                            </tr>
                        )
                    }
                </tbody>
            </table>
            
        </Card>

        </div>

    )
}
export default Home;