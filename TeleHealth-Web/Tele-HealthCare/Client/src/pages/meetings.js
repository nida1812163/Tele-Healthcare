import React, {useState} from 'react';
import Axios from'axios';
import DateMomentUtils from '@date-io/moment';
import {DatePicker, TimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DoctorSideBar from '../components/DoctorSideBar';
import DoctorNavbar from '../components/DoctorNavbar'
import {useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'



function Meetings() {

  
var number = 0


  const [isOpen, setIsOpen] = useState(false)


  const[list, setList]=useState([])
    


    const [appointment_date, setAppointmentDate]=useState( )
    const [appointment_time, setAppointmentTime]=useState( )
    const [appointment_id, setAppointmentid]=useState( )


    
    
    const [render, setRender] = useState(true)

    const getDoctorID = ()=>{
      
        Axios.get('http://localhost:3001/Doctor_ID').then(res => {
                  
        // setList(res.data)
        
      
        var string = JSON.stringify(res.data)
            
        var json = JSON.parse(string)
      
      // alert(string)
        // alert(json.doctor_id);


        if(json.doctor_id === 0){
          setRender(false)
          window.location='/'
          alert("You Need To Sign In First!!!")
        }
            })
      
      }
      
      getDoctorID()
      



    const getData = () => {
        Axios.post('http://localhost:3001/meetings').then(res => {
            setList(res.data)
        })
    }
    
    getData()




    const cancel = (appointment_id)=>{
      Axios.delete(`http://localhost:3001/cancel_meeting/${appointment_id}`)
      console.log(appointment_id)
      getData();
  }





  const togglePopup = (appointment_id, appointment_date, appointment_time) => {


    setAppointmentid(appointment_id)
    setAppointmentDate(appointment_date)
    setAppointmentTime(new Date(appointment_date).toDateString() +" "+ appointment_time +" "+ new Date().toTimeString().split(' ')[1])

    setIsOpen(!isOpen)
    console.log(isOpen)

  }


const UpdateAppointment = (appointment_date, appointment_time)=>{

// alert(new Date(new Date(new Date(appointment_date).setDate(new Date(appointment_date).getDate() + 1)).toISOString()).toJSON().split('T')[0])
// alert(new Date(appointment_time).toTimeString().split(' ')[0])

Axios.put('http://localhost:3001/update_apointment', {
  appointment_date: new Date(new Date(new Date(appointment_date).setDate(new Date(appointment_date).getDate() + 1)).toISOString()).toJSON().split('T')[0],
  appointment_time: new Date(appointment_time).toTimeString().split(' ')[0],
  appointment_id: appointment_id 
})

getData()

togglePopup()


}

let navigate = useNavigate()

const VideoCall = ()=>{
  

    navigate('/video_call')
    
}



return(
  <div >
    {render && (
      <div id="wrapper" style={{background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)'}}>

<DoctorSideBar/>
<div className="d-flex flex-column" id="content-wrapper" style={{background: '#bac6dd'}}>
<div id="content" style={{color: '#2D2F3E'}}>
  
  <DoctorNavbar/>


  <div className="container-fluid" style={{marginBottom: "50px"}}>
    <div className="row heading" style={{height: "59px"}}>
      <div className="col-12 col-sm-6 col-md-6 col-1-heading" style={{height: "59px"}}>
        <h3 className="text-white mb-4 header" style={{marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>Upcoming Meetings</h3>
      </div>
      
    </div>
    <div className="row table-row-container" style={{ maxWidth: "147%", width: "147%"}}>  
      <div className="container py-5">
        <div className="row" style={{maxWidth:'100%', minWidth: '15%'}}>
          <div className="col-lg-7 mx-auto bg-white rounded shadow" style={{maxWidth:'100%'}}>
            {/* Fixed header table*/}
            
            
            <div className="table-responsive" style={{maxWidth:'100%'}}>
              <table className="table" style={{maxWidth:'100%'}}>
                <thead>
     
                  <tr style={{border:'5px', borderSpacing: '0 15px', width: '150px', textAlign:'center'}}>
                    <th scope="col" className="col-3"  />
                    <th scope="col" className="col-3">Appointment Date</th>
                    <th scope="col" className="col-3">Appointment Time</th>
                    <th scope="col" className="col-3">Patient Name</th>
                    <th scope="col" className="col-3" />
                  </tr>
            
                </thead>

     
                <tbody>
         
                {list.map((val,key)=>{
    return(
      <tr style={{border:'5px', borderSpacing: '0 15px', width: '150px', textAlign:'center'}}>
        
        <th scope="row" className="col-3">{++number}</th>
        

<td >
              {new Date(new Date(val.appointment_date).setDate(new Date(val.appointment_date).getDate() + 1)).toJSON().split('T')[0]}
            </td>


            <td>
              {(val.appointment_time).split(':').slice(0,-1).join(':')}
            </td>
            
          <td>{val.patient_name}</td>
          

          <td className="col-3">
                      <a className="btn btn-primary j" role="button"  onClick={VideoCall}   style={{width: '110px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                      <i className="fas fa-video" style={{marginRight: "8px"}} />
                      Call
                      </a>
                    </td>
 

          
        <td className="col-3">
                      <a className="btn btn-primary j" role="button"  onClick={()=>{togglePopup(val.appointment_id, val.appointment_date, val.appointment_time)}}   style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                      <i className="fas fa-calendar" style={{marginRight: "8px"}} />
                         Postpone
                      </a>
                    </td>
        
                    <td className="col-3">
                      <a className="btn btn-primary j" role="button"  onClick={()=>{cancel(val.appointment_id)}}   style={{width: '110px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                      <FontAwesomeIcon icon={faMinusCircle} style={{marginRight: "8px"}}/>
                       Cancel
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





<Modal 

isOpen={isOpen}
toggle={()=>{setIsOpen(!isOpen)}}
style={{width:'700px', height:'70px'}}
>

  <ModalHeader
toggle={()=>{setIsOpen(!isOpen)}}
style={{color:'black'}}
  >
    Postpone Appointment
  </ModalHeader>

  <ModalBody>
  {/* <div style={{position:'absolute', right:'50%', marginTop:'10px'}}>
        <b>Enter Data</b>
        </div> */}
        <div style={{ marginTop:'20px'}}>
        <MuiPickersUtilsProvider utils={DateMomentUtils} style = {{justifyContent:'center'}} >

    <div  >
    <DatePicker
          autoOk
            label="Date"
            value={appointment_date}
            onChange={setAppointmentDate}
            format='YYYY/MM/DD'
            maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
            minDate={new Date()}
            style={{left:'15%'}}/>

      </div>      
 
    <TimePicker 
    autoOk 
    ampm={false}
    value={appointment_time}
    label="Time" 
    onChange={setAppointmentTime} 
    style={{left:'15%', marginTop:'25px'}}/>
    

        </MuiPickersUtilsProvider>
        
        </div>


<div style={{ marginTop:'45px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={()=>{UpdateAppointment(appointment_date, appointment_time)}}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
<i className="fas fa-calendar" style={{marginRight: "8px"}} />
Postpone
</a>
</div>
  </ModalBody>
</Modal>







{/* 
{isOpen && <Popup



content={<>
    <div style={{position:'absolute', right:'50%', marginTop:'10px'}}>
      <b>Enter Data</b>
      </div>
      <div style={{ marginTop:'60px'}}>
      <MuiPickersUtilsProvider utils={DateMomentUtils} style = {{justifyContent:'center'}} >

  <div  >
  <DatePicker
        autoOk
          label="Date"
          value={appointment_date}
          onChange={setAppointmentDate}
          format='YYYY/MM/DD'
          minDate={new Date()}
          style={{left:'15%'}}/>

    </div>      

  <TimePicker 
  autoOk 
  ampm={false}
  label="Time" 
  value={appointment_time} 
  onChange={setAppointmentTime} 
  style={{left:'15%', marginTop:'25px'}}/>
  

      </MuiPickersUtilsProvider>
      
      </div>
      <button type="button" style={{ backgroundColor: '#0072c6', width:'15%', height:'150%', color:'white',
        borderRadius:'20px', marginTop:'50px'}} onClick={()=>{UpdateAppointment(appointment_date, appointment_time)}} >Save</button>
    </>}
    handleClose={togglePopup}
  />} */}




      </div>
    )}
    
    </div>
)




}
export default Meetings;