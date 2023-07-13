import { Card } from "@mui/material"
import Button from '@mui/material/Button';
const Home = () => {
    return (
        <Card className="App-Card">
            <h3>Home</h3>
        <Button variant="contained" href="./login" style={{float: 'right'}} color="primary" >
             Login
        </Button>
        </Card>
    )
}
export default Home;