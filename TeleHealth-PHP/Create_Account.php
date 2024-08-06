<?php


if( isset($_POST['Name']) && isset($_POST['Age']) && isset($_POST['Address']) && isset($_POST['Gender']) && isset($_POST['Email']) && isset($_POST['Password'])){
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Name = validate($_POST['Name']);
	$Age = validate($_POST['Age']);
	$Address = validate($_POST['Address']);
	$Gender = validate($_POST['Gender']);
	$Email = validate($_POST['Email']);
	$Password = validate($_POST['Password']);
	
	
	
	
	
	
	$sql1 = "SELECT `signin_id` FROM `signin` WHERE Email='$Email'";
	
	
	$Email_Exist = $conn->query($sql1);
	

	if($Email_Exist->num_rows > 0){
		echo "Email Exists";
	}
	else{
		
		$sql2 = "insert into signin values('', '$Email', '$Password', 'patient', Null)";
		
		$conn->query($sql2);	
		
		$result = $conn->query($sql1);
	
		while($row = $result->fetch_assoc()){
			
			$signin_id = $row["signin_id"];
			
			$sql3 = "insert into patient values('', '$Name', '$Gender', '$Age', '$Address', '$signin_id', Null)";
			
			if(!$conn->query($sql3)){
				echo "Unsuccessful";
			}
			else{
				
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
	}
	
	
	
	
	
	

	
	
}




?>