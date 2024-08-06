<?php


if( isset($_POST['Time']) && isset($_POST['Date']) && isset($_POST['Email']) && isset($_POST['doctor_id']) ){
	require_once "conn.php";
	require_once "validate.php";
	
	

	$Time = validate($_POST['Time']);
	$Date = validate($_POST['Date']);
	$Email = validate($_POST['Email']);
	$doctor_id = validate($_POST['doctor_id']);
	
	
	
	
	
	
	$sql = "INSERT INTO appointment(appointment_date, appointment_time, doctor_id, patient_id) VALUES ('$Date', '$Time', '$doctor_id', (SELECT patient.patient_id from patient where patient.signin_id = (SELECT signin.signin_id FROM signin WHERE signin.email = '$Email')))";
	
	
	
	
		
		if(!$conn->query($sql)){
			echo "Unsuccessful";
		}
		else{
			echo "Submit";
		}
	
	
	
	

	
	
}




?>