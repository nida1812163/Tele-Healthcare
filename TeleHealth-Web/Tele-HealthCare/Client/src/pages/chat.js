import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import "../chat.css"
import Axios from 'axios';
import DoctorNavbar from "../components/DoctorNavbar"
import DoctorSideBar from "../components/DoctorSideBar"
import Appointment from './appointments'
import { data } from './appointments'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


function Chat() {


	const [initializing, setInitializing] = useState(true);
	const [name, setName] = useState("")
	const [message, setMessage] = useState("")
	const [chat, setChat] = useState([])



	
	//const [appointment_time, setAppointmentTime]=useState(new Date().toTimeString().split(':').slice(0,-1).join(':'))


	// 	const getData =()=>{
	// 		Axios.post('http://localhost:3001/appointmentTime').then(res => {
	//             setAppointmentTime(res.data)
	// 			var string = JSON.stringify(res.data)

	//     var json = JSON.parse(string)


	// })
	// }


	//getData();




	var tostring = JSON.stringify(data)
	var StringTime = JSON.parse(tostring)

	console.log(StringTime)

	useEffect(
		() => {
			try {
				const db = getDatabase();
				const starCountRef = ref(db, 'chat/' + StringTime); // 11:12 ki jaga appointment time pass krna h uske against messages ana start hojayenge
				onValue(starCountRef, (snapshot) => {

					const list = []

					if (snapshot != null) {
						snapshot.forEach(value => {

							const childData = value.val();

							var name = childData.name
							var role = childData.role
							var message = childData.message
							list.push({ name, role, message });

							console.log(name, role, message)
							console.log("value", childData);

						});
					}

					setChat(list.reverse())
					// setInitializing(false)

					console.log("result", snapshot.val())
				});
			} catch (ex) {
				console.log(ex);
			}
		}, false
	)

	const onMessageSubmit = (e) => {
		e.preventDefault();
		const db = getDatabase();
		var today = new Date()
		var	time = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '-' + today.getHours() + ':' + (today.getMinutes());
		const appointmentTime = StringTime; // yahan appointment time ayega
		const reference = ref(db, 'chat/' + appointmentTime + "/" + time);
		set((reference), {
			name: name,
			role: "doctor",
			message: message
		});

		setMessage("")

		console.log("babar: button click called")

	}

	const onNameTextChange = (e) => {
		setName(e.target.value)
	}

	const onMessageTextChange = (e) => {
		setMessage(e.target.value)
	}



	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3 className="chat-h3">
					{name}: <span style={{ color: "rgb(0,0,0)" }}>{message}</span>
				</h3>
			</div>
		))
	}

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

	return (


		<div >
			{(
				<div id="wrapper" style={{ background: 'linear-gradient(90deg, rgb(41,16,112) 0%, rgb(41,16,112) 100%)' }}>

					<DoctorSideBar />
					<div className="d-flex flex-column" id="content-wrapper" style={{ background: '#bac6dd' }}>
						<div id="content" style={{ color: '#2D2F3E' }}>

							<DoctorNavbar />
							<div className="container-fluid" >

								<div className="row table-row-container" style={{ maxWidth: "97%", minWidth: '20px' }}>
									<div className="row">


										<div className="chat-card">
											<form className="chat-form">
												<h1>Messenger</h1>
												<div className="name-field12">
													<TextField name="name" onChange={(e) => onNameTextChange(e)} value={name} label="Name" />
												</div>
												<div>
													<TextField
														name="message"
														onChange={(e) => onMessageTextChange(e)}
														value={message}
														id="outlined-multiline-static"
														variant="outlined"
														label="Message"
													/>
												</div>
												<button className="chat-button" onClick={(e)=>onMessageSubmit(e)}>Send Message</button>
											</form>

											{<div className="render-chat">
												<h1>Chat Log</h1>
												{
													renderChat()
												}
											</div>}
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

export default Chat;
