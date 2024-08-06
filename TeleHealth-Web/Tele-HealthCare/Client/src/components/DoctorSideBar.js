import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'




function DoctorSideBar() {

  
    // const [name, setName] = useState('')
    // const [password, setPassword] = useState('')
    // const [designation, setDesignation] = useState('')
    // const [gender, setGender] = useState('')
    // const [address, setAddress] = useState('')
    // const [highest_qualification, setHighest_qualification] = useState('')
    
    

    let navigate = useNavigate()


    
// const getData = () =>{

//     Axios.post('http://localhost:3001/profile').then((res)=>{
//       var string = JSON.stringify(res.data)
//       var json = JSON.parse(string)
      
//       // alert("hello"+json[0].signin_id);

//       // setID(json[0].signin_id)
//       setName(json[0].name)
//       setPassword(json[0].password)
//       setDesignation(json[0].designation)
//       setGender(json[0].gender)
//       setAddress(json[0].address)
//       setHighest_qualification(json[0].highest_qualification)

//       // alert(json[0].signin_id +"\n"+ name+"\n"+password+"\n"+designation+"\n"+gender+"\n"+address+"\n"+highest_qualification)

//       // alert(signin_id +"\n"+ name+"\n"+password+"\n"+designation+"\n"+gender+"\n"+address+"\n"+highest_qualification)





//     })

//   }



//   getData();

        // alert( name+"\n"+password+"\n"+designation+"\n"+gender+"\n"+address+"\n"+highest_qualification)



        

        const {v4: uuidV4} = require('uuid')


        





    return(
      <div>
        
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion p-0" style={{background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)', height:'100%',  boxShadow: '3px 0px 8px rgba(0,0,0,0.75)'}}>
    <div className="container-fluid d-flex flex-column p-0">
      <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" >
        <div className="d-flex float-start sidebar-brand-icon">
          <div>
            <img className="logo" src="https://icon-library.com/images/healthcare-icon/healthcare-icon-7.jpg" style={{width: "40px", height: "40px"}} /></div>
          <div>
            <h6 style={{textAlign: 'left', color:'white', fontFamily: 'ABeeZee, sans-serif', marginTop: "11px", marginLeft: "5px"}}>Tele-HealthCare</h6>
          </div>
        </div>
      </a>
      <hr className="sidebar-divider my-0" />
      <ul className="navbar-nav text-light" id="accordionSidebar" style={{boxShadow: '0px 0px'}}>
        <li className="nav-item" />
        <li className="nav-item">
          {/* <a className="nav-link" href="/dashboard" style={{marginRight: "7px"}}>
            <i className="fas fa-tachometer-alt" style={{marginRight: "8px"}} />
            <span>Dashboard</span>
            </a> */}

{/* href={`/profile/${name}/${password}/${designation}/${gender}/${address}/${highest_qualification}`} */}


            <a className="nav-link" href='/profile'>
              <i className="fas fa-user" style={{marginRight: "8px"}} /><span>Profile</span></a>
              <a className="nav-link" href="/meetings"><i className="fas fa-video" style={{marginRight: "8px"}} /><span>Upcoming Meetings</span></a></li>
        <li className="nav-item">
          <a className="nav-link" href="/appointments"><i className="fas fa-list-alt" style={{marginRight: "8px"}} /><span>Appointments</span></a></li>
        <li className="nav-item">
          <a className="nav-link" href="/patients"><i className="fas fa-clipboard-list" style={{marginRight: "8px"}} /><span>Patients</span></a>
          {/* <a className="nav-link" href="/messages"><i className="fas fa-envelope" style={{marginRight: "8px"}} /><span>Messages</span></a> */}
          </li>
        
      </ul>
    </div>
  </nav>

                
{/* 
                <li key={'VideoCall'} className='nav-text'>
                            <Link to={`/video_call/${uuidV4()}`} >
                            <AiIcons.AiFillVideoCamera/>
                                <span>Video Call</span>
                            </Link>
                        </li> */}





        </div>
        
    )

}
export default DoctorSideBar;