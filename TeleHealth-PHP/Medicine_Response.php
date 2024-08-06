<?php


if( isset($_POST['Response']) && isset($_POST['medicine_reminder_id']) && isset($_POST['medicine_response_time']) ){
	
	
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Response = validate($_POST['Response']);
	$medicine_reminder_id = validate($_POST['medicine_reminder_id']);
	$medicine_response_time = validate($_POST['medicine_response_time']);
	
	
	$sql = "UPDATE medicine_reminder set medicine_response = '$Response', medicine_response_time = '$medicine_response_time' where	medicine_reminder_id = $medicine_reminder_id";
	

			
		if(!$conn->query($sql)){
			echo "Unsuccessful";
		}
		else{
			echo "Successfully";
		}
	
	
	
	
	

	
	
}




?>