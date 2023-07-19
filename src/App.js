import './App.css';
import Footer from './components/Footer';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import useToken from './components/App/useToken.js';
import Login from './components/Login';
import PageRoutes2 from './components/PageRoutes2';

function App() {
  const {token,setToken} = useToken();

  if(!token) {
    return (
      <Login setToken={setToken} />)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <PageRoutes2 />
        <PageRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;
