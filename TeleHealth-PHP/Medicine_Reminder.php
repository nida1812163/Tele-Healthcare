<?php


if( isset($_POST['Email']) ){
	
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Email = validate($_POST['Email']);
	
	
	
	$sql = "SELECT * FROM `medicine_reminder` WHERE medicine_date = CURRENT_DATE AND medicine_timings > CURRENT_TIME AND signin_id = (SELECT signin.signin_id FROM signin WHERE signin.email = '$Email')";
	

			
	$result = $conn->query($sql);
	 
	 
	if($result->num_rows > 0){
	
		$output = array();	 
	
		
		while($row = $result->fetch_assoc()){
			$data = array();
			
			$data['medicine_reminder_id'] = $row["medicine_reminder_id"];
			$data['medicine_description'] = $row["medicine_description"];
			$data['medicine_date'] = $row["medicine_date"];
			$data['medicine_timings'] = $row["medicine_timings"];
			
			array_push($output, $data);
		}
		
		echo json_encode($output);
		
	}
	
	
	
	
	

	
	
}




?>