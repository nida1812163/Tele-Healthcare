
import SignIn from './Sign-In';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Profile from './pages/profile'
import Patients from './pages/patients'
import Meetings from './pages/meetings';
import Appointments from './pages/appointments';
import AdminDoctors from './adminpages/doctors';
import AdminPatients from './adminpages/patients';
import Administrator from './adminpages/admin';
import VideoCall from './Videocalling/App';
import Set_Appointments from './moderator/set_appointments';
import Approved_Appointments from './moderator/approved_appointments';
import Approval_Doctor_Registration from './moderator/approve_doctor_registration';
import Chat from './pages/chat';
import Pending_Payment from './Finance/pending_payment';
import Complete_Payment from './Finance/complete_payment';
import DoctorProfile from './pages/DoctorProfile';
import Report from './pages/report';
import SignUp from './signup';



function App() {

  return(

    <Router>
      <Routes>
        <Route path="/" element={ <SignIn/> }/>
         
        <Route path="/signup" element={ <SignUp/> }/>


         {/* moderator */}
         <Route path='/set_appointments' element={<Set_Appointments/>}/>
         <Route path='/approved_appointments' element={<Approved_Appointments/>}/>
         <Route path='/approve_doctor_registration' element={<Approval_Doctor_Registration/>}/>


         {/* finance */}
         <Route path='/pending_payments' element={<Pending_Payment/>}/>
         <Route path='/completed_payments' element={<Complete_Payment/>}/>



         {/* doctor */}
         {/* <Route path='/profile/:name/:password/:designation/:gender/:address/:highest_qualification' element={<DoctorProfile/>}/> */}
         <Route path='/patients' element={<Patients/>}/>
         <Route path='/meetings' element={<Meetings/>}/>
         <Route path='/appointments' element={<Appointments/>}/>
         <Route path='/video_call' element={<VideoCall/>}/>
         <Route path='/messages' element={<Chat/>}/>
         <Route exact path='/profile' element={<DoctorProfile/>}/>
         <Route exact path='/patient_report' element={<Report/>}/>




         {/* Admin */}
         <Route path='/doctors_list' element={<AdminDoctors/>}/>
         <Route path='/patients_list' element={<AdminPatients/>}/>
         <Route path='/admin_details' element={<Administrator/>}/>
      </Routes>
    </Router>

  
  )
}


export default App;