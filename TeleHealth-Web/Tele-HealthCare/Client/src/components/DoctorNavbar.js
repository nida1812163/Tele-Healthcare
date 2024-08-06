import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'




function DoctorNavbar() {


    


    let navigate = useNavigate()

    const logout = ()=>{
      Axios.get('http://localhost:3001/logout')
      localStorage.clear()
      navigate('/')
    }






    const [username, setusername]=useState()

    const Full_Name = ()=>{
      Axios.get('http://localhost:3001/full_name').then((res)=>{
        var string = JSON.stringify(res.data)
            
        var json = JSON.parse(string)

        
        setusername(json[0].name)

        // alert(username)

      })
    }

    Full_Name();


        

        const {v4: uuidV4} = require('uuid')


        





    return(
      <div>
        
        <nav className="navbar navbar-light navbar-expand shadow mb-4 topbar static-top" style={{background: 'rgb(41,16,112)', boxShadow: '2px 3px 8px -1px var(--bs-gray-900) !important'}}>
        <div className="container-fluid">
          
          <ul className="navbar-nav flex-nowrap ms-auto">
            

            {/* Logout Button */}
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                  <span className="d-none d-lg-inline me-2 text-gray-100 small" style={{ fontWeight: 'bold', fontSize: '15.6px'}}>{username}</span>
              <div style={{borderRadius:'50px',border:'2px', background:'#ffffff', height:'30px', width:'30px'}}>
              <i className="fas fa-user" style={{ color:'rgb(41,16,112)', marginLeft:'7px',marginTop:'5px', fontSize:'18px'}} />
              </div>
              </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in" style={{paddingTop: "0px", paddingBottom: "0px"}}>
                  <a className="navbar-brand d-flex justify-content-center align-items-center dropdown-item" onClick={logout} style={{padding: "0px", paddingTop: "8px", paddingBottom: "8px"}}>
                    <div style={{width: "29px"}}><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" style={{width: "5px", height: "5px", marginRight: "0px"}} /></div>
                    <div className="d-flex float-start sidebar-brand-icon">
                      <div>
                        <h6 style={{textAlign: 'left', fontFamily: 'Nunito, sans-serif', marginTop: "0px", marginLeft: "0px", fontWeight: 'bold', marginBottom: "0px", marginRight: "40px"}}>Logout</h6>
                      </div>
                    </div>
                  </a></div>
              </div>
            </li>
          </ul>


        </div>


      </nav>


        </div>
        
    )

}
export default DoctorNavbar;