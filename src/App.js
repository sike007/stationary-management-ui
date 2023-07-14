import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes2 from './components/PageRoutes2';

function App() {
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
