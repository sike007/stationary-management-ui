import './App.css';
import Footer from './components/Footer';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import useToken from './components/App/useToken.js';
import Login from './components/Login';
import PageRoutes2 from './components/PageRoutes2';
import PageRoutes3 from './components/PageRoutes3';


function App() {
  const {token,setToken} = useToken();

  if(!token) {
    return (
      <Login setToken={setToken} />)
  }
  if(token==="admin"){
    return (
      <BrowserRouter>
        <div className="App">
          <PageRoutes2 />
          <PageRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
  return (
    <BrowserRouter>
      <div className="App">
        <PageRoutes2 />
        <PageRoutes3 />
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;