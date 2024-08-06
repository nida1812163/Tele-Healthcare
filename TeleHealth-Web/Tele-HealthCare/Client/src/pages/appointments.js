import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import DateMomentUtils from '@date-io/moment';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DoctorSideBar from '../components/DoctorSideBar';
import DoctorNavbar from '../components/DoctorNavbar'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
export var data = "";



function Appointments() {

  let navigate = useNavigate();



  const [isOpen, setIsOpen] = useState(false)

  const [isOpenForInsert, setIsOpenForInsert] = useState(false)

  const [list, setList] = useState([])
  const [patientlist, setPatientList] = useState([])


  const [patient_id, setPatientID] = useState('')

  const [appointment_date, setAppointmentDate] = useState()
  const [appointment_time, setAppointmentTime] = useState(new Date().toTimeString().split(':').slice(0, -1).join(':'))
  const [appointment_id, setAppointmentid] = useState()


  const [patient_nameError, setpatient_nameError] = useState('')
  //const[data,setData]=useState('')


  var number = 0



  const [render, setRender] = useState(true)

  const getDoctorID = () => {

    

    Axios.get('http://localhost:3001/Doctor_ID').then(res => {

      // setList(res.data)


      var string = JSON.stringify(res.data)

      var json = JSON.parse(string)

      // alert(string)
      // alert(json.doctor_id);


      if (json.doctor_id === 0) {
        setRender(false)
        window.location = '/'
        alert("You Need To Sign In First!!!")
      }

      // else{
      //   setRender(true)
      // }
    })

  }

  getDoctorID()







  const getData = () => {
    Axios.post('http://localhost:3001/appointments').then(res => {
      setList(res.data)
    })

    Axios.post('http://localhost:3001/patients').then(res => {
      setPatientList(res.data)
    })

  }

  // getData()




  
  const isMounted = useRef(true)


  useEffect(()=>{
      getData()
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((resJson)=>{resJson.json()})
      .then((res)=>{setInterval(()=>{
          if(isMounted.current){
              getData()
          }
      }, 1000)})
      
      return(()=>{
          isMounted.current = false;
      })
      }, []);







//   const Chat = (appointment_id)=>{
  
//     Axios.post('http://localhost:3001/appointment_id', {
//       appointment_time: appointment_time
//     }).then(res => {
//     })
//     // <App data={appointment_time}/>
//     navigate('/messages')   
// }






  const togglePopup = (appointment_id, appointment_date, appointment_time) => {


    setAppointmentid(appointment_id)
    setAppointmentDate(appointment_date)
    setAppointmentTime(new Date(appointment_date).toDateString() + " " + appointment_time + " " + new Date().toTimeString().split(' ')[1])

    setIsOpen(!isOpen)
    console.log(isOpen)

  }





  const UpdateAppointment = (appointment_date, appointment_time) => {

    // alert(new Date(new Date(new Date(appointment_date).setDate(new Date(appointment_date).getDate() + 1)).toISOString()).toJSON().split('T')[0])
    // alert(new Date(appointment_time).toTimeString().split(' ')[0])

    Axios.put('http://localhost:3001/update_apointment', {
      appointment_date: new Date(new Date(new Date(appointment_date).setDate(new Date(appointment_date).getDate() + 1)).toISOString()).toJSON().split('T')[0],
      appointment_time: new Date(appointment_time).toTimeString().split(' ')[0],
      appointment_id: appointment_id
    })

    togglePopup()

    getData()

  }




  const InsertTogglePopup = () => {
    setpatient_nameError("")
    setAppointmentDate(new Date())
    setAppointmentTime(new Date())

    setIsOpenForInsert(!isOpenForInsert)
    console.log(isOpenForInsert)
  }





  const insertAppointment = () => {
    // alert(patient_id + "\n" + new Date(new Date(new Date(appointment_date).setDate(new Date(appointment_date).getDate())).toISOString()).toJSON().split('T')[0] + "\n" + appointment_time)


    if (patient_id == '') {

      document.getElementById('name').parentElement.className = 'form-class error'

      setpatient_nameError("Please select a Patient's name")

    }

    if (patient_id != '') {

      document.getElementById('name').parentElement.className = 'form-class'

      setpatient_nameError("")




      Axios.post('http://localhost:3001/insert_appointment', {
        appointment_date: new Date(new Date(new Date(appointment_date).setDate(new Date(appointment_date).getDate() + 1)).toISOString()).toJSON().split('T')[0],
        appointment_time: new Date(appointment_time).toTimeString().split(' ')[0],
        patient_id: patient_id,


      }).then(() => {
        alert("Inserted")
      })

      console.log('here')

      InsertTogglePopup()


      setAppointmentDate()
      setAppointmentTime()
      setPatientID('')

      getData();

    }




  }
 






  const Time = (appointment_time)=>{
    var string = JSON.stringify(appointment_time)
    var jsontime = JSON.parse(string)
    data=jsontime
    console.log(jsontime)
    console.log(data)
    navigate('/messages')   
  }


  console.log(data)







  return (
    <div >
      {render && (
        <div id="wrapper" style={{ background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)' }}>

          <DoctorSideBar />
          <div className="d-flex flex-column" id="content-wrapper" style={{ background: '#bac6dd' }}>
            <div id="content" style={{ color: '#2D2F3E' }}>

              <DoctorNavbar />


              <div className="container-fluid" style={{ marginBottom: "50px" }}>
                <div className="row heading" style={{ height: "59px" }}>
                  <div className="col-12 col-sm-6 col-md-6 col-1-heading" style={{ height: "59px" }}>
                    <h3 className="text-white mb-4 header" style={{ marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px" }}>Appointments</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 text-end col-1-heading" style={{ marginBottom: "30px", height: "59px" }}><a className="btn btn-primary btn-sm text-center d-sm-inline-block create" role="button" onClick={InsertTogglePopup} style={{ marginTop: "10px", marginRight: "12px", width: '275.7px', height: "46px", paddingTop: "6px", fontWeight: 'bold', fontSize: "17px" }}>
                    <i className="far fa-calendar-plus fa-sm text-white-50" style={{ marginRight: "7px", fontSize: '21.9px', paddingTop: "0px", marginTop: "4px" }} />&nbsp;<span className="button-span" style={{ fontSize: '18.2px' }}>Schedule An Appointment</span></a></div>
                </div>
                <div className="row table-row-container" style={{ maxWidth: "147%", width: "147%" }}>
                  <div className="container py-5">
                    <div className="row" style={{ maxWidth: '100%', minWidth: '15%' }}>
                      <div className="col-lg-7 mx-auto bg-white rounded shadow" style={{ maxWidth: '100%' }}>
                        {/* Fixed header table*/}


                        <div className="table-responsive" style={{ maxWidth: '100%' }}>
                          <table className="table" style={{ maxWidth: '100%' }}>
                            <thead>

                              <tr style={{ border: '5px', borderSpacing: '0 15px', width: '150px', textAlign: 'center' }}>
                                <th scope="col" className="col-3" />
                                <th scope="col" className="col-3">Appointment Date</th>
                                <th scope="col" className="col-3">Appointment Time</th>
                                <th scope="col" className="col-3">Patient Name</th>
                                <th scope="col" className="col-3" />
                              </tr>

                            </thead>


                            <tbody>

                              {list.map((val, key) => {
                                return (
                                  <tr style={{ border: '5px', borderSpacing: '0 15px', width: '150px', textAlign: 'center' }}>

                                    <th scope="row" className="col-3">{++number}</th>


                                    <td className="col-3">
                                      {new Date(new Date(val.appointment_date).setDate(new Date(val.appointment_date).getDate() + 1)).toJSON().split('T')[0]}
                                    </td>


                                    <td className="col-3">
                                      {(val.appointment_time).split(':').slice(0, -1).join(':')}
                                    </td>


                                    <td className="col-3">
                                      {val.patient_name}
                                    </td>





                                    <td className="col-3">

                                    {(new Date(new Date(val.appointment_date).setDate(new Date(val.appointment_date).getDate() + 1)) > new Date()) &&(
                                        <a className="btn btn-primary j" role="button" onClick={() => { togglePopup(val.appointment_id, val.appointment_date, val.appointment_time) }} style={{ width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px" }}>
                                        <i className="fas fa-calendar" style={{ marginRight: "8px" }} />
                                        Postpone
                                      </a>
                                    )
                                    }

                                    </td>
                                    
                                    


                                    <td className="col-3">

                                    {(new Date(new Date(val.appointment_date).setDate(new Date(val.appointment_date).getDate() + 1)) > new Date()) &&(
                                        <a className="btn btn-primary j" role="button" onClick={() => { Time(((val.appointment_time).split(':').slice(0, -1).join(':')))}} style={{ width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px" }}>
                                        <i className="fas fa-calendar" style={{ marginRight: "8px" }} />
                                        Chat
                                      </a>
                                    )
                                    }
                                      
                                      
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




          {/* Schedule Appointment */}


          <Modal 
size='lg'
isOpen={isOpenForInsert}
toggle={()=>{setIsOpenForInsert(!isOpenForInsert)}}
style={{marginTop:'5%'}}
>

  <ModalHeader
toggle={()=>{setIsOpenForInsert(!isOpenForInsert)}}
style={{color:'black'}}
  >
    Schedule Appointment
  </ModalHeader>

  <ModalBody>
{/* 
  <div style={{position:'absolute', right:'50%', marginTop:'10px'}}>
<b>Enter Data</b>
</div> */}
<form>
  <div style={{marginTop:'20px'}}>
  <div >
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
    label="Time" 
    value={appointment_time} 
    onChange={setAppointmentTime} 
    style={{left:'15%', marginTop:'25px'}}/>
    

        </MuiPickersUtilsProvider>
        
        </div>
        


        <div style={{marginTop:'30px'}}>  
    <label  htmlFor="lname" style={{ position:'absolute', left:'15%'}} >Patient Name:</label>
    <div className='form-class' style={{position:'absolute', left:'15%', width:'40%', marginTop:'5%' }}>
    <select className='form-control'  id='name' onChange={(e)=>{setPatientID(e.target.value)}} style={{position:'absolute', width:'100%', height:'100%', left:'0%' }}>
    <option  value="" >select an option</option>
        {patientlist.map((val,key)=>(
            <option value={val.patient_id}>{val.patient_name}</option>
        ))}

  </select>
  </div>
  <p className='error' style={{position:'absolute', marginTop:'13%', left:'15%'}}>{patient_nameError}</p>
  </div>



</div>


</form>
        

<div style={{ marginTop:'105px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={insertAppointment}  style={{ width: '220px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
<i className="far fa-calendar-plus fa-sm text-white-50" style={{marginRight: "8px"}} />
Schedule Appointment
</a>
</div>
  </ModalBody>
</Modal>








          {/* {isOpen && <Popup
            content={<>
              <div style={{ position: 'absolute', right: '50%', marginTop: '10px' }}>
                <b>Enter Data</b>
              </div>
              <div style={{ marginTop: '60px' }}>
                <MuiPickersUtilsProvider utils={DateMomentUtils} style={{ justifyContent: 'center' }} >

                  <div  >
                    <DatePicker
                      autoOk
                      label="Date"
                      value={appointment_date}
                      onChange={setAppointmentDate}
                      format='YYYY/MM/DD'
                      maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                      minDate={new Date()}
                      style={{ left: '15%' }} />

                  </div>

                  <TimePicker
                    autoOk
                    ampm={false}
                    value={appointment_time}
                    label="Time"
                    onChange={setAppointmentTime}
                    style={{ left: '15%', marginTop: '25px' }} />


                </MuiPickersUtilsProvider>

              </div>
              <button type="button" style={{
                backgroundColor: '#0072c6', width: '15%', height: '150%', color: 'white',
                borderRadius: '20px', marginTop: '50px'
              }} onClick={() => { UpdateAppointment(appointment_date, appointment_time) }} >Save</button>
            </>}
            handleClose={togglePopup}
          />} */}




          {/* {isOpenForInsert && <Popup
            content={<>
              <div style={{ position: 'absolute', right: '50%', marginTop: '10px' }}>
                <b>Enter Data</b>
              </div>
              <form>
                <div style={{ marginTop: '70px' }}>
                  <div style={{ marginTop: '60px' }}>
                    <MuiPickersUtilsProvider utils={DateMomentUtils} style={{ justifyContent: 'center' }} >

                      <div  >
                        <DatePicker
                          autoOk
                          label="Date"
                          value={appointment_date}
                          onChange={setAppointmentDate}
                          format='YYYY/MM/DD'
                          maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                          minDate={new Date()}
                          style={{ left: '15%' }} />

                      </div>

                      <TimePicker
                        autoOk
                        ampm={false}
                        label="Time"
                        value={appointment_time}
                        onChange={setAppointmentTime}
                        style={{ left: '15%', marginTop: '25px' }} />


                    </MuiPickersUtilsProvider>

                  </div>



                  <div style={{ marginTop: '30px' }}>
                    <label htmlFor="lname" style={{ position: 'absolute', left: '15%' }} >Patient Name:</label>
                    <div className='form-class' style={{ position: 'absolute', left: '15%', width: '40%', marginTop: '5%' }}>
                      <select className='form-control' id='name' onChange={(e) => { setPatientID(e.target.value) }} style={{ position: 'absolute', width: '100%', height: '100%', left: '0%' }}>
                        <option value="" >select an option</option>
                        {patientlist.map((val, key) => (
                          <option value={val.patient_id}>{val.patient_name}</option>
                        ))}

                      </select>
                    </div>
                    <p className='error' style={{ position: 'absolute', marginTop: '13%', left: '15%' }}>{patient_nameError}</p>
                  </div>



                </div>

                <button type="button" style={{
                  backgroundColor: '#0072c6', width: '15%', height: '150%', color: 'white',
                  borderRadius: '20px', marginTop: '120px'
                }} onClick={insertAppointment}>Save</button>
              </form>
            </>}
            handleClose={InsertTogglePopup}
          />} */}




        </div>
      )}

    </div>
  )

}


export default Appointments;