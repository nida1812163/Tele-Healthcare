<?php



if(isset($_POST['Email'])){
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Email = validate($_POST['Email']);
	

	$sql = "SELECT reportID, diagnosis, weight, labTests, labTestsDescription, labTestsDone, uploaded_id FROM report, patient WHERE report.patient_id = patient.patient_id AND patient.signin_id = (SELECT signin.signin_id FROM signin WHERE signin.email = '$Email');";
	 
	 
	$result = $conn->query($sql);
	 
	 
	if($result->num_rows > 0){
	
		$output = array();	 
	
		
		while($row = $result->fetch_assoc()){
			$data = array();
			
			$data['reportID'] = $row["reportID"];
			$data['diagnosis'] = $row["diagnosis"];
			$data['weight'] = $row["weight"];
			$data['labTests'] = $row["labTests"];
			$data['labTestsDescription'] = $row["labTestsDescription"];
			$data['labTestsDone'] = $row["labTestsDone"];
			$data['uploaded_id'] = $row["uploaded_id"];
			
			array_push($output, $data);
		}
		
		echo json_encode($output);
		
	}
	else{
		echo "Unsuccessful";
	}
	 
	
}
?>