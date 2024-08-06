import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import Head from './partials/head'
import './App.css';
import Axios from'axios';

function Signup() {

    const[name, setName] = useState("");
    const[designation, setDesignation] = useState("");
    const[gender, setGender] = useState("");
    const[address, setAddress] = useState("");
    const[highest_qualification, setHighestQualification] = useState("");
    const[email, setEmail] = useState("")
    const[contact, setContact] = useState();

    const[nameErr, setNameErr] = useState(false);
    const[designationErr, setDesignationErr] = useState(false);
    const[genderErr, setGenderErr] = useState(false);
    const[addressErr, setAddressErr] = useState(false);
    const[highest_qualificationErr, setHighestQualificationErr] = useState(false);
    const[emailErr, setEmailErr] = useState(false)
    const[contactErr, setContactErr] = useState(false);

    const register = ()=>{

        if(name!='' && designation != '' && gender != '' && address != '' && highest_qualification != '' && email != '' && contact != '' && (email.includes('@gmail.com') || email.includes('@yahoo.com') || email.includes('@hotmail.com') || email.includes('.pk')) &&
        (!address.length<5) && (!contact.length<12)){
            
            Axios.post('http://localhost:3001/register', {
                name: name, 
                designation: designation, 
                gender, gender, 
                address: address, 
                email: email,
                contact: contact,
                highest_qualification: highest_qualification
            }).then((res)=>{
                console.log(res)
                alert("Your request has been sent, we will contact you soon for an interview")
            })
        }else{
            setNameErr(true)
            setDesignation(true)
            setAddressErr(true)
            setContactErr(true)
            setEmailErr(true)
            setGenderErr(true)
            setHighestQualificationErr(true)
        }

    }

    return (
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
                            <strong>Sign Up To Register</strong>
                        </h2>
                        <div className="form-group" >
                            <div className="form-class" style={{ height: '43.5px', width: '100%', borderRadius: '4px' }}>
                                <input style={{ marginBottom: '30px' }} required type="text" className="form-control" id='nameInput' name="name" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <select className="form-select" required aria-label="Default select example" onChange={(e)=>{setDesignation(e.target.value)}} >
                                <option value="" disabled selected hidden>Applying for Designation</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Psychologist">Psychologist</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-select" required aria-label="Default select example" onChange={(e)=>{setGender(e.target.value)}}>
                                <option value="" disabled selected hidden>Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div className="form-group" >
                            <div className="form-class" style={{ height: '43.5px', width: '100%', borderRadius: '4px' }}>
                                <input style={{ marginBottom: '30px' }} required type="text" className="form-control" id='addressInput' name="address" placeholder="Enter Residential Address" onChange={(e)=>{setAddress(e.target.value)}}/>
                            </div>
                        </div>

                        <div className="form-group" >
                            <div className="form-class" style={{ height: '43.5px', width: '100%', borderRadius: '4px' }}>
                                <input style={{ marginBottom: '30px' }} required type="email" className="form-control" id='emailInput' name="email" placeholder="Enter Email Address" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group" >
                            <div className="form-class" style={{ height: '43.5px', width: '100%', borderRadius: '4px' }}>
                                <input style={{ marginBottom: '30px' }} required type="tel" className="form-control" id='contactInput' name="contact" placeholder="Enter Contact" onChange={(e) => { setContact(e.target.value) }} />
                            </div>
                        </div>

                        <div className="form-group" >
                            <div className="form-class" style={{ height: '43.5px', width: '100%', borderRadius: '4px' }}>
                                <input style={{ marginBottom: '30px' }} required type="text" className="form-control" id='qualificationInput' name="name" placeholder="Enter Highest Qualification" onChange={(e)=>{setHighestQualification(e.target.value)}}/>
                            </div>
                        </div>

                        <br></br>

                        <div className="button">
                            <button className="btn btn-primary btn-block" type="button" style={{ backgroundColor: '#0072c6', color: '#82c6e2' }} onClick={register}>Sign Up</button>
                            {nameErr||designationErr||
                            genderErr||addressErr||highest_qualificationErr||emailErr
                            ||contactErr?<span style={{color:'red'}}>Please fill all fields or enter valid information</span>:null}
                        </div>
                    </form>
          </div>
          
        </div>



        </div>
    )
}

export default Signup;