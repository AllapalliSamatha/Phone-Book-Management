import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate here

import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddContact from './components/AddContact'; // Import AddContact
import UpdateContact from './components/UpdateContact';



function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home/*' element={<Home />} />
        <Route path='/add' element={<AddContact />} />
        <Route path='/update-contact/:id' element={<UpdateContact />} />
       
        
      </Routes>

    </div>
  );
}

export default App;