
import React, { useEffect, useRef, useState } from 'react';
import Axios from'axios';
import Popup from '../popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import DoctorNavbar from '../components/DoctorNavbar';
import AdminSideBar from '../components/AdminSideBar';
import { Modal, ModalHeader, ModalBody } from 'reactstrap'




function Patients() {


var number = 0


    const[isOpenForInsert, setIsOpenForInsert] = useState(false)
    const[isOpenForUpdate, setIsOpenForUpdate] = useState(false)


    const [patient_list, setPatientList] = useState([])
    const [patient_name, setPatient_Name] = useState('')
    const [patient_gender, setPatient_Gender] = useState('')
    const [patient_age, setPatient_Age] = useState('')
    const [patient_address, setPatient_Address] = useState('')
    const [patient_id, setPatient_id] = useState('')



    const [patient_nameError, setPatient_NameError] = useState('')
    const [patient_genderError, setPatient_GenderError] = useState('')
    const [patient_ageError, setPatient_AgeError] = useState('')
    const [patient_addressError, setPatient_AddressError] = useState('')
    




    const [render, setRender] = useState(true)

    const getAdminID = ()=>{
      
        Axios.get('http://localhost:3001/Admin_ID').then((res)=> {
                  
        // setList(res.data)
        
      
        var string = JSON.stringify(res.data)
            
        var json = JSON.parse(string)
      
      // alert(string)
        // alert(json.doctor_id);


        if(json.admin_id === 0){
          setRender(false)
          window.location='/'
          alert("You Need To Sign In First!!!")
        }
        
        // else{
        //   setRender(true)
        // }
            })
      
      }
      
      // getAdminID()






    const getData = ()=>{
        Axios.post('http://localhost:3001/patients_list').then((res)=>{
            setPatientList(res.data)
        })
    }


    // getData();





    const isMounted = useRef(true)


    useEffect(()=>{
      getAdminID()
        getData()
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((resJson)=>{resJson.json()})
        .then((res)=>{setInterval(()=>{
            if(isMounted.current){
        getAdminID()
                getData()
            }
        }, 1000)})
        
        return(()=>{
            isMounted.current = false;
        })
        }, []);
  





    const delete_patient = (patient_id)=>{
        Axios.delete(`http://localhost:3001/delete_patient/${patient_id}`)
        console.log('here')
        getData();
    }

    


    const insertPatient= ()=>{

      if(patient_name==''){
        document.getElementById('name').parentElement.className = 'form-class error'
        setPatient_NameError("Please enter the name")
      }

      if(patient_age==''){
        document.getElementById('age').parentElement.className = 'form-class error'
        setPatient_AgeError("Please enter the age")
      }

      if(patient_address==''){
        document.getElementById('address').parentElement.className = 'form-class error'
        setPatient_AddressError("Please enter the address")
      }

      if(patient_gender==''){
        document.getElementById('gender').parentElement.className = 'form-class error'
        setPatient_GenderError("Please select gender")

      }






      if(patient_name!=''){
        document.getElementById('name').parentElement.className = 'form-class'
        setPatient_NameError("")
      }

      if(patient_age!=''){
        document.getElementById('age').parentElement.className = 'form-class'
        setPatient_AgeError("")
      }

      if(patient_address!=''){
        document.getElementById('address').parentElement.className = 'form-class'
        setPatient_AddressError("")
      }

      if(patient_gender!=''){
        document.getElementById('gender').parentElement.className = 'form-class'
        setPatient_GenderError("")

      }



      if(patient_name!='' && patient_age!='' && patient_address!=''&& patient_gender!=''){

        Axios.post('http://localhost:3001/insert_patient', {
            patient_name: patient_name,
            patient_gender: patient_gender,
            patient_age: patient_age,
            patient_address: patient_address
        }).then(()=>{
            alert("Inserted")
          })
          console.log('here')

          InsertTogglePopup()

          
        setPatient_Name('')
        setPatient_Gender('')
        setPatient_Age('')
        setPatient_Address('')


          getData();

      }
        
        
    }




    const UpdatePatient = ()=>{
    
      if(patient_name==''){
        document.getElementById('name').parentElement.className = 'form-class error'
        setPatient_NameError("Please enter the name")
      }

      if(patient_age==''){
        document.getElementById('age').parentElement.className = 'form-class error'
        setPatient_AgeError("Please enter the age")
      }

      if(patient_address==''){
        document.getElementById('address').parentElement.className = 'form-class error'
        setPatient_AddressError("Please enter the address")
      }

      if(patient_gender==''){
        document.getElementById('gender').parentElement.className = 'form-class error'
        setPatient_GenderError("Please select gender")

      }






      if(patient_name!=''){
        document.getElementById('name').parentElement.className = 'form-class'
        setPatient_NameError("")
      }

      if(patient_age!=''){
        document.getElementById('age').parentElement.className = 'form-class'
        setPatient_AgeError("")
      }

      if(patient_address!=''){
        document.getElementById('address').parentElement.className = 'form-class'
        setPatient_AddressError("")
      }

      if(patient_gender!=''){
        document.getElementById('gender').parentElement.className = 'form-class'
        setPatient_GenderError("")

      }



      if(patient_name!='' && patient_age!='' && patient_address!=''&& patient_gender!=''){
    
      Axios.put('http://localhost:3001/update_patients_list', {
            patient_name: patient_name,
            patient_gender: patient_gender,
            patient_age: patient_age,
            patient_address: patient_address,
            patient_id: patient_id
        })

        UpdateTogglePopup()

        setPatient_Name('')
    setPatient_Gender('')
    setPatient_Age('')
    setPatient_Address('')
    
        
        getData();
      }

    }



    const InsertTogglePopup = () => {
      
      setPatient_NameError("")
      setPatient_AgeError("")
      setPatient_GenderError("")
      setPatient_AddressError("")
      
      setIsOpenForInsert(!isOpenForInsert)
      console.log(isOpenForInsert)
    }



    const UpdateTogglePopup = (patient_id, patient_name, patient_gender, patient_age, patient_address) => {

      setPatient_NameError("")
      setPatient_AgeError("")
      setPatient_GenderError("")
      setPatient_AddressError("")
       
      setPatient_id(patient_id)
    setPatient_Name(patient_name)
    setPatient_Gender(patient_gender)
    setPatient_Age(patient_age)
    setPatient_Address(patient_address)
      
      
      setIsOpenForUpdate(!isOpenForUpdate)
      console.log(isOpenForUpdate)
    }




    return(

      <div>
        {render && (


<div id="wrapper" style={{background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)'}}>

<AdminSideBar/>

<div className="d-flex flex-column" id="content-wrapper" style={{background: '#bac6dd'}}>
  <div id="content" style={{color: '#2D2F3E'}}>
    
    <DoctorNavbar/>


    <div className="container-fluid" style={{marginBottom: "50px"}}>
      <div className="row heading" style={{height: "59px"}}>
        <div className="col-12 col-sm-6 col-md-6 col-1-heading" style={{height: "59px"}}>
          <h3 className="text-white mb-4 header" style={{marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>List of Patients</h3>
        </div>
        <div className="col-12 col-sm-6 col-md-6 text-end col-1-heading" style={{marginBottom: "30px", height: "59px"}}>
          <a className="btn btn-primary btn-sm text-center d-sm-inline-block f" role="button" onClick={InsertTogglePopup} style={{marginTop: "10px", marginRight: "12px", width: '120px', height: "46px", paddingTop: "6px", fontWeight: 'bold', fontSize: "17px"}}>
          <i style={{marginRight: "7px", fontSize: '21.9px', paddingTop: "0px", marginTop: "4px"}}>
            <FontAwesomeIcon icon={faPlus} style={{fontSize:'19px'}}/> 
            </i>&nbsp;
            <span className="button-span" style={{fontSize: '18.2px'}}>Add</span>
            </a>
            </div>
      </div>
      <div className="row table-row-container" style={{ maxWidth: "147%", width: "147%"}}>  
        <div className="container py-5">
          <div className="row" style={{maxWidth:'100%', minWidth: '15%'}}>
            <div className="col-lg-7 mx-auto bg-white rounded shadow" style={{maxWidth:'100%'}}>
              {/* Fixed header table*/}
              
              
              <div className="table-responsive">
                <table className="table">
                  <thead>
       
                    <tr style={{border:'5px', borderSpacing: '0 15px', width: '150px', textAlign:'center'}}>
                      <th scope="col" className="col-3"  />
                      <th scope="col" className="col-3">Patient Name</th>
                      <th scope="col" className="col-3">Patient Gender</th>
                      <th scope="col" className="col-3">Patient Age</th>
                      <th scope="col" className="col-3">Patient Address</th>

                      <th scope="col" className="col-3"></th>
                      <th scope="col" className="col-3" />
                    </tr>
              
                  </thead>

       
                  <tbody>
           
                  {patient_list.map((val,key)=>{
      return(
        <tr style={{border:'5px', borderSpacing: '0 15px', width: '150px', textAlign:'center'}}>
          
          <th scope="row" className="col-3">{++number}</th>
          
          
          <td className="col-3">
          {val.patient_name}
            </td>


            <td className="col-3">
            {val.patient_gender}
            </td>

            <td className="col-3">
            {val.patient_age}
            </td>

            <td className="col-3">
            {val.patient_address}
            </td>

          

            <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{UpdateTogglePopup(val.patient_id, val.patient_name, val.patient_gender, val.patient_age, val.patient_address)}} style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                           Update
                        </a>
                      </td>          


          <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{delete_patient(val.patient_id)}}  style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                           Delete
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

isOpen={isOpenForInsert}
toggle={()=>{setIsOpenForInsert(!isOpenForInsert)}}
style={{width:'700px', height:'70px'}}
>

  <ModalHeader
toggle={()=>{setIsOpenForInsert(!isOpenForInsert)}}
style={{color:'black'}}
  >
    Add Patient
  </ModalHeader>

  <ModalBody>


  <div style={{marginTop:'20px'}}>
    <div>
    <label  htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', right:'65%', left:'2.5%', width:'40%'}}>
    <input type="text" id="name" name="name" className='form-control' style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setPatient_Name(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{patient_nameError}</p>
    </div>
    
    <div>

    <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'36px'}}>Age:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%'}}> 
     <input type="text" className='form-control' id="age" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setPatient_Age(e.target.value)}}/><br /> 
     </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{patient_ageError}</p>
    </div>
    
    </div>

    <div style={{marginTop:'100px'}}>
<div>  
    <label  htmlFor="lname" >Gender:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%' }}>
    <select className='form-control' id='gender' onChange={(e)=>{setPatient_Gender(e.target.value)}} style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }}>
    <option value="">select an option</option>
    <option value="M" >M</option>
    <option value="F">F</option>
  </select>
  </div>
  <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{patient_genderError}</p>
  </div>

  <div>
  <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'160px'}}>Address:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%' }}>
    <input type="text" className='form-control' id="address" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setPatient_Address(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{patient_addressError}</p>
    </div>
    </div>
  

  

<div style={{ marginTop:'85px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={insertPatient}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
<i  style={{marginRight: "8px"}} >
<FontAwesomeIcon icon={faPlus} style={{fontSize:'15px'}}/> 
</i>
Add
</a>
</div>
  </ModalBody>
</Modal>









<Modal 

isOpen={isOpenForUpdate}
toggle={()=>{setIsOpenForUpdate(!isOpenForUpdate)}}
style={{width:'700px', height:'70px'}}
>

  <ModalHeader
toggle={()=>{setIsOpenForUpdate(!isOpenForUpdate)}}
style={{color:'black'}}
  >
    Update Patient
  </ModalHeader>

  <ModalBody>


  <div style={{marginTop:'20px'}}>
      <div>
      <label  htmlFor="fname">Name:</label>
      <div className="form-class"  style={{position:'absolute', right:'65%', left:'2.5%', width:'40%'}}>
      <input type="text" id="name" name="name" className='form-control' style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} defaultValue={patient_name} onChange={(e)=>{setPatient_Name(e.target.value)}}/>
      </div>
      <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{patient_nameError}</p>
      </div>
      
      <div>
  
      <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'36px'}}>Age:</label>
      <div className='form-class' style={{position:'absolute', right:'10%', width:'40%'}}> 
       <input type="text" className='form-control' id="age" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} defaultValue={patient_age} onChange={(e)=>{setPatient_Age(e.target.value)}}/><br /> 
       </div>
      <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{patient_ageError}</p>
      </div>
      
      </div>
  
      <div style={{marginTop:'100px'}}>
  <div>  
      <label  htmlFor="lname" >Gender:</label>
      <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%' }}>
      <select className='form-control' id='gender' defaultValue={patient_gender} onChange={(e)=>{setPatient_Gender(e.target.value)}} style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }}>
      <option value="">select an option</option>
      <option value="M" >M</option>
      <option value="F">F</option>
    </select>
    </div>
    <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{patient_genderError}</p>
    </div>
  
    <div>
    <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'160px'}}>Address:</label>
      <div className='form-class' style={{position:'absolute', right:'10%', width:'40%' }}>
      <input type="text" className='form-control' id="address" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} defaultValue={patient_address} onChange={(e)=>{setPatient_Address(e.target.value)}}/>
      </div>
      <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{patient_addressError}</p>
      </div>
      </div>  

  

<div style={{ marginTop:'85px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={UpdatePatient}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>

Update
</a>
</div>
  </ModalBody>
</Modal>








        </div>


        )}
      </div>

        
    


    )
}



export default Patients;