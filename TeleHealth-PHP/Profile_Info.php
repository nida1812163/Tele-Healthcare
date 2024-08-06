<?php



if(isset($_POST['Email'])){
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Email = validate($_POST['Email']);
	
	$sql1 = "SELECT `signin_id`, `password` FROM `signin` WHERE email='$Email' AND User='patient'";
	
	$result1 = $conn->query($sql1);
	
	if($result1->num_rows >0){
	
		
		while($row = $result1->fetch_assoc()){
			$signin_id = $row["signin_id"];
			$password = $row["password"];
			
		}
		
		
		$sql2 = "SELECT `patient_name`, `patient_gender`, `patient_age`, `patient_address` FROM `patient` WHERE signin_id='$signin_id'";
		
		$result2 = $conn->query($sql2);
		
		$output = array();
		

		while($row = $result2->fetch_assoc()){
			$data = array();
			
			$data['patient_name'] = $row["patient_name"];
			$data['patient_gender'] = $row["patient_gender"];
			$data['patient_age'] = $row["patient_age"];
			$data['patient_address'] = $row["patient_address"];
			$data['password'] = $password;
			
			array_push($output, $data);
		
		}
		
			
			
			
		echo json_encode($output);
	}
	
}
?>