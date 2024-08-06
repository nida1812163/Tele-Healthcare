import React, { useEffect, useRef, useState } from 'react';
import Axios from'axios';
import DoctorNavbar from '../components/DoctorNavbar';
import ModeratorSideBar from '../components/ModeratorSidebar';



function Set_Appointments(){

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
      



      const [appointments_List, setAppointmentList] = useState([])


      const payment_approval = ()=>{

        Axios.get('http://localhost:3001/payment_approval').then(res => {
            
            setAppointmentList(res.data)

        })
      } 



      // payment_approval()




                 
  const isMounted = useRef(true)


  useEffect(()=>{
    getModeratorID()
    payment_approval()
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((resJson)=>{resJson.json()})
      .then((res)=>{setInterval(()=>{
          if(isMounted.current){
      getModeratorID()
      payment_approval()
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

        payment_approval()
      
    }


    

  


    return(
        <div >

        {render && (


<div id="wrapper" style={{background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)'}}>

<ModeratorSideBar/>
<div className="d-flex flex-column" id="content-wrapper" style={{background: '#bac6dd'}}>
  <div id="content" style={{color: '#2D2F3E'}}>
    
    <DoctorNavbar/>


    <div className="container-fluid" style={{marginBottom: "50px"}}>
      <div className="row heading" style={{height: "59px"}}>
        <div className="col-12 col-sm-6 col-md-6 col-1-heading" style={{height: "59px"}}>
          <h3 className="text-white mb-4 header" style={{marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>Set Appointments</h3>
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
                      <th scope="col" className="col-3">Patient Name</th>
                      <th scope="col" className="col-3">Appointment Date</th>
                      <th scope="col" className="col-3">Appointment Time</th>
                      <th scope="col" className="col-3" />
                    </tr>
              
                  </thead>

       
                  <tbody>
           
                  {appointments_List.map((val,key)=>{
      return(
        <tr style={{textAlign:'center'}}>
          
          <th scope="row" className="col-3">{++number}</th>
          


<td className="col-3">{val.patient_name}</td>

            <td className="col-3">  
            {new Date(new Date(val.appointment_date).setDate(new Date(val.appointment_date).getDate() + 1)).toJSON().split('T')[0]}
            </td>
            
            <td className="col-3">
            {(val.appointment_time).split(':').slice(0,-1).join(':')}
            </td>


          

                      <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{approving_Appointment(val.appointment_id)}}  style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                        <i className="fas fa-calendar" style={{marginRight: "8px"}} />
                        Approve
                        </a>
                      </td>
          

              

           

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


export default Set_Appointments