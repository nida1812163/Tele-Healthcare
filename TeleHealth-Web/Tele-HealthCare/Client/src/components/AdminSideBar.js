import React from 'react';
import * as MdIcons from 'react-icons/md'




function AdminSideBar() {

  
    return(
      <div>
        
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion p-0" style={{background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)', height:'100%',  boxShadow: '3px 0px 8px rgba(0,0,0,0.75)'}}>
    <div className="container-fluid d-flex flex-column p-0">
      <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" >
        <div className="d-flex float-start sidebar-brand-icon">
          <div><img className="logo" src="https://icon-library.com/images/healthcare-icon/healthcare-icon-7.jpg" style={{width: "40px", height: "40px"}} /></div>
          <div>
            <h6 style={{textAlign: 'left', fontFamily: 'ABeeZee, sans-serif', marginTop: "11px", marginLeft: "5px"}}>Tele-HealthCare</h6>
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
            <a className="nav-link" href='/doctors_list'>
            <i style={{fontSize:'18px'}}><MdIcons.MdMedicalServices/></i><span style={{marginLeft:'5px'}}>Doctors</span></a>
              <a className="nav-link" href="/patients_list">
                  <i className="fas fa-clipboard-list" style={{fontSize:'17px'}} /><span style={{marginLeft:'6px'}}>Patients</span></a></li>
        <li className="nav-item">
          <a className="nav-link" href="/admin_details">
          <i style={{fontSize:'20px'}}><MdIcons.MdAdminPanelSettings /></i><span>Administrators</span></a>
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
export default AdminSideBar;