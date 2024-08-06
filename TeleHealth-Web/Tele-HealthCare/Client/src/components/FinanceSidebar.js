import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'




function FinanceSidebar() {



    
        

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
              <a className="nav-link" href="/pending_payments" style={{marginRight: "7px"}}>
                <i className="fas fa-tachometer-alt" style={{marginRight: "8px"}} />
                <span>Pending Payment</span></a>
                <a className="nav-link" href='/completed_payments'>
                  <i className="fas fa-user" style={{marginRight: "8px"}} />
                  <span>Complete Payment</span></a>
</li>
            
          </ul>
        </div>
      </nav>
    
            </div>
            
        )



}
export default FinanceSidebar;