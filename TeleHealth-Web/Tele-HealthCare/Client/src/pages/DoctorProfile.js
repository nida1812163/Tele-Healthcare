import React, {useState} from 'react';
import Axios from'axios';
import DoctorSideBar from '../components/DoctorSideBar';
import DoctorNavbar from '../components/DoctorNavbar'


var number = 0


function DoctorProfile() {


    const[list, setList]=useState([])
    


        
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
        
        // else{
        //   setRender(true)
        // }
            })
      
      }
      
      getDoctorID()




      const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [designation, setDesignation] = useState()
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()
    const [highest_qualification, setHighest_qualification] = useState()
    



      const getData = () =>{

        Axios.post('http://localhost:3001/profile').then((res)=>{
          var string = JSON.stringify(res.data)
          var json = JSON.parse(string)
          
          // alert("hello"+json[0].signin_id);
    
          // setID(json[0].signin_id)
          setName(json[0].name)
          setPassword(json[0].password)
          setDesignation(json[0].designation)
          setGender(json[0].gender)
          setAddress(json[0].address)
          setHighest_qualification(json[0].highest_qualification)

          number = 1

    
          // alert(json[0].signin_id +"\n"+ name+"\n"+password+"\n"+designation+"\n"+gender+"\n"+address+"\n"+highest_qualification)
    
          // alert(signin_id +"\n"+ name+"\n"+password+"\n"+designation+"\n"+gender+"\n"+address+"\n"+highest_qualification)
    
        })
    
      }
    


    if(number === 0){
      getData();
    }
      
    



      const UpdateProfile = ()=>{
    
        // alert("name : "+name +"\n password : "+ password + "\ndesignation : " + designation + "\ngender : "+ gender + "\naddress : " + address + "\nhighest_Qualification : " + highest_qualification)
    
        
        Axios.put("http://localhost:3001/update_profile", {
    
          name: name,
          password: password,
          designation: designation,
          gender: gender,
          address: address,
          highest_qualification: highest_qualification
          
        })
        

        alert('Profile Updated')


        window.location.reload();

        
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
            <h3 className="text-white mb-4 header" style={{marginTop: "10px", fontWeight: 'bold', fontSize: '33.1px', marginLeft: "8px"}}>Profile</h3>
          </div>
          <div className="col-12 col-sm-6 col-md-6 text-end col-1-heading" style={{marginBottom: "30px", height: "59px"}}><a className="btn btn-primary btn-sm text-center d-sm-inline-block updateprofilebutton" role="button" onClick={UpdateProfile} style={{marginTop: "10px", marginRight: "12px", width: '275.7px', height: "46px", paddingTop: "6px", fontWeight: 'bold', fontSize: "17px"}}>
            {/* <i className="far fa-calendar-plus fa-sm text-white-50" style={{marginRight: "7px", fontSize: '21.9px', paddingTop: "0px", marginTop: "4px"}} />&nbsp; */}
            <span className="button-span" style={{fontSize: '18.2px'}}>Update Profile</span></a></div>
        </div>
        <div className="row ll" style={{ maxWidth: "97%", minWidth: '20px', margin:'0px'}}>  
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-7 mx-auto bg-white rounded shadow" >
                {/* Fixed header table*/}
                
                
                <div className="table-responsive">
                  <table className="table">

         
                    <tbody>
             
          <tr style={{textAlign:'center'}}>
            

                <td className="col-3">
                    <label style={{fontSize:'20px', width:'10%'}} >Name:</label>
                </td>

                <td className="col-3">    
                <input className="form-control" type="text" name="email"  defaultValue={name}  onChange={(e)=>{setName(e.target.value)}} ></input>
                </td>
              
          </tr>


          <tr style={{textAlign:'center'}}>
            

            <td className="col-3">
            <label style={{fontSize:'20px'}} >Password:</label>
            </td>

            <td className="col-3">    
            <input className="form-control" type="password" name="email"  onChange={(e)=>{setPassword(e.target.value)}} defaultValue={password}></input>
            </td>
          
      </tr>



      <tr style={{textAlign:'center'}}>
  
            <td className="col-3">
            <label style={{fontSize:'20px'}} >Designation:</label>
            </td>

            <td className="col-3">    
            <input className="form-control"  defaultValue={designation} onChange={(e)=>{setDesignation(e.target.value)}} ></input>
            </td>
          
      </tr>



      <tr style={{textAlign:'center'}}>
  
  <td className="col-3">
  <label style={{fontSize:'20px'}} >Gender:</label>
  </td>

  <td className="col-3">    
  <input className="form-control" type="name" name="email" onChange={(e)=>{setGender(e.target.value)}} defaultValue={gender}></input>
  </td>

</tr>



<tr style={{textAlign:'center'}}>
  
  <td className="col-3">
  <label style={{fontSize:'20px'}} >Address:</label>
  </td>

  <td className="col-3">    
  <input className="form-control" type="name" name="email" onChange={(e)=>{setAddress(e.target.value)}} defaultValue={address}></input>
  </td>

</tr>



<tr style={{textAlign:'center'}}>
  
  <td className="col-3">
  <label style={{fontSize:'20px'}} >Highest Qualification:</label>
  </td>

  <td className="col-3">    
  <input className="form-control" type="name" name="email" onChange={(e)=>{setHighest_qualification(e.target.value)}} defaultValue={highest_qualification}></input>
  </td>

</tr>
                      
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
export default DoctorProfile;