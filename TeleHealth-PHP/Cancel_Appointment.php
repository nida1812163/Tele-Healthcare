<?php


if( isset($_POST['appointment_id'])){
	
	
	require_once "conn.php";
	require_once "validate.php";
	
	


	$appointment_id = validate($_POST['appointment_id']);
	
	
	$sql = "Update appointment SET appointment_approval = 'Cancelled' WHERE appointment_id = '$appointment_id'";
	
	
	
		
		if(!$conn->query($sql)){
			echo "Unsuccessful";
		}
		else{
			echo "Cancelled";
		}
	
	
	
}









?>