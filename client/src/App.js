import Login from './Login';
import Ownerpage from './Ownerpage';
import Adminpage from './Adminpage';
import './App.css';
// import Axios from 'axios';
import { BrowserRouter, Route, Routes, Switch, Link, useNavigate } from 'react-router-dom';
//import Adminpage from './adminpage';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Login/>} />
        <Route path="/Adminpage" element={<Adminpage />} />
        <Route path="/Ownerpage" element={<Ownerpage />} />
      </Routes>
      
    </BrowserRouter>

  );
}

export default App;
