

import React, { useEffect, useRef, useState } from 'react';
import Axios from'axios';
import DoctorNavbar from '../components/DoctorNavbar';
import ModeratorSideBar from '../components/ModeratorSidebar';



function Approve_Doctor_Registration(){

  var number = 0


    const [render, setRender] = useState(true)

    const getModeratorID = ()=>{
      
        Axios.get('http://localhost:3001/Moderator_ID').then(res => {
                  
        // setList(res.data)
        
      
        var string = JSON.stringify(res.data)
            
        var json = JSON.parse(string)
      
      // alert(string)
        // alert(json.doctor_id);


        if(json.moderator_id === 0){
          setRender(false)
          window.location='/'
          alert("You Need To Sign In First!!!")
        }
        
            })
      
      }
      
      // getModeratorID()
      



      const [list, setList] = useState([])


      const Doctor_Registration_List = ()=>{

        Axios.get('http://localhost:3001/Doctor_Registration_List').then(res => {
            
            setList(res.data)

        })
      } 



      // Doctor_Registration_List()



                       



  const isMounted = useRef(true)


  useEffect(()=>{
    getModeratorID()
    Doctor_Registration_List()
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((resJson)=>{resJson.json()})
      .then((res)=>{setInterval(()=>{
          if(isMounted.current){
      getModeratorID()
      Doctor_Registration_List()
          }
      }, 1000)})
      
      return(()=>{
          isMounted.current = false;
      })
      }, []);






      const approving_Appointment = (appointment_id)=>{
        
        Axios.put('http://localhost:3001/approving_Appointment', {
            appointment_id: appointment_id
        })

        Doctor_Registration_List()
      
    }


    

  


    return(
        <div >

        {render && (


<div id="wrapper" style={{background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)'}}>

<ModeratorSideBar/>
<div className="d-flex flex-column" id="content-wrapper" style={{background: '#bac6dd'}}>
  <div id="content" style={{color: '#2D2F3E'}}>
    
    <DoctorNavbar/>


    <div className="container-fluid" >
      <div className="row heading" style={{height: "59px"}}>
        <div className="col-12 col-sm-6 col-md-6 " style={{height: "59px", width:'120%'}}>
          <h3 className="text-white mb-4 header" style={{ fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>Approve Doctor Registration</h3>
        </div>

      </div>
      <div className="row table-row-container" style={{ maxWidth: "147%", width: "147%"}}>  
          <div className="container py-5">
            <div className="row" style={{ maxWidth:'100%', minWidth:'15%'}}>
              <div className="col-lg-7 mx-auto bg-white rounded shadow" style={{ maxWidth:'100%'}}>
                {/* Fixed header table*/}
                
                
                <div className="table-responsive" style={{ maxWidth:'100%'}}>
                  <table className="table" style={{ maxWidth:'100%'}}>
                  <thead>
       
                    <tr style={{textAlign:'center'}}>
                      <th scope="col" className="col-3"  />
                      <th scope="col" className="col-3">Doctor Name</th>
                      <th scope="col" className="col-3">Doctor Designation</th>
                      <th scope="col" className="col-3">Doctor Gender</th>
                      <th scope="col" className="col-3">Doctor Address</th>
                      <th scope="col" className="col-3">Doctor Highest Qualification</th>
                      <th scope="col" className="col-3">Doctor Email Address</th>
                      <th scope="col" className="col-3">Doctor Contact Number</th>
                      <th scope="col" className="col-3" />
                    </tr>
              
                  </thead>

       
                  <tbody>
           
                  {list.map((val,key)=>{
      return(
        <tr style={{textAlign:'center'}}>
          
          <th scope="row" className="col-3">{++number}</th>
          


<td className="col-3">{val.R_name}</td>

<td className="col-3">{val.R_designation}</td>

<td className="col-3">{val.R_gender}</td>

<td className="col-3">{val.R_address}</td>

<td className="col-3">{val.R_highestqualification}</td>

<td className="col-3">{val.R_email}</td>

<td className="col-3">{val.R_contact}</td>

      
                      {/* <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{approving_Appointment(val.appointment_id)}}  style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                        <i className="fas fa-calendar" style={{marginRight: "8px"}} />
                        Approve
                        </a>
                      </td> */}
          

              

           

        </tr>



      )
    })}
           
                    
                  </tbody>
                </table>
              </div>{/* End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  

        </div>


        )}




        </div>
    )


}


export default Approve_Doctor_Registration