

import React, { useEffect, useRef, useState } from 'react';
import Axios from'axios';
import Popup from '../popup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import AdminSideBar from '../components/AdminSideBar';
import DoctorNavbar from '../components/DoctorNavbar';
import { Modal, ModalHeader, ModalBody } from 'reactstrap'





function Doctors() {

var number = 0

    const[isOpenForInsert, setIsOpenForInsert] = useState(false)

    const[isOpenForUpdate, setIsOpenForUpdate] = useState(false)
    
    const [doctor_list, setDoctorList] = useState([])


    const [doctor_id, setdoctorid] = useState('')

    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [highest_qualification, setHighest_Qualification] = useState('')

    // const [email, setEmail]= useState('')


const [nameError, setNameError] = useState('')
    const [designationError, setDesignationError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [addressError, setAddressError] = useState('')
    const [highest_qualificationError, setHighest_QualificationError] = useState('')



    const [render, setRender] = useState(true)

    const getAdminID = ()=>{
      
        Axios.get('http://localhost:3001/Admin_ID').then(res => {
                  
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
        Axios.post('http://localhost:3001/doctors_list').then((res)=>{
            setDoctorList(res.data)
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




      

    const delete_doctor = (doctor_id)=>{
        Axios.delete(`http://localhost:3001/delete_doctor/${doctor_id}`)
        console.log('here')
        getData();
    }

  


    const insertDoctor= ()=>{

      // if(email!='laibaabid25@gmail.com'){
      //   document.getElementById('email').parentElement.className = 'form-class error'
      // }




      if(name == ''){
        document.getElementById('name').parentElement.className = 'form-class error'
   
      setNameError("Please enter the name")

      }

      if(designation == ''){
        document.getElementById('designation').parentElement.className = 'form-class error'
   
      setDesignationError("Please enter the designation")

      }

      if(gender=='' ){
        document.getElementById('gender').parentElement.className = 'form-class error'
   
      setGenderError("Please select gender")

      }

      if(address==''){
        document.getElementById('address').parentElement.className = 'form-class error'
   
        setAddressError("Please enter the address")
      }

      if(highest_qualification==''){
        document.getElementById('highest_qualification').parentElement.className = 'form-class error'
   
        setHighest_QualificationError("Please enter the highest qualification")
      }





      if(name!=''){
        document.getElementById('name').parentElement.className = 'form-class'
   
      setNameError("")

      }

      if(designation != ''){
        document.getElementById('designation').parentElement.className = 'form-class'
   
      setDesignationError("")

      }

      if(gender!='' ){
        document.getElementById('gender').parentElement.className = 'form-class'
   
      setGenderError("")

      }

      if(address!=''){
        document.getElementById('address').parentElement.className = 'form-class'
   
        setAddressError("")
      }

      if(highest_qualification!=''){
        document.getElementById('highest_qualification').parentElement.className = 'form-class'
   
        setHighest_QualificationError("")
      }

      


      if(name != '' && designation != '' && gender!='' && address!='' && highest_qualification!=''){
        
        Axios.post('http://localhost:3001/insert_doctor', {
            name: name,
            designation: designation,
            gender: gender,
            address: address,
            highest_qualification: highest_qualification,
        }).then(()=>{
            alert("Inserted")
          })
          console.log('here')

          InsertTogglePopup()
          
          setName('')
          setGender('')
          setAddress('')
          setDesignation('')
          setHighest_Qualification('')

          getData();

      }
        

        
    }

// insertDoctor()

    
    const UpdateDoctor = ()=>{
      
      if(name==''){
        document.getElementById('name').parentElement.className = 'form-class error'
   
      setNameError("Please enter the name")

      }

      if(designation == ''){
        document.getElementById('designation').parentElement.className = 'form-class error'
   
      setDesignationError("Please enter the designation")

      }

      if(gender=='' ){
        document.getElementById('gender').parentElement.className = 'form-class error'
   
      setGenderError("Please select gender")

      }

      if(address==''){
        document.getElementById('address').parentElement.className = 'form-class error'
   
        setAddressError("Please enter the address")
      }

      if(highest_qualification==''){
        document.getElementById('highest_qualification').parentElement.className = 'form-class error'
   
        setHighest_QualificationError("Please enter the highest qualification")
      }





      if(name!=''){
        document.getElementById('name').parentElement.className = 'form-class'
   
      setNameError("")

      }

      if(designation != ''){
        document.getElementById('designation').parentElement.className = 'form-class'
   
      setDesignationError("")

      }

      if(gender!='' ){
        document.getElementById('gender').parentElement.className = 'form-class'
   
      setGenderError("")

      }

      if(address!=''){
        document.getElementById('address').parentElement.className = 'form-class'
   
        setAddressError("")
      }

      if(highest_qualification!=''){
        document.getElementById('highest_qualification').parentElement.className = 'form-class'
   
        setHighest_QualificationError("")
      }

      


      if(name != '' && designation != '' && gender!='' && address!='' && highest_qualification!=''){

        Axios.put('http://localhost:3001/update_doctors_list', {
            name: name,
            designation: designation,
            gender: gender,
            address: address,
            highest_qualification: highest_qualification,
            doctor_id: doctor_id
        })

        UpdateTogglePopup()


        setName('')
        setGender('')
        setAddress('')
        setDesignation('')
        setHighest_Qualification('')


        getData();


      }

      

        
    }



    const InsertTogglePopup = () => {

      setNameError('')
          setGenderError('')
          setAddressError('')
          setDesignationError('')
          setHighest_QualificationError('')

      setIsOpenForInsert(!isOpenForInsert)
      console.log(isOpenForInsert)
    }


    const UpdateTogglePopup = (doctor_id, name, designation, gender, address, highest_qualification) => {

      setNameError('')
          setGenderError('')
          setAddressError('')
          setDesignationError('')
          setHighest_QualificationError('')
          
      setdoctorid(doctor_id)
      setName(name)
      setDesignation(designation)
      setGender(gender)
      setAddress(address)
      setHighest_Qualification(highest_qualification)


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
          <h3 className="text-white mb-4 header" style={{marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>List of Doctors</h3>
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
                      <th scope="col" className="col-3">Doctor Name</th>
                      <th scope="col" className="col-3">Doctor Designation</th>
                      <th scope="col" className="col-3">Doctor Gender</th>
                      <th scope="col" className="col-3">Doctor Address</th>
                      <th scope="col" className="col-3">Doctor Highest Qualification</th>
                      <th scope="col" className="col-3"></th>
                      <th scope="col" className="col-3" />
                    </tr>
              
                  </thead>

       
                  <tbody>
           
                  {doctor_list.map((val,key)=>{
      return(
        <tr style={{border:'5px', borderSpacing: '0 15px', width: '150px', textAlign:'center'}}>
          
          <th scope="row" className="col-3">{++number}</th>
          
          
          <td className="col-3">
          {val.name}
            </td>


            <td className="col-3">
            {val.designation}
            </td>

            <td className="col-3">
            {val.gender}
            </td>
          

            <td className="col-3">
            {val.address}
            </td>


            <td className="col-3">
            {val.highest_qualification}
            </td>


            <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{UpdateTogglePopup(val.doctor_id, val.name, val.designation, val.gender, val.address, val.highest_qualification)}} style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                           Update
                        </a>
                      </td>          


          <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{delete_doctor(val.doctor_id)}}  style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
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
    Add Doctor
  </ModalHeader>

  <ModalBody>



  <div style={{marginTop:'20px'}}>
    <div>
    <label  htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', right:'65%', left:'2.5%', width:'40%'}}>
    <input type="text" id="name" name="name" className='form-control' style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setName(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{nameError}</p>
    </div>
    
    <div>

    <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'37px'}}>Designation:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%'}}> 
     <input type="text" className='form-control' id="designation" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setDesignation(e.target.value)}}/><br /> 
     </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{designationError}</p>
    </div>
    
    </div>

    <div style={{marginTop:'100px'}}>
<div>  
    <label  htmlFor="lname" >Gender:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%' }}>
    <select className='form-control' id='gender' onChange={(e)=>{setGender(e.target.value)}} style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }}>
    <option value="">select an option</option>
    <option value="M" >M</option>
    <option value="F">F</option>
  </select>
  </div>
  <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{genderError}</p>
  </div>

  <div>
  <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'160px'}}>Address:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%' }}>
    <input type="text" className='form-control' id="address" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setAddress(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{addressError}</p>
    </div>
    </div>

    <div style={{marginTop:'100px'}}>
    <div>
    <label htmlFor="fname" style={{position:'absolute', right:'60%', left:'3%'}}>Highest Qualification:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%', marginTop:'5%' }}>
    <input type="text" className='form-control' id="highest_qualification" name="name"  style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }} onChange={(e)=>{setHighest_Qualification(e.target.value)}}/><br />
    </div>
    <p className='error' style={{position:'absolute', right:'65%',  marginTop:'14%', left:'2.5%'}}>{highest_qualificationError}</p>
    

    </div>

    
    
  </div>


  

<div style={{ marginTop:'120px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={insertDoctor}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
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
    Update Doctor's Details
  </ModalHeader>

  <ModalBody>


  <div style={{marginTop:'20px'}}>
    <div>
    <label  htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', right:'65%', left:'2.5%', width:'40%'}}>
    <input type="text" id="name" name="name" className='form-control' style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} defaultValue={name} onChange={(e)=>{setName(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{nameError}</p>
    </div>
    
    <div>

    <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'37px'}}>Designation:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%'}}> 
     <input type="text" className='form-control' id="designation" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} defaultValue={designation} onChange={(e)=>{setDesignation(e.target.value)}}/><br /> 
     </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{designationError}</p>
    </div>
    
    </div>

    <div style={{marginTop:'100px'}}>
<div>  
    <label  htmlFor="lname" >Gender:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%' }}>
    <select className='form-control' id='gender' defaultValue={gender} onChange={(e)=>{setGender(e.target.value)}} style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }}>
    <option  value="" >select an option</option>
    <option value="M" >M</option>
    <option value="F">F</option>
  </select>
  </div>
  <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{genderError}</p>
  </div>

  <div>
  <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'160px'}}>Address:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%' }}>
    <input type="text" className='form-control' id="address" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} defaultValue={address} onChange={(e)=>{setAddress(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{addressError}</p>
    </div>
    </div>

    <div style={{marginTop:'100px'}}>
    <div>
    <label htmlFor="fname" style={{position:'absolute', right:'60%', left:'3%'}}>Highest Qualification:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%', marginTop:'5%' }}>
    <input type="text" className='form-control' id="highest_qualification" name="name"  style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }} defaultValue={highest_qualification} onChange={(e)=>{setHighest_Qualification(e.target.value)}}/><br />
    </div>
    <p className='error' style={{position:'absolute', right:'65%',  marginTop:'14%', left:'2.5%'}}>{highest_qualificationError}</p>
    </div>

  </div>




  

<div style={{ marginTop:'120px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={UpdateDoctor}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>

Update
</a>
</div>
  </ModalBody>
</Modal>











{/* 
{isOpenForUpdate && <Popup
content={<>
<div style={{position:'absolute', right:'50%', marginTop:'10px'}}>
    <b>Enter Data</b>
    </div>
    <form>
      <div style={{marginTop:'70px'}}>
    <div>
    <label  htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', right:'65%', left:'2.5%', width:'40%'}}>
    <input type="text" id="name" name="name" className='form-control' style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} defaultValue={name} onChange={(e)=>{setName(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{nameError}</p>
    </div>
    
    <div>

    <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'90px'}}>Designation:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%'}}> 
     <input type="text" className='form-control' id="designation" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} defaultValue={designation} onChange={(e)=>{setDesignation(e.target.value)}}/><br /> 
     </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{designationError}</p>
    </div>
    
    </div>

    <div style={{marginTop:'100px'}}>
<div>  
    <label  htmlFor="lname" >Gender:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%' }}>
    <select className='form-control' id='gender' defaultValue={gender} onChange={(e)=>{setGender(e.target.value)}} style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }}>
    <option  value="" >select an option</option>
    <option value="M" >M</option>
    <option value="F">F</option>
  </select>
  </div>
  <p className='error' style={{position:'absolute', right:'65%', marginTop:'50px', left:'2.5%'}}>{genderError}</p>
  </div>

  <div>
  <label htmlFor="fname" style={{position:'absolute', left:'50%', top:'221px'}}>Address:</label>
    <div className='form-class' style={{position:'absolute', right:'10%', width:'40%' }}>
    <input type="text" className='form-control' id="address" name="name" style={{position:'absolute', right:'27%', width:'100%', height:'100%', left:'0%'}} defaultValue={address} onChange={(e)=>{setAddress(e.target.value)}}/>
    </div>
    <p className='error' style={{position:'absolute', left:'50%', marginTop:'50px'}}>{addressError}</p>
    </div>
    </div>

    <div style={{marginTop:'100px'}}>
    <div>
    <label htmlFor="fname" style={{position:'absolute', right:'60%', left:'3%'}}>Highest Qualification:</label>
    <div className='form-class' style={{position:'absolute', right:'65%', width:'40%', left:'2.5%', marginTop:'5%' }}>
    <input type="text" className='form-control' id="highest_qualification" name="name"  style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%' }} defaultValue={highest_qualification} onChange={(e)=>{setHighest_Qualification(e.target.value)}}/><br />
    </div>
    <p className='error' style={{position:'absolute', right:'65%',  marginTop:'11%', left:'2.5%'}}>{highest_qualificationError}</p>
    </div>

  </div>


    <button type='button' style={{ backgroundColor: '#0072c6', width:'15%', height:'150%', color:'white',
      borderRadius:'20px',  marginTop:'20%'}} onClick={UpdateDoctor} >Save</button>

  </form>
</>}
handleClose={UpdateTogglePopup}
/>} */}



        </div>



        )}
      </div>
      
      
    


    )
}



export default Doctors;