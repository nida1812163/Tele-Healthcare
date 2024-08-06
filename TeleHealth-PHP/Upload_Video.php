<?php


if( isset($_POST['patient_id']) && isset($_POST['reportID']) && isset($_POST['firebase_id'])){
	
	
	
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$patient_id = validate($_POST['patient_id']);
	$reportID = validate($_POST['reportID']);
	$firebase_id = validate($_POST['firebase_id']);
	
	
	$sql = "insert into uploaded_video(uploaded_id, patient_id, firebase_id) VALUES ('', '$patient_id', '$firebase_id')";
	
	
			
		if(!$conn->query($sql)){
			echo "Video inserted ";
		}
		else{
			
			
			$sql2 = "select uploaded_id from uploaded_video where firebase_id = '$firebase_id'";
			
			
				$result = $conn->query($sql2);
	
	
	if($result->num_rows > 0){
	
		
		
		while($row = $result->fetch_assoc()){
			
			$uploaded_id = $row["uploaded_id"];			

				

			
		}
		
				$sql4 = "UPDATE report set uploaded_id = '$uploaded_id' WHERE report.reportID = '$reportID'";
		
		
				if(!$conn->query($sql4)){
			echo "Unsuccessful";
		}
		else{
			echo "Successfully";
		}
		
		
		
	}
			
		}
	
	
	
	
	

	
	
}




?>