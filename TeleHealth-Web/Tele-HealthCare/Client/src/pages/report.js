import React, { useState, useEffect, useRef } from 'react';
import RImage from '../reportImage.jpg'
import RBImage from '../reportBG.jpg'
import Axios from 'axios';
import DoctorSideBar from '../components/DoctorSideBar';
import DoctorNavbar from '../components/DoctorNavbar'
// import '../App.css'
import '../report.css'
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import DateMomentUtils from '@date-io/moment';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import ReactPlayer from 'react-player'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'




try {
    const firebaseConfig = {
        apiKey: "AIzaSyAj2SudXeA1661fcEb1JdprIPLqXd3KbYE",
        authDomain: "telehealth-92d03.firebaseapp.com",
        databaseURL: "https://telehealth-92d03-default-rtdb.firebaseio.com",
        projectId: "telehealth-92d03",
        storageBucket: "telehealth-92d03.appspot.com",
        messagingSenderId: "522448216881",
        appId: "1:522448216881:web:2221d15aa51f8a14650610",
        measurementId: "G-3Q3KYD93FX"
    };

    const app = initializeApp(firebaseConfig);
    // Initialize Firebase
    // Get a reference to the database service
    const database = getDatabase(app);
} catch (error) {
    console.log(error)

}






function Report() {


    const [inputTimeList, setinputTimeList] = useState([{ medicine_date: '', medicine_time: '', medicine_name: '' }])

    const [medicineList, setMedicineList] = useState([])




    const [list, setList] = useState([])
    const [patient_id, setpatient_id] = useState()
    const [patient_name, setuserName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState()
    const [weight, setWeight] = useState()
    const [diagnosis, setDiagnosis] = useState('')
    // const [medicinesPrescribed, setmedicinesPrescribed] = useState('')
    // const [medicineNotes, setmedicineNotes] = useState('')
    const [medicalHistory, setmedicalHistory] = useState('')
    const [medicalHistoryDescription, setmedicalHistoryDescription] = useState('')
    const [labTests, setlabTests] = useState('')
    const [labTestsDescription, setlabTestDescription] = useState('')
    const [medicineTaken, setmedicineTaken] = useState('')
    const [patient_gender, setGender] = useState('')
    const [patient_age, setAge] = useState()
    const [labTestsDone, setlabTestsDone] = useState()
    const [uploaded_video, setuploaded_video] = useState('')

    const [medicine_description, setmedicine_description] = useState('')
    const [medicine_date, setmedicine_date] = useState('')
    const [medicine_timings, setmedicine_timings] = useState('')




    const [emailErr, setemailErr] = useState(false)
    const [contactErr, setcontactErr] = useState(false)
    const [weightErr, setweightErr] = useState(false)
    const [diagnosisErr, setdiagnosisErr] = useState(false)
    const [patient_genderErr, setpatient_genderErr] = useState(false)

    const [render, setRender] = useState(true)




    const isMounted = useRef(true)


    useEffect(() => {
        getData()
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((resJson) => { resJson.json() })
            .then((res) => {
                setInterval(() => {
                    if (isMounted.current) {
                        getData()
                    }
                }, 1000)
            })

        return (() => {
            isMounted.current = false;
        })
    }, []);






    const getDoctorID = () => {

        Axios.get('http://localhost:3001/Doctor_ID').then(res => {

            // setList(res.data)


            var string = JSON.stringify(res.data)

            var json = JSON.parse(string)


            if (json.doctor_id === 0) {
                setRender(false)
                window.location = '/'
                alert("You Need To Sign In First!!!")
            }

        })

    }

    getDoctorID()




    const [PreviousReport, setPreviousReport] = useState(false)



    const getData = () => {
        Axios.post('http://localhost:3001/patient_report').then(res => {
            setList(res.data)

            var string = JSON.stringify(res.data)
            var json = JSON.parse(string)


            if (json == "") {
                setPreviousReport(false)
            }
            else {

                setPreviousReport(true)

                setpatient_id(json[0].patient_id)


                Axios.post('http://localhost:3001/data_prescribe_medicine').then(res => {

                    setMedicineList(res.data)

                })

            }



        })





    }

    // getData()





    function download(labTest) {
        const a1 = document.getElementById("a1")
        const blob = new Blob([labTest], { type: 'application/msword' })

        a1.href = URL.createObjectURL(blob)
        const b = a1.href;
        a1.setAttribute('download', 'report.doc')
        a1.click()
        //FileDownload(blob, "LabReport", "application/msword")

    }

    function downloadVideo(video) {
        const a2 = document.getElementById("a2")
        const blob = new Blob([video], { type: 'video/mp4' })
        a2.href = URL.createObjectURL(blob)
        // downloadFile(blob, "labTest.txt")
        console.log(video)
    }

    const donwloadFile = () => {
        Axios.post('http://localhost:3001/downloadFile').then(res => {
            setList(res.data)
            //console.log(res.data)
        })
    }





    // function download(labTestsDone) {
    //     const a1 = document.getElementById("a1")
    //     const blob = new Blob([JSON.stringify(labTestsDone)], { type: 'application/pdf' })
    //     a1.href = URL.createObjectURL(blob)
    //     // downloadFile(blob, "labTest.txt")
    //     console.log(labTestsDone)
    // }

    // function downloadFile(blob, filename){
    //     const url = window.URL.createObjectURL(blob)
    //     const a = document.getElementById("a1")
    //     a.href = url;
    //     a.download = filename
    //     a.click()
    //     a.remove()
    //     document.addEventListener("focus", w=>{window.URL.revokeObjectURL(blob)})
    //     alert(labTestsDone)
    // }


    const CreateReport = () => {
        if (weight != '' && diagnosis != '' && (!contact.length < 12)) {


            Axios.post('http://localhost:3001/create_report', {
                contact: contact,
                weight: weight,
                medicalHistory: medicalHistory,
                medicalHistoryDescription: medicalHistoryDescription,
                diagnosis: diagnosis,
                labTests: labTests,
                labTestsDescription: labTestsDescription,
                patient_id: patient_id,
            }).then(() => {




                inputTimeList.map((x, i) => {


                    alert("Create" + "\n" +
                        new Date(new Date(new Date(JSON.stringify(inputTimeList[i].medicine_date)).setDate(new Date(JSON.stringify(inputTimeList[i].medicine_date)).getDate())).toISOString()).toJSON().split('T')[0] + "\n" +
                        new Date(inputTimeList[i].medicine_time).toTimeString().split(' ')[0] + "\n" +
                        inputTimeList[i].medicine_name
                    )

                    Axios.post('http://localhost:3001/prescribe_medicine', {
                        medicine_date: new Date(new Date(new Date(JSON.stringify(inputTimeList[i].medicine_date)).setDate(new Date(JSON.stringify(inputTimeList[i].medicine_date)).getDate())).toISOString()).toJSON().split('T')[0],
                        medicine_time: inputTimeList[i].medicine_time,
                        medicine_name: inputTimeList[i].medicine_name
                    })

                })



                alert("Report Created")
                setpatient_id()
                setContact()
                setWeight()
                setmedicalHistory("")
                setmedicalHistoryDescription("")
                setDiagnosis("")
                // setmedicinesPrescribed("")
                // setmedicineNotes("")
                setlabTests("")
                setlabTestDescription("")
            })
        } else {
            setcontactErr(true)
            setdiagnosisErr(true)
            setweightErr(true)
        }



        getData();

    }




    const handleInputChange = (e, index) => {

        let { name, value } = e.target


        const list = [...inputTimeList]


        if (name == 'medicine_time') {

            const [time, modifier] = value.split(" ");

            let [hours, minutes] = time.split(":");

            if (hours === "12") {
                hours = "00";
            }

            if (modifier === "PM") {
                hours = parseInt(hours, 10) + 12;
            }

            value = hours + ':' + minutes

        }



        list[index][name] = value

        setinputTimeList(list)



    }


    const AddInputTextField = () => {
        // alert("add")
        setinputTimeList([...inputTimeList, { medicine_date: '', medicine_time: '', medicine_name: '' }]);

        // inputTimeList.map((x, i) => {
        //     alert(inputTimeList[i].medicine_time + '\n' +
        //         inputTimeList[i].medicine_date + '\n' +
        //         inputTimeList[i].medicine_name)
        // })

    }


    const RemoveInputTextField = index => {
        const list = [...inputTimeList];
        list.splice(index, 1);
        setinputTimeList(list);



    }





    const [firebaseUrl, setFirebaseUrl] = useState(null)
    const [isOpen, setIsOpen] = useState(false)



    const toggle = (uploaded_id)=>{
        
        UploadedVideo(uploaded_id)
        
        setIsOpen(!isOpen)
    }


    const UploadedVideo = (uploaded_id) => {

        

        Axios.post('http://localhost:3001/uploaded_video', {
            uploaded_id: uploaded_id
        }).then(res => {

            var string = JSON.stringify(res.data)

            var json = JSON.parse(string)

            const db = getDatabase();
            const starCountRef = ref(db, `Videos/${json[0].firebase_id}`);

            onValue(starCountRef, (snapshot) => {

                setFirebaseUrl(snapshot.val().downloadUri)

            })

        })


                      

        
    }










    return (
        <div>
            {render && (


                <div id="wrapper" style={{ background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)' }}>

                    <DoctorSideBar />
                    <div className="d-flex flex-column" id="content-wrapper" style={{ background: '#bac6dd' }}>
                        <div id="content" style={{ color: '#2D2F3E' }}>

                            <DoctorNavbar />


                            <div className="container-fluid" style={{ marginBottom: "50px" }}>

                                <div className="row table-row-container" style={{ maxWidth: "147%", width: "147%", height: '80vh', maxHeight: '80vh', minHeight: '47vh' }}>
                                    <div className="container py-5">
                                        <div className="row" style={{ maxWidth: '100%', minWidth: '15%', height: '80vh', maxHeight: '80vh', minHeight: '47vh' }}>
                                            <div className="col-lg-7 mx-auto bg-white rounded shadow" style={{ maxWidth: '100%', height: '80vh', maxHeight: '80vh', minHeight: '47vh' }}>
                                                {/* Fixed header table*/}


                                                <div className="table-responsive" style={{ maxWidth: '100%', height: '80vh', maxHeight: '80vh', minHeight: '47vh' }}>
                                                    <div className='outer'>


                                                        {/* Previous Report */}

                                                        <div div className="card mb-3" style={{ width: '100%', borderColor: 'blue' }}>
                                                            <div className="centered" style={{ position: 'absolute', top: '0%', left: '2%' }}><h1>Previous Report</h1></div>

                                                            <div className="card-body" style={{ marginTop: '45px' }}>


                                                                {PreviousReport == false ? (
                                                                    <dl className="row">
                                                                        <dt className="col-sm-3">No Previous Reports</dt>
                                                                    </dl>
                                                                ) : (


                                                                    list.reverse().map((val, key) => {
                                                                        return (


                                                                            <dl className="row">
                                                                                <dt className="col-sm-3">Patient Name</dt>
                                                                                <dd className="col-sm-9">{val.patient_name}</dd>

                                                                                <dt className="col-sm-3">Email</dt>
                                                                                <dd className="col-sm-9">{val.email}</dd>

                                                                                <dt className="col-sm-3">Contact Number</dt>
                                                                                <dd className="col-sm-9">{val.contact}</dd>

                                                                                <dt className="col-sm-3">Age</dt>
                                                                                <dd className="col-sm-9">{val.patient_age}</dd>

                                                                                <dt className="col-sm-3">Gender</dt>
                                                                                <dd className="col-sm-9">{val.patient_gender}</dd>

                                                                                <dt className="col-sm-3 text-truncate">Weight</dt>
                                                                                <dd className="col-sm-9">{val.weight}</dd>

                                                                                <dt className="col-sm-3 text-truncate">Diagnosis</dt>
                                                                                <dd className="col-sm-9">{val.diagnosis}</dd>

                                                                                <dt className="col-sm-3">Medicines Prescribed</dt>
                                                                                <dd className="col-sm-9">

                                                                                    {medicineList.map((val1, key) => {
                                                                                        return (

                                                                                            (val1.reportID == val.reportID) && (
                                                                                                <dl className="row" >
                                                                                                    <dt className="col-sm-4">{new Date(new Date(val1.medicine_date).setDate(new Date(val1.medicine_date).getDate() + 1)).toJSON().split('T')[0]}</dt>
                                                                                                    <dt className="col-sm-4" >{val1.medicine_timings}</dt>
                                                                                                    <dt className="col-sm-4" >{val1.medicine_description}</dt>
                                                                                                    <dt className="col-sm-4" >{val1.medicine_response}</dt>
                                                                                                    <dt className="col-sm-8" >{val1.medicine_response_time}</dt>
                                                                                                </dl>

                                                                                            )



                                                                                        )

                                                                                    })}

                                                                                </dd>
                                                                                <dt className="col-sm-3">Medical History</dt>
                                                                                <dd className="col-sm-9">
                                                                                    <dl className="row">
                                                                                        <dt className="col-sm-4">{val.medicalHistory}</dt>
                                                                                        <dd className="col-sm-8">{val.medicalHistoryDescription}</dd>
                                                                                    </dl>
                                                                                </dd>

                                                                                {/* <dt className="col-sm-3">Lab Tests</dt>
                                                                            <dd className="col-sm-9">
                                                                                <dl className="row">
                                                                                    <dt className="col-sm-4">{val.labTests}</dt>
                                                                                    <dd className="col-sm-8">{val.labTestsDescription}</dd>
                                                                                </dl>
                                                                            </dd> */}

                                                                                {/* <dt className="col-sm-3">Prescribed Medcine Taken</dt>
                                                                            <dd className="col-sm-9">{val.medicineTaken}</dd> */}

                                                                                {/* <dt className="col-sm-3">Lab Report</dt> */}
                                                                                {/* <embed src={val.labTestsDone}/> */}
                                                                                {/* <a id='a1' /*download={val.labTestsDone}* onClick={() => { download(val.labTestsDone) }}>Click To View</a> */}


                                                                                {/* <dt className="col-sm-3">Lab Report</dt>
                                                                            <a id='a1' onClick={() => { download(val.labTestsDone) }}>Download</a> */}
                                                                                {/* <dt className="col-sm-3">Uploaded Video</dt>
                                                                            <a id='a2' onClick={() => { downloadVideo(val.uploaded_video) }}>Download</a> */}


                                                                                <dt className="col-sm-3">Uploaded Video</dt>

                                                                                {val.uploaded_id === null ? (

                                                                                    <dd className="col-sm-9">
                                                                                        {/* {alert("nope")} */}

                                                                                        Video has not been uploaded yet
                                                                                    </dd>
                                                                                ) : (
                                                                                    <dd className="col-sm-9">
                                                                                        
<a className="btn btn-primary j" role="button"  onClick={()=>{toggle(val.uploaded_id)}}  style={{marginTop:'30px !important', width: '120px', height: '40px', paddingTop: '6px', paddingRight: '12px', fontWeight: 'bold', fontSize: "16px"}}>

View Video
</a>


                                                                                    </dd>
                                                                                )
                                                                                }


                                                                                <dt style={{ color: 'blue' }}>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</dt>
                                                                            </dl>
                                                                        )
                                                                    })

                                                                )

                                                                }







                                                            </div>
                                                        </div>





                                                        <Modal 
size='lg'
isOpen={isOpen}
toggle={()=>{setIsOpen(!isOpen)}}
style={{color:'black'}}
>

  <ModalHeader
toggle={()=>{setIsOpen(!isOpen)}}
style={{color:'black'}}
  >
    Uploaded Video
  </ModalHeader>

  <ModalBody>
        <div style={{ marginTop:'20px'}}>
        <div className='player-wrapper' style={{ position: 'relative', paddingTop: '56.25%' }}>
                <ReactPlayer
                playing={false}
                controls={true}
                
                    style={{ position: 'absolute', top: '0', left: '10%', width: '100%', height: '100%' }}
                    url= {firebaseUrl}/>

            </div>    
        </div>

  </ModalBody>
</Modal>

                                                        {/* Create Report */}

                                                        <div className="card mb-3" style={{ width: '100%', borderColor: 'blue' }}>
                                                            {/* <img src={RImage} className="card-img-top" /> */}
                                                            <div className="centered" style={{ position: 'absolute', top: '0%', left: '2%' }}><h1>Create Report</h1></div>
                                                            <div className="card-body" style={{ marginTop: '45px' }}>
                                                                {/* <h5 className="card-title">Create A New Report</h5> */}
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Contact Number:<span style={{ color: 'red' }}>*</span></label>
                                                                    <div className="col-sm-10">
                                                                        <input type="tel" class="form-control" id="inputContact" required placeholder='Enter Contact Number' onChange={(e) => { setContact(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Weight:<span style={{ color: 'red' }}>*</span></label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" required id="inputWeight" placeholder='Enter Weight' onChange={(e) => { setWeight(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Medical History:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputMD" placeholder='Enter Medical History' onChange={(e) => { setmedicalHistory(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Medical History Description:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputMD" placeholder='Enter Medical History' onChange={(e) => { setmedicalHistoryDescription(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Diagnosis:<span style={{ color: 'red' }}>*</span></label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputDiagnosis" required placeholder='Enter Diagnosis' onChange={(e) => { setDiagnosis(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3" >
                                                                    <label className="col-sm-2 col-form-label">Prescribe Medicine:</label>
                                                                    <div className="col-sm-2 col-form-label">
                                                                        {
                                                                            inputTimeList.map((x, i) => {

                                                                                return (
                                                                                    <div style={{ marginBottom: '20%' }}>
                                                                                        {/* <div className="col-sm-10" style={{ width: '100%' }}>
                                                                                            <input type="time" id="inputMD" placeholder='Enter Medicine Instructions' style={{ width: '100%' }} name="medicine_time" className="form-control" onChange={(e) => { handleInputChange(e, i) }} />
                                                                                        </div>

                                                                                        <div className="col-sm-10" style={{ width: '188%' }}>
                                                                                            <input type="date" style={{ width: '188%' }} name="medicine_date" className="form-control" id="inputPrescription" placeholder='Please Enter All The Medicine Names Along with its description For this Specific Time' onChange={(e) => { handleInputChange(e, i) }} />
                                                                                        </div>


                                                                                        <div className="col-sm-10" style={{ width: '188%' }}>
                                                                                            <input type="text" style={{ width: '188%' }} name="medicine_name" className="form-control" id="inputPrescription" placeholder='Please Enter All The Medicine Names Along with its description For this Specific Time' onChange={(e) => { handleInputChange(e, i) }} />
                                                                                        </div> */}


                                                                                        <dl className="row" style={{ width: '250%', maxWidth: '250%' }}>
                                                                                            <dt className="col-sm-4" >
                                                                                                <input type="time" id="inputMD" placeholder='Enter Medicine Instructions' style={{ width: '100%' }} name="medicine_time" className="form-control" onChange={(e) => { handleInputChange(e, i) }} />
                                                                                            </dt>
                                                                                            <dt className="col-sm-4" >
                                                                                                <input type="date" style={{ width: '115%', maxWidth: '115%' }} name="medicine_date" className="form-control" id="inputPrescription" placeholder='Please Enter All The Medicine Names Along with its description For this Specific Time' onChange={(e) => { handleInputChange(e, i) }} />
                                                                                            </dt>
                                                                                            <dt className="col-sm-4" >
                                                                                                <input type="textarea" style={{ width: '505%', maxWidth: '505%' }} name="medicine_name" className="form-control" id="inputPrescription" placeholder='Please Enter All The Medicine Names Along with its description For this Specific Time' onChange={(e) => { handleInputChange(e, i) }} />
                                                                                            </dt>



                                                                                            <dt className="col-sm-4" >

                                                                                                {inputTimeList.length !== 1 &&

                                                                                                    // <div className="col-sm-10" >

                                                                                                    <FontAwesomeIcon icon={faMinusCircle} onClick={RemoveInputTextField}></FontAwesomeIcon>

                                                                                                    // </div>
                                                                                                }
                                                                                                {inputTimeList.length - 1 === i &&
                                                                                                    // <div className="col-sm-10">

                                                                                                    <FontAwesomeIcon icon={faPlusCircle} style={{ marginLeft: '10px' }} onClick={AddInputTextField}></FontAwesomeIcon>
                                                                                                    // </div>

                                                                                                }
                                                                                            </dt>

                                                                                        </dl>


                                                                                    </div>
                                                                                )

                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {/* <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Medicine Description:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="time" className="form-control" id="inputMD" placeholder='Enter Medicine Instructions' onChange={(e) => { setmedicineNotes(e.target.value) }} />
                                                                    </div>
                                                                </div> */}
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Lab Tests:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputLabTest" placeholder='Enter Lab Tests' onChange={(e) => { setlabTests(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Test Description:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control" id="inputTD" placeholder='Enter Lab Test Instructions' onChange={(e) => { setlabTestDescription(e.target.value) }} />
                                                                    </div>
                                                                </div>
                                                                {/* <div className="row mb-3">
                                                                    <label className="col-sm-2 col-form-label">Patient No:</label>
                                                                    <div className="col-sm-10">
                                                                        <label className="col-sm-2 col-form-label" >{patient_id}</label>
                                                                    </div>
                                                                </div> */}
                                                                <button type="submit" className="btn btn-primary" onClick={CreateReport} style={{ position: 'relative', left: '90%', width: '10%' }}>Create</button>
                                                                {weightErr || diagnosisErr
                                                                    || contactErr ? <span style={{ color: 'red' }}>Please fill all required '*' fields or enter valid information</span> : null}
                                                            </div>
                                                        </div>





                                                    </div>
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

export default Report;