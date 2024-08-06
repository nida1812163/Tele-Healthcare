import React, { useEffect, useRef, useState } from 'react';
import Axios from'axios';
import Popup from '../popup';
import DoctorNavbar from '../components/DoctorNavbar';
import AdminSideBar from '../components/AdminSideBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'



function Admin() {

var number = 0

    const[isOpenForInsert, setIsOpenForInsert] = useState(false)
    const[isOpenForUpdate, setIsOpenForUpdate] = useState(false)

    const[list, setList]=useState([])

    const [administrator_signin, setadministrator_signin]=useState('')
    const [name,setname]=useState('')
    const [contact,setcontact]=useState('')
    

    const [nameErrorMessage, setName_Error_Message] = useState('')
    const[contactErrorMessage, setContact_Error_Message] = useState('')

    

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
      
      getAdminID()
      






  
    const getData = () => {
        Axios.post('http://localhost:3001/admindetails').then(res => {
            setList(res.data)
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
  

  
  
    const delete_admin = (administrator_signin)=>{
      Axios.delete(`http://localhost:3001/delete_admin/${administrator_signin}`)
      getData();
      console.log('here')
  }





  const insertAdmin = ()=>{


    if(name == ''){

      document.getElementById('name').parentElement.className = 'form-class error'
   
      setName_Error_Message("Please enter the name")

    }

    if(contact == ''){

      document.getElementById('contact').parentElement.className = 'form-class1 error'
   
      setContact_Error_Message("Please enter the contact")

    }



    if(name != ''){
      document.getElementById('name').parentElement.className = 'form-class'
   
      setName_Error_Message("")
    }

    if(contact != ''){
      document.getElementById('contact').parentElement.className = 'form-class1'
   
      setContact_Error_Message("")

    }
    
//alert("hh")


    if(name != '' && contact != ''){

      Axios.post('http://localhost:3001/insert_admin', {
      name:name, 
      contact:contact
    }).then(()=>{
      alert("Inserted")
    })
    console.log('here')

    InsertTogglePopup()

    
    setname('')
    setcontact('')

    getData();

    }
    
  }



  const UpdateAdmin = ()=>{
    
    if(name == ''){

      document.getElementById('name').parentElement.className = 'form-class error'
   
      setName_Error_Message("Please enter the name")

    }

    if(contact == ''){

      document.getElementById('contact').parentElement.className = 'form-class error'
   
      setContact_Error_Message("Please enter the contact")

    }



    if(name != ''){
      document.getElementById('name').parentElement.className = 'form-class'
   
      setName_Error_Message("")
    }

    if(contact != ''){
      document.getElementById('contact').parentElement.className = 'form-class'
   
      setContact_Error_Message("")

    }
    
  
    if(name != '' && contact != ''){
      Axios.put('http://localhost:3001/update_admin', {
        name:name, 
        contact:contact,
        administrator_signin: administrator_signin
      }).then(()=>{
        alert("Updated")
      })
      console.log('here')
  
      UpdateTogglePopup()
  
      setname('')
      setcontact('')
      
      getData();
  
  
    }
    
  
  }



  const InsertTogglePopup = () => {
  
    setName_Error_Message("")
    setContact_Error_Message("")

    setIsOpenForInsert(!isOpenForInsert)
    console.log(isOpenForInsert)

  }


  
  const UpdateTogglePopup = (administrator_signin, name, contact)=>{
    
    setadministrator_signin(administrator_signin)
    setname(name)
    setcontact(contact)

    setName_Error_Message("")
    setContact_Error_Message("")

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
          <h3 className="text-white mb-4 header" style={{marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>List of Administrators</h3>
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
                      <th scope="col" className="col-3">Administrator Name</th>
                      <th scope="col" className="col-3">Administrator Contact Number</th>
                      <th scope="col" className="col-3"></th>
                      <th scope="col" className="col-3" />
                    </tr>
              
                  </thead>

       
                  <tbody>
           
                  {list.map((val,key)=>{
      return(
        <tr style={{border:'5px', borderSpacing: '0 15px', width: '150px', textAlign:'center'}}>
          
          <th scope="row" className="col-3">{++number}</th>
          
          
          <td className="col-3">
          {val.name}
            </td>


            <td className="col-3">
            {val.contact}
            </td>


          

            <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{UpdateTogglePopup(val.administrator_signin, val.name, val.contact)}}  style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
                           Update
                        </a>
                      </td>          


          <td className="col-3">
                        <a className="btn btn-primary j" role="button" onClick={()=>{delete_admin(val.administrator_signin)}}  style={{width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
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
    Add Administrator
  </ModalHeader>

  <ModalBody>



      <div style={{marginTop:'20px'}}>
    <label htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="name" className='form-control' name="name" style={{position:'absolute', width:'100%', height:'100%', right:'65%', left:'0%'}} onChange={(e)=>{setname(e.target.value)}}/><br />
    </div>
    <p className='error' style={{marginTop:'50px'}}>{nameErrorMessage}</p>
    </div>
    <div style={{marginTop:'30px'}}>
    <label htmlFor="lname" style={{marginTop:'10px'}}>Contact:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="contact" className='form-control' name="contact" style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setcontact(e.target.value)}}/>
    </div>
    <p className='error' style={{marginTop:'50px'}}>{contactErrorMessage}</p>
    </div>
  

  

<div style={{ marginTop:'45px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={insertAdmin}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>
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
    Update Administrator's Detail
  </ModalHeader>

  <ModalBody>



  <div style={{marginTop:'20px'}}>
    <label htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="name" className='form-control' defaultValue={name} name="name" style={{position:'absolute', width:'100%', height:'100%', right:'65%', left:'0%'}} onChange={(e)=>{setname(e.target.value)}}/><br />
    </div>
    <p className='error' style={{marginTop:'50px'}}>{nameErrorMessage}</p>
    </div>
    <div style={{marginTop:'30px'}}>
    <label htmlFor="lname" style={{marginTop:'10px'}}>Contact:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="contact" className='form-control' defaultValue={contact} name="contact" style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setcontact(e.target.value)}}/>
    </div>
    <p className='error' style={{marginTop:'50px'}}>{contactErrorMessage}</p>
    </div>
  

  

<div style={{ marginTop:'45px', float:'right'}}>
<a className="btn btn-primary j" role="button"  onClick={UpdateAdmin}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>

Update
</a>
</div>
  </ModalBody>
</Modal>



{/* 
{isOpenForInsert && <Popup
content={<>
  <div style={{position:'absolute', right:'50%', marginTop:'10px'}}>
    <b>Enter Data</b>
    </div>
    <form>
      <div style={{marginTop:'50px'}}>
    <label htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="name" className='form-control' name="name" style={{position:'absolute', width:'100%', height:'100%', right:'65%', left:'0%'}} onChange={(e)=>{setname(e.target.value)}}/><br />
    </div>
    <p className='error' style={{marginTop:'50px'}}>{nameErrorMessage}</p>
    </div>
    <div style={{marginTop:'30px'}}>
    <label htmlFor="lname" style={{marginTop:'10px'}}>Contact:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="contact" className='form-control' name="contact" style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setcontact(e.target.value)}}/>
    </div>
    <p className='error' style={{marginTop:'50px'}}>{contactErrorMessage}</p>
    </div>
    <button type='button' style={{ backgroundColor: '#0072c6', width:'15%', height:'150%', color:'white',
      borderRadius:'20px', marginTop:'20px'}} onClick={insertAdmin}>Save</button>
  </form>
  </>}
handleClose={InsertTogglePopup}
/>} */}



{/* 
{isOpenForUpdate && <Popup
content={<>
  <div style={{position:'absolute', right:'50%', marginTop:'10px'}}>
    <b>Enter Data</b>
    </div>
    <form>
      <div style={{marginTop:'50px'}}>
    <label htmlFor="fname">Name:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="name" className='form-control' defaultValue={name} name="name" style={{position:'absolute', width:'100%', height:'100%', right:'65%', left:'0%'}} onChange={(e)=>{setname(e.target.value)}}/><br />
    </div>
    <p className='error' style={{marginTop:'50px'}}>{nameErrorMessage}</p>
    </div>
    <div style={{marginTop:'30px'}}>
    <label htmlFor="lname" style={{marginTop:'10px'}}>Contact:</label>
    <div className="form-class"  style={{position:'absolute', width:'40%', height:'43.5px', right:'65%', left:'5%'}}>
    <input type="text" id="contact" className='form-control' defaultValue={contact} name="contact" style={{position:'absolute', right:'65%', width:'100%', height:'100%', left:'0%'}} onChange={(e)=>{setcontact(e.target.value)}}/>
    </div>
    <p className='error' style={{marginTop:'50px'}}>{contactErrorMessage}</p>
    </div>
    <button type='button' style={{ backgroundColor: '#0072c6', width:'15%', height:'150%', color:'white',
      borderRadius:'20px', marginTop:'20px'}} onClick={UpdateAdmin}>Save</button>
  </form>
  </>}
handleClose={UpdateTogglePopup}
/>} */}

        </div>


        )}
      </div>
      
      
      
      
    )

}
export default Admin;