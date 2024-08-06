import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import Axios from'axios';
import './App.css';
import Head from './partials/head'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'




function SignIn() {
  

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false)


  const [Email_Error_Message, setEmail_Error_Message] = useState("")
  const [Password_Error_Message, setPassword_Error_Message] = useState("")


Axios.defaults.withCredentials = true;


let navigate = useNavigate();


const Login = ()=>{


  if(email != ''){
    document.getElementById('emailInput').parentElement.className = 'form-class'
   
    setEmail_Error_Message("")

  }

  if(password != ''){

    document.getElementById('passwordInput').parentElement.className = 'form-class1'
  
    setPassword_Error_Message("")

  }


  if(email === ''){
   
    document.getElementById('emailInput').parentElement.className = 'form-class error'
   
    setEmail_Error_Message("Please enter your Email Address")

  }

  if(password === ''){

    document.getElementById('passwordInput').parentElement.className = 'form-class1 error'
  
    setPassword_Error_Message("Please enter your Password")

  }


  if(email != '' && password != ''){
    
    Axios.post('http://localhost:3001/login', {

  email: email,
  password: password

  }).then((res)=>{
    
    var string = JSON.stringify(res.data)
    
    var json = JSON.parse(string)

    
    console.log(json)
    
    if(!res.data.auth){
      setLoginStatus(false)

     
        // navigate('/')
    
        alert("Incorrect Email Address or Password.\nPlease provide correct information")

        document.getElementById('emailInput').parentElement.className = 'form-class error'
   
        setEmail_Error_Message("Please enter the correct Email Address")

        
        document.getElementById('passwordInput').parentElement.className = 'form-class1 error'
  
        setPassword_Error_Message("Please enter the correct Password")


      
    }
    else{
      localStorage.setItem("token", res.data.token)
      
      setLoginStatus(true)

      // alert(res.data)

      // alert(string.includes("doctor"))
      




      if(string.includes("admin")){
        // alert("Valid"+loginStatus)
        // console.log('here now')
        navigate('/doctors_list')
      }
      else if(string.includes("doctor")){
        navigate('/meetings')
      }
      else if(string.includes("moderator")){
        navigate('/set_appointments')
      }
      else if(string.includes("finance")){
        navigate('/pending_payments')
      }
      
     
    }
    console.log("test")
    
      


    });



  }
  


  };




  const userAuthenticated =()=>{
    Axios.get('http://localhost:3001/isUserAuth', {
      headers: {
        "x-accexx-token": localStorage.getItem("token")
      }
    }).then((res)=>{
      console.log(res)
    })
  }

  

  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response)=>{
      if(response.data.loggedIn == true){
        setLoginStatus(response.data.user[0])
      }  
      console.log(response.data.user)
    })
  }, [])




    return(
      <div>
        <Head/>
        
          <div>
 

<nav className="navbar shadow  topbar static-top" style={{margin:'0px', background: 'rgb(41,16,112)', boxShadow: '2px 3px 8px -1px var(--bs-gray-900) !important'}}>
        
<div className="d-flex float-start sidebar-brand-icon" style={{marginLeft:'7%'}}>
          <div><img className="logo" src="https://icon-library.com/images/healthcare-icon/healthcare-icon-7.jpg" style={{width: "40px", height: "40px"}} /></div>
          <div>
            <h6 style={{textAlign: 'left', fontFamily: 'ABeeZee, sans-serif', color:'white', marginTop: "11px", marginLeft: "5px"}}>Tele-HealthCare</h6>
          </div>
        </div>
      </nav>

          </div>



          <div className="register-photo" style={{height:'88vh', margin:'0px'}}>
          
            <div className="form-container">
            <div className='image-holder' ></div>
              <form id='form'  >
                <h2 className="text-center">
                  <strong>Sign In to your account.</strong>
                </h2>
                <div className="form-group" >
                  <div className="form-class" style={{ height:'43.5px', width:'100%', borderRadius:'4px'}}>
                  <input style={{marginBottom:'30px'}} className="form-control" id='emailInput' name="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>
                  <div className="CheckCircle">
                  <FontAwesomeIcon icon ={faCheckCircle} ></FontAwesomeIcon>
                  </div>
                  <div className="ExclamationCircle">
                  <FontAwesomeIcon icon ={faExclamationCircle}  ></FontAwesomeIcon>
                  </div>
                  <p className='error'>{Email_Error_Message}</p>

                </div>
       
                <div className="form-group" >
                  <div className="form-class1" style={{ height:'43.5px', width:'100%', borderRadius:'4px'}}>       
                  <input style={{marginBottom:'30px'}} className="form-control" id='passwordInput' type="password" name="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                  </div>
                  <div className="CheckCircle">
                  <FontAwesomeIcon icon ={faCheckCircle}  ></FontAwesomeIcon>
                  </div>
                  <div className="ExclamationCircle">
                  <FontAwesomeIcon icon ={faExclamationCircle}  ></FontAwesomeIcon>
                  </div>
                  <p className='error'>{Password_Error_Message}</p>
                 </div>

                 <br></br>
                 
                <div className="button">
                  <button className="btn btn-primary btn-block" type="button" onClick={Login} style={{ backgroundColor: '#0072c6', color: '#82c6e2', width:'300px', color:'white'}}>Sign In</button>
                </div>
              </form>
            </div>
            
          </div>
          
        </div>
    )

}
export default SignIn;