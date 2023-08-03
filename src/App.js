import './App.css';
import Footer from './components/Footer';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import useToken from './components/App/useToken.js';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  const { token, setToken } = useToken();
  let homePage;
  if (!token)
    homePage = <Login setToken={setToken} />;
  else
    homePage = (
      <BrowserRouter>
        <div className="App">
          <Header />
          <PageRoutes />
          <Footer />
        </div>
      </BrowserRouter >
    );
  return homePage;
  
}


export default App;