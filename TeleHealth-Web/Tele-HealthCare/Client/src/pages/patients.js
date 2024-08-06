import React, { useState } from 'react';
import Axios from 'axios';
import DoctorSideBar from '../components/DoctorSideBar';
import DoctorNavbar from '../components/DoctorNavbar'
import { useNavigate } from 'react-router-dom'



function Patients() {

  var number = 0

  const [list, setList] = useState([])
  const [patient_name, setuserName] = useState('')
  const [patient_gender, setpassword] = useState('')
  const [patient_age, setstatus] = useState()




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
    Axios.post('http://localhost:3001/patients').then(res => {
      setList(res.data)
    })
  }

  getData()





  let navigate = useNavigate();


  const patientID = (patient_id) => {
    Axios.post('http://localhost:3001/specific_patient_id', {
      specific_patient_id: patient_id
    }).then(() => {
      navigate('/patient_report')
    })
  }


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
                    <h3 className="text-white mb-4 header" style={{ marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px" }}>Patients</h3>
                  </div>

                </div>
                <div className="row table-row-container" style={{ maxWidth: "147%", width: "147%" }}>
                  <div className="container py-5">
                    <div className="row" style={{ maxWidth: '100%', minWidth: '15%' }}>
                      <div className="col-lg-7 mx-auto bg-white rounded shadow" style={{ maxWidth: '100%' }}>
                        {/* Fixed header table*/}


                        <div className="table-responsive">
                          <table className="table">
                            <thead>

                              <tr style={{ textAlign: 'center' }}>
                                <th scope="col" className="col-3" />
                                <th scope="col" className="col-3">Patient Name</th>
                                <th scope="col" className="col-3">Patient Gender</th>
                                <th scope="col" className="col-3">Patient Age</th>
                                <th scope="col" className="col-3" />
                                <th scope="col" className="col-3" />

                              </tr>

                            </thead>


                            <tbody>

                              {list.map((val, key) => {
                                return (
                                  <tr style={{ textAlign: 'center' }}>

                                    <th scope="row" className="col-3">{++number}</th>



                                    <td className="col-3">{val.patient_name}</td>

                                    <td className="col-3">{val.patient_gender}</td>

                                    <td className="col-3">{val.patient_age}</td>




                                    <td className="col-3">
                                      <a className="btn btn-primary j" role="button" onClick={() => { patientID(val.patient_id) }} style={{ width: '110px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px" }}>
                                        <i className="fas fa-clipboard-list" style={{ marginRight: "8px" }} />
                                        Report
                                      </a>
                                    </td>


                                    {/* <td className="col-3">
                          <a className="btn btn-primary j" role="button" href='/messages' style={{ width: '110px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                          <i className="fas fa-envelope" style={{marginRight: "8px"}} />
                          Chat
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
export default Patients;