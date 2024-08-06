
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')


//const Expresssession = require('express-session')
// const bcrypt = require('bcrypt');
// const saltRounds = 10

const jwt = require('jsonwebtoken')


const app = express();



const http = require('http')

const server = http.createServer(app);



var mysql = require('mysql');

const cookieParser = require('cookie-parser');

const session = require('express-session');

global.signin_id = 1;


app.use(express.json())


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))



app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    keys: 'userId',
    secret: 'signingin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

var DatabaseConnection = new mysql.createConnection({
    host: "localhost",  
    user: "root",    
    password: "",
    database: "telehealth",
    acquireTimeout:6000000

    
})


DatabaseConnection.connect( (err)=>{
    if(err){
         console.log('Not connected, '+err)
        //console.log('Not connected to the Database')
    }else{
        console.log('Connected to the Database')
    }
})



var doctor_id = 0; // 1

var admin_id = 0; // 7

var moderator_id = 0; //14

var finance_id = 0; // 15



const verifyjwt = (req, res, next) =>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.send("we need a token")
    } else{
        jwt.verify(token, "jwtSecret", (err, decoded)=>{
            if(err){
                res.json({auth: false, message: "you are not authenticated"})
            } else{
                req.userid = decoded.id
                next()
            }
        })
    }
}



app.get('/isUserAuth', verifyjwt,(req, res)=>{
    res.send('you are authenticated')
})

app.get('/login', (req, res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    } else{
        res.send({loggedIn: false})
    }
})





app.post('/login', async(req, res)=> {
    
    const email = req.body.email;
    const password = req.body.password;
    
    console.log(email)
    console.log(password)

    
    
    var sql = "SELECT signin_id, User FROM signin WHERE NOT User='patient' AND email = ? AND password = ?"
    

   
    DatabaseConnection.query(sql, [email, password], function(err, result){
            if(err){
                console.log(err)
                res.send({err: err})
            } 
            if(result){
                console.log(result)


                req.session.user = result
                console.log(req.session.user)
                
                // res.send(result)
 
                var string = JSON.stringify(result)
                console.log(string)

                
                if(!string.includes('doctor') && !string.includes('admin') && !string.includes('moderator') && !string.includes('finance')){
                    res.json({auth: false, message: "wrong email and password"})
                    // res.send("Invalid")
                }
                else{

                var json = JSON.parse(string)
 
                
                
                
                
                if(string.includes('doctor')){
                    doctor_id = json[0].signin_id
                  }
                  else if(string.includes('admin')){
                    admin_id = json[0].signin_id
                  }
                  else if(string.includes('moderator')){
                    moderator_id = json[0].signin_id
                    console.log("moderator_id ===== "+moderator_id)
                  }
                  else{
                    finance_id = json[0].signin_id
                  }

                console.log(json[0].signin_id)
                console.log(json[0].User)
                
                
                const id = result[0].id
                
                const token = jwt.sign({id}, "jwtSecret", {
                    expiresIn: 300
                })
                res.json({auth: true, token:token, result:result})
                //res.send({auth: true, token:token, result:result})
                console.log({auth: true, token:token, result:result})
                
                }
                

            }
            else{
                res.json({auth: false, message: "wrong email and password"})
                // res.send("Invalid")
            }
        }
    );

})





app.get('/Admin_ID', async(req, res)=>{
    res.send({admin_id})
})


app.get('/Doctor_ID', async(req, res)=> {
    
res.send({doctor_id})   

})


app.get('/Moderator_ID', async(req, res)=> {
    
    res.send({moderator_id})   
    
    })


    app.get('/Finance_ID', async(req, res)=> {
    
        res.send({finance_id})   
        
        })



app.get('/full_name', async(req, res)=>{
    
    if(doctor_id != 0){
        var sql = "SELECT name FROM doctor WHERE signin_id = ?"

        DatabaseConnection.query(sql, [doctor_id], (err, result)=>{
            if(err){
                console.log(err)
                res.send(err)
            }
            else{
                res.send(result)
                // console.log(result)
            }
        })
    }
    
   
    if(admin_id !=0){

        var sql = "SELECT name FROM administrator WHERE signin_id = ?"

        DatabaseConnection.query(sql, [admin_id], (err, result)=>{
            if(err){
                console.log(err)
                res.send(err)
            }
            else{
                res.send(result)
                // console.log(result)
            }
        })

    }



   
    if(moderator_id != 0){

        var sql = "SELECT name FROM moderator WHERE signin_id = ?"

        DatabaseConnection.query(sql, [moderator_id], (err, result)=>{
            if(err){
                console.log('eerrr')
                res.send(err)
            }
            else{
                res.send(result)
                // console.log(result)
            }
        })

    }


   if(finance_id != 0){

        var sql = "SELECT name FROM finance WHERE signin_id = ?"

        DatabaseConnection.query(sql, [finance_id], (err, result)=>{
            if(err){
                console.log(err)
                res.send(err)
            }
            else{
                res.send(result)
                // console.log(result)
            }
        })

    }



})

app.get('/logout', async(req, res) =>{
    if(req.session.user){
        //res.header('Cache-Control', 'no-cache')
        res.cookie('jwt', '', {maxAge: 1})
        res.clearCookie('mycookie')
        //res.redirect('/')
    } 
    req.session.destroy((err)=>{
        if(err){
            return console.log(err)
        }
        
        doctor_id = 0
        admin_id = 0
        moderator_id = 0
        finance_id = 0

        
        res.redirect('/')
        console.log('logged out now')
    })

})














//Finance

app.get('/finance/payment_approval', async(req, res)=>{

    var sql = 'select appointment.appointment_id, patient.patient_name, appointment.appointment_date, appointment.appointment_time, payment.payment_status from patient, appointment, payment where payment.payment_status = ? and payment.appointment_id = appointment.appointment_id and appointment.patient_id = patient.patient_id and not appointment.appointment_approval = ? GROUP BY payment.appointment_id';


    DatabaseConnection.query(sql, ['Pending', 'approved'], (err, result)=>{

        if(result){
            res.send(result)
        }
        
    }
    )
})



app.put('/Completing_Payment', async(req, res)=>{

    const appointment_id = req.body.appointment_id

    // console.log(appointment_id)

    var sql = 'Update payment set payment_status = ? where appointment_id = ?'

    DatabaseConnection.query(sql, ['Complete', appointment_id], (err, result)=>{

        if(result){
            console.log('Payment Completed')
        }

    })


})


app.get('/Fully_Payed', async(req, res)=>{

    var sql = 'select appointment.appointment_id, patient.patient_name, appointment.appointment_date, appointment.appointment_time, payment.payment_status, appointment.appointment_approval from patient, appointment, payment where payment.payment_status = ? and payment.appointment_id = appointment.appointment_id and appointment.patient_id = patient.patient_id GROUP BY payment.appointment_id'

    DatabaseConnection.query(sql, ['Complete'], (err, result)=>{

        if(result){
            res.send(result)
        }
        
    }
    )


})



app.put('/Abandoned_Payment', async(req, res)=>{

    const appointment_id = req.body.appointment_id


    var sql = 'Update payment set payment_status = ? where appointment_id = ?'


    DatabaseConnection.query(sql, ['Abandoned', appointment_id], (err, result)=>{

        if(result){
            console.log('Abandoned')
        }

    })



    var sql = 'Update appointment set appointment_approval = ? where appointment_id = ?'

    DatabaseConnection.query(sql, ['rejected', appointment_id], (err, result)=>{

        if(result){
            console.log('Rejected')
        }

    })




})






// Moderator


app.get('/payment_approval', async(req, res)=>{

    var sql = 'select appointment.appointment_id, patient.patient_name, appointment.appointment_date, appointment.appointment_time from patient, appointment, payment where payment.payment_status = ? and payment.appointment_id = appointment.appointment_id and appointment.patient_id = patient.patient_id and not appointment.appointment_approval = ? and not appointment.appointment_approval = ? GROUP BY payment.appointment_id';


    DatabaseConnection.query(sql, ['Complete', 'approved', 'rejected'], (err, result)=>{

        if(result){
            res.send(result)
        }
        
    }
    )
})


app.put('/approving_Appointment', async(req, res)=>{

    const appointment_id = req.body.appointment_id

    console.log(appointment_id)

    var sql = 'Update appointment set appointment_approval = ? where appointment_id = ?'

    DatabaseConnection.query(sql, ['approved', appointment_id], (err, result)=>{

        if(result){
            console.log('Approval Successful')
        }

    })


})




app.get('/Doctor_Registration_List', async(req, res)=>{

    var sql = 'select * from doctor_registration';


    DatabaseConnection.query(sql, (err, result)=>{

        if(result){
            res.send(result)
        }
        
    }
    )
})

/////////////////

var patient_id= 7 ;


app.post('/specific_patient_id', async(req, res)=> {

    patient_id = req.body.specific_patient_id;

    console.log(patient_id)

    res.send()
})






app.post('/patients', async(req, res)=> {
    
    // var sql = "SELECT * FROM patient where doctor_id = 1"
    
    var sql = "SELECT patient.* FROM patient, doctor WHERE doctor.doctor_id = patient.doctor_id AND doctor.signin_id = ?"

    DatabaseConnection.query(sql, [doctor_id], function(err, result){
        if(err){
            console.log(err)
            // res.send({err: err})
        } 
        else{
            res.send(result)
        }
        
        
    }
    );
})



app.post('/profile', async(req, res)=> {
    

    var sql = "SELECT doctor.*, signin.password FROM doctor, signin WHERE signin.signin_id = ? AND doctor.signin_id = ?"


    DatabaseConnection.query(sql, [doctor_id, doctor_id], function(err, result){
        if(err){
            console.log(err)
            // res.send({err: err})
        } 
        else{
            // console.log(result)
            res.send(result)
        }
        
        
    }
    );
})



// var time = "18:15:20"
// console.log(new Date("2027-08-24T19:00:00.000Z").toDateString() +" "+ time +" "+ new Date().toTimeString().split(' ')[1])

// console.log(new Date().toTimeString().split(' ')[1])

// console.log(('18:15:23').split(':').slice(0,-1).join(':'))

// console.log(new Date().toTimeString().split(':').slice(0,-1).join(':'))


app.post('/meetings', async(req, res)=> {
    
      
// console.log(new Date().toISOString().split('T')[0])


// console.log(new Date(new Date().setDate(new Date().getDate() + 6)).toJSON().split('T')[0])


var current_date = new Date().toISOString().split('T')[0]

var after_7_days_date = new Date(new Date().setDate(new Date().getDate() + 6)).toJSON().split('T')[0]

// var current_time = new Date().toTimeString().split(':').slice(0,-1).join(':')



    var sql = "SELECT appointment.*, patient.patient_name FROM appointment, doctor, patient, payment WHERE (appointment.appointment_date >= ? AND appointment.appointment_date <= ? AND (appointment.appointment_time<CURRENT_TIME OR appointment.appointment_time>CURRENT_TIME)) AND doctor.doctor_id = appointment.doctor_id AND appointment.patient_id = patient.patient_id AND doctor.signin_id = ? AND appointment.appointment_approval='approved' AND payment.payment_status = 'Complete' AND payment.appointment_id = appointment.appointment_id;"
    
    DatabaseConnection.query(sql, [current_date, after_7_days_date, doctor_id], function(err, result){
        if(err){
            console.log(err)
            // res.send({err: err})
        } 
        else{
            // console.log(result)

            res.send(result)
        }  
    }
    );


})





app.post('/appointments', async(req, res)=> {
    
    var sql = "SELECT appointment.*, patient.patient_name FROM appointment, doctor, patient, payment WHERE doctor.doctor_id = appointment.doctor_id AND appointment.patient_id = patient.patient_id AND doctor.signin_id = ?  AND appointment.appointment_approval='approved' AND payment.payment_status = 'Complete' AND payment.appointment_id = appointment.appointment_id"
    
    
    DatabaseConnection.query(sql, [doctor_id], function(err, result){
        if(err){
            console.log(err)
            // res.send({err: err})
        } 
        else{
            res.send(result)
        }
        
        
    }
    );
})





app.post('/approved_appointments', async(req, res)=> {
    
    var sql = "SELECT appointment.*, patient.patient_name FROM appointment, patient, payment WHERE appointment.appointment_approval = 'approved' AND payment.payment_status = 'Complete' AND payment.appointment_id = appointment.appointment_id GROUP BY appointment.appointment_id;"
    
    
    DatabaseConnection.query(sql, ['approved', 'Complete'], function(err, result){
        if(err){
            console.log(err)
        } 
        else{
            // console.log(result)

            res.send(result)
        }
        
        
    }
    );
})



app.post('/insert_appointment', async(req, res)=>{

    const appointment_date = req.body.appointment_date
    const appointment_time = req.body.appointment_time
    const patient_id = req.body.patient_id

    console.log(appointment_date)
    console.log(appointment_time)
    console.log(patient_id)
    


    var sql = "INSERT INTO appointment (appointment_id, appointment_date, appointment_time, patient_id, doctor_id) VALUES ('',?,?,?, (SELECT doctor.doctor_id FROM doctor WHERE doctor.signin_id = ?))"

    DatabaseConnection.query(sql, [appointment_date, appointment_time, patient_id, doctor_id], (err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("inserted")
            res.send(result)
        }
    })
})





//-------CANCEL APPOINTMENT---------------
app.delete('/cancel_meeting/:appointment_id', async(req, res)=>{

    const appointment_id = req.params.appointment_id

    var sql = "DELETE FROM appointment WHERE appointment_id = ?"

    DatabaseConnection.query(sql, [appointment_id], (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Deleted Appointment ID : " + appointment_id)
            res.send("Deleted")
        }
    })

})




app.put('/update_apointment', async(req, res)=>{

    const appointment_date = req.body.appointment_date
    const appointment_time = req.body.appointment_time
    const appointment_id = req.body.appointment_id


    var sql = "UPDATE appointment SET appointment_date = ?, appointment_time = ? WHERE appointment_id = ?"

    DatabaseConnection.query(sql, [appointment_date, appointment_time, appointment_id], (err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Updated")
            res.send(result)
        }
    })
})








//---------------------------ADMIN DASHBOARD-----------------------------
//--------------------------ADMIN INSERT DATA TO ADMIN-------------------
app.post('/insert_admin', (req, res) =>{

    const name = req.body.name
    const contact = req.body.contact

    var sql = "INSERT INTO `administrator`(`administrator_signin`, `name`, `contact`, `signin_id`) VALUES (NULL,?,?,NULL)"
   
    DatabaseConnection.query(sql, [name, contact], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });
})

//---------------------------ADMIN INSERT PATIENT---------------------------
app.post('/insert_patient', (req, res) =>{

    const patient_name = req.body.patient_name
    const patient_gender = req.body.patient_gender
    const patient_age = req.body.patient_age
    const patient_address = req.body.patient_address

    var sql = "INSERT INTO `patient`(`patient_id`, `patient_name`, `patient_gender`, `patient_age`, `patient_address`, `signin_id`, `doctor_id`) VALUES ('',?,?,?,?,NULL,NULL)"
   
    DatabaseConnection.query(sql, [patient_name, patient_gender, patient_age, patient_address], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });
})



app.put('/update_patients_list', (req, res) =>{

    const patient_name = req.body.patient_name
    const patient_gender = req.body.patient_gender
    const patient_age = req.body.patient_age
    const patient_address = req.body.patient_address
    const patient_id = req.body.patient_id


    var sql = "UPDATE patient SET patient_name = ?, patient_gender = ?, patient_age = ?, patient_address = ? WHERE patient_id = ?"
   
    DatabaseConnection.query(sql, [patient_name, patient_gender, patient_age, patient_address, patient_id], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            console.log("Updated")
            res.send(result)
        }

    });
})








//-------------------------ADMIN INSERT DOCTOR----------------------------
app.post('/insert_doctor', (req, res) =>{

    const name = req.body.name
    const designation = req.body.designation
    const gender = req.body.gender
    const address = req.body.address
    const highest_qualification = req.body.highest_qualification

    var sql = "INSERT INTO `doctor`(`doctor_id`, `name`, `designation`, `gender`, `address`, `highest_qualification`, `signin_id`) VALUES (NULL,?,?,?,?,?,NULL)"
   
    DatabaseConnection.query(sql, [name, designation, gender, address, highest_qualification], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });
})





app.put('/update_doctors_list', (req, res) =>{

    
    const name = req.body.name
    const designation = req.body.designation
    const gender = req.body.gender
    const address = req.body.address
    const highest_qualification = req.body.highest_qualification
    const doctor_id = req.body.doctor_id

    var sql = "UPDATE doctor SET name = ?, designation = ?, gender = ?, address = ?, highest_qualification = ? WHERE doctor_id = ?"
   
    DatabaseConnection.query(sql, [name, designation, gender, address, highest_qualification, doctor_id], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });
})









//--------------------------ADMIN RETREIVING DOCTOR TABLE-----------------
app.post('/doctors_list', async(req, res)=>{
    
    var sql = "SELECT * FROM doctor"

    DatabaseConnection.query(sql, (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });


})

app.put('/update_profile', (req, res) =>{
    const name = req.body.name
    const password = req.body.password
    const designation = req.body.designation
    const gender = req.body.gender
    const address = req.body.address
    const highest_qualification = req.body.highest_qualification



    console.log(name)
    console.log(password)
    console.log(designation)
    console.log(gender)
    console.log(address)
    console.log(highest_qualification)



    var sql = "UPDATE doctor, signin SET doctor.name = ?, signin.password = ?, doctor.designation = ?, doctor.gender = ?, doctor.address = ?, doctor.highest_qualification = ? WHERE signin.signin_id  = ? AND doctor.signin_id = ?"

    DatabaseConnection.query(sql, [name, password, designation, gender, address, highest_qualification, doctor_id, doctor_id], (err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Updated")
            console.log("Updated")
        }
    })


})




//------------------ADMIN DELETING DOCTOR------------------------
app.delete('/delete_doctor/:doctor_id', async(req, res)=>{

    const doctor_id = req.params.doctor_id

    var sql = "DELETE FROM doctor WHERE doctor_id = ?"

    DatabaseConnection.query(sql, [doctor_id], (err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Deleted")
        }
    })

})



//----------------ADMIN RETRIEVING PATIENT LIST-------------------
app.post('/patients_list', async(req, res)=>{

    var sql = "SELECT * FROM patient"

    DatabaseConnection.query(sql, (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });


})

//--------------ADMIN DELETING PATIENT------------------
app.delete('/delete_patient/:patient_id', async(req, res)=>{

    const patient_id = req.params.patient_id

    var sql = "DELETE FROM patient WHERE patient_id = ?"

    DatabaseConnection.query(sql, [patient_id], (err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Deleted")
        }
    })


})




//----------ADMIN DETAILS---------------
app.post('/admindetails', async(req, res)=>{
    
    var sql = "SELECT * FROM administrator"

    DatabaseConnection.query(sql, (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });


})

//------DELETING ADMIN-----------
app.delete('/delete_admin/:administrator_signin', async(req, res)=>{

    const administrator_signin = req.params.administrator_signin

    var sql = "DELETE FROM administrator WHERE administrator_signin = ?"

    DatabaseConnection.query(sql, [administrator_signin], (err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Deleted")
        }
    })


})



app.put('/update_admin', async(req, res)=>{
    

    const name = req.body.name
    const contact = req.body.contact
    const administrator_signin = req.body.administrator_signin 


    var sql = "UPDATE administrator SET name = ?, contact = ? WHERE administrator_signin  = ?"
   
    DatabaseConnection.query(sql, [name, contact, administrator_signin], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });

})




var z = 0;

//---------PATIENT REPORT--------------
app.post('/patient_report', async(req, res)=> {

    var sql = "SELECT report.reportID, patient.patient_id, patient.patient_name, patient.patient_age, patient.patient_gender, report.diagnosis, signin.email, report.contact, report.weight, report.medicalHistory, report.medicalHistoryDescription, report.labTests, report.labTestsDescription, report.labTestsDone, report.uploaded_id FROM patient, report, medicine_reminder, signin WHERE patient.patient_id = ? AND report.patient_id = patient.patient_id GROUP by report.reportID"

    DatabaseConnection.query(sql, [patient_id], function(err, result){
        if(err){
            console.log(err)
            // res.send({err: err})
        } 
        else{
            
                            res.send(result)
                        
        }
        
        
    }
    );
})







//---------Uploaded Video--------------
app.post('/uploaded_video', async(req, res)=> {


    
    const uploaded_id = req.body.uploaded_id

    var sql = "SELECT firebase_id FROM uploaded_video WHERE uploaded_id = ?"

    
    DatabaseConnection.query(sql, [uploaded_id], function(err, result){

        if(err){
            console.log(err)
        } 
        else{
            
                            res.send(result)
                            // console.log(result)
                            
        }
        
        
    }
    );
})







var report_id


//----------CREATING REPORT-------------------------
app.post('/create_report', (req, res) =>{

    const contact= req.body.contact
    const weight= req.body.weight
    const medicalHistory = req.body.medicalHistory
    const medicalHistoryDescription = req.body.medicalHistoryDescription
    const diagnosis= req.body.diagnosis
    const labTests= req.body.labTests
    const labTestsDescription= req.body.labTestsDescription
    const patient_id = req.body.patient_id



            var sql1 = "INSERT INTO `report`(`contact`, `weight`, `medicalHistory`, `medicalHistoryDescription`,`diagnosis`, `labTests`, `labTestsDescription`, `patient_id`) VALUES (?,?,?,?,?,?,?,?)"

            DatabaseConnection.query(sql1, [contact, weight, medicalHistory, medicalHistoryDescription, diagnosis, labTests, labTestsDescription, patient_id], (err, result)=>{

                if(err){
                    console.log(err)
                }
                else{

                    var sql6 = "SELECT reportID FROM report WHERE reportID = (SELECT MAX(reportID) FROM report);"

                    DatabaseConnection.query(sql6, (err, result)=>{
                
                        if(err){
                            console.log(err)
                        }
                        else{
                            var string = JSON.stringify(result)
                
                            var json = JSON.parse(string)
                
                            report_id = json[0].reportID


                            res.send(result)
                        }
                
                    });
                
                    
                }
        
            });

})



app.post('/downloadFile', async(req, res)=> {
    
    var sql = "SELECT labTestsDone FROM `report` WHERE patient_id = 1";

    DatabaseConnection.query(sql, function(err, result){
        if(err){
            console.log(err)
            // res.send({err: err})
        } 
        else{
            result = result.map( v => Object.assign({}, v))
            var fileName = 'report.doc'
            res.download(fileName, result)
        }
        
        
    }
    );
})







var medicine_reminder_id



///-------------PRESCRIBE MEDICINE-----------------------///////

app.post('/prescribe_medicine', (req, res) =>{

    const medicine_date = req.body.medicine_date
    const medicine_time = req.body.medicine_time
    const medicine_name = req.body.medicine_name

    console.log(medicine_date)
    console.log(medicine_time)
    console.log(medicine_name)







    var sql = "insert into medicine_reminder(medicine_reminder_id, signin_id) VALUES ('', (SELECT signin_id FROM patient WHERE patient.patient_id = ?))"


    DatabaseConnection.query(sql, [patient_id], (err, result)=>{
        if(err){
            console.log(err)
        }
        else{

            var sql1 = "SELECT medicine_reminder_id FROM medicine_reminder WHERE medicine_reminder_id = (SELECT MAX(medicine_reminder_id) FROM medicine_reminder);"

            DatabaseConnection.query(sql1, (err, result)=>{
                if(err){
                    console.log(err)
                }
                else{

                    var string = JSON.stringify(result)

                    var json = JSON.parse(string)

                    medicine_reminder_id = json[0].medicine_reminder_id
                    


                    var sql2 = "UPDATE medicine_reminder SET medicine_description = ?, medicine_date = ?, medicine_timings = ?, reportID = ? WHERE medicine_reminder_id = ?"
   
                    DatabaseConnection.query(sql2, [medicine_name, medicine_date, medicine_time, report_id, medicine_reminder_id], (err, result)=>{

                        if(err){
                            console.log(err)
                        }
                        else{
                            res.send(result)   
                        }
                
                    });

                }
            })


        }
    })



   
   
})




var v = 0


///-------------DATA Retrieve PRESCRIBE MEDICINE-----------------------///////

app.post('/data_prescribe_medicine', (req, res) =>{

    var sql = "select * from medicine_reminder"
   
    DatabaseConnection.query(sql, (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
            if(v==1){
                console.log(result)
                v++;

            }
        }

    });
})




//---------------REGISTERING---------------------------------
app.post('/register', (req, res)=>{
    const name = req.body.name
    const designation = req.body.designation
    const gender = req.body.gender
    const address = req.body.address
    const email = req.body.email
    const contact = req.body.contact
    const highest_qualification = req.body.highest_qualification

    var sql = "INSERT INTO `doctor_registration`(`R_name`, `R_designation`, `R_gender`, `R_address`, `R_highestqualification`, `R_email`, `R_contact`) VALUES (?,?,?,?,?,?,?)"

    DatabaseConnection.query(sql, [name, designation, gender, address, highest_qualification, email, contact], (err, result)=>{

        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }

    });
})



server.listen(3001, ()=>{console.log('Server is runnning on port 3001');})