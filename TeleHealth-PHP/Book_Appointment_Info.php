<?php


	require_once "conn.php";
	require_once "validate.php";
	
	
	
	$sql = "select designation, name, doctor_id FROM doctor";
	 
	 
	$result = $conn->query($sql);
	 
	 
	if($result->num_rows > 0){
	
		$output = array();	 
	
		
		while($row = $result->fetch_assoc()){
			$data = array();
			
			$data['designation'] = $row["designation"];
			$data['name'] = $row["name"];
			$data['doctor_id'] = $row["doctor_id"];
			
			array_push($output, $data);
		}
		
		echo json_encode($output);
		
	}
	else{
		echo "Unsuccessful";
	}
	 
	

?>