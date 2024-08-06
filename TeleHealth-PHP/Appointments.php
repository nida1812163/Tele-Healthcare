<?php



if(isset($_POST['Email'])){
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Email = validate($_POST['Email']);
	
	$sql = "SELECT patient.patient_id, appointment.appointment_id, appointment.appointment_date, appointment.appointment_time, doctor.name FROM appointment, doctor, patient, signin, payment WHERE appointment.patient_id=patient.patient_id AND patient.signin_id=signin.signin_id  AND doctor.doctor_id=appointment.doctor_id AND appointment.appointment_id = payment.appointment_id AND appointment_approval='approved' AND payment.payment_status = 'Complete' AND (appointment.appointment_date>=CURRENT_DATE AND (appointment.appointment_time<CURRENT_TIME OR appointment.appointment_time>CURRENT_TIME)) AND signin.email='$Email';";
	 
	 
	$result = $conn->query($sql);
	 
	 
	if($result->num_rows > 0){
	
		$output = array();	 
	
		
		while($row = $result->fetch_assoc()){
			$data = array();
			
			$data['appointment_id'] = $row["appointment_id"];
			$data['appointment_date'] = $row["appointment_date"];
			$data['appointment_time'] = $row["appointment_time"];
			$data['name'] = $row["name"];
			
			array_push($output, $data);
		}
		
		echo json_encode($output);
		
	}
	else{
		echo "Unsuccessful";
	}
	 
	
}
?>