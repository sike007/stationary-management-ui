import { useLocation } from "react-router-dom"

const AdminSystem = (pa) => {
    const location = useLocation();
    return(
        <div>
        <h2>welocme </h2>
        <h2>{location.state.who}</h2>
        </div>
    )
}
export default AdminSystem