import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Routes>
         <Route path='/' element={<Register/>}></Route>
         <Route path='/register' element={<Register/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </div>
  );
}
