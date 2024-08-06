<?php


if( isset($_POST['Email']) && isset($_POST['Password']) ){


	require_once "conn.php";
	require_once "validate.php";

	
	
    $Email = validate($_POST['Email']);
	
	$Password = validate($_POST['Password']);
	
	
	$sql = "SELECT * FROM `signin` WHERE Email='$Email' AND Password='$Password' AND User='patient'";
	
	
	$result = $conn->query($sql);
	
	
	if($result->num_rows > 0){
		echo "Found";
		
		
		while($row = $result->fetch_assoc()){
			
			$signin_id = $row["signin_id"];			

				$sql4 = "select patient_id from patient where signin_id = $signin_id";
				
				$result = $conn->query($sql4);
	 
	 
				if($result->num_rows > 0){
	
				$output = array();	 
	
		
				while($row = $result->fetch_assoc()){
					$data = array();
			
					$data['patient_id'] = $row["patient_id"];
					
					array_push($output, $data);
				}
		
				echo json_encode($output);
		
				}
				else{
					echo "Unsuccessful";
				}
			
		}
		
		
		
	}
	else{
		echo "Not Found";
	}	
	
}


?>