import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Appointment from './Components/Appointment';
import CreateAppointment from './Components/CreateAppointment';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Routes>
         <Route path='/' element={<Register/>}></Route>
         <Route path='/register' element={<Register/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
         <Route path='/profile' element={<Profile/>}></Route>
         <Route path='/appointment' element={<Appointment/>}></Route>
         <Route path='/appointments' element={<Appointment/>}></Route>
         <Route path='/create-appointment' element={<CreateAppointment/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
