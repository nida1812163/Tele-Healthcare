<?php


if( isset($_POST['Name']) && isset($_POST['Age']) && isset($_POST['Address']) && isset($_POST['Gender']) && isset($_POST['Chosen_Email']) && isset($_POST['Email']) && isset($_POST['Password'])){
	
	
	require_once "conn.php";
	require_once "validate.php";
	
	
	$Name = validate($_POST['Name']);
	$Age = validate($_POST['Age']);
	$Address = validate($_POST['Address']);
	$Gender = validate($_POST['Gender']);
	$Chosen_Email = validate($_POST['Chosen_Email']);
	$Email = validate($_POST['Email']);
	$Password = validate($_POST['Password']);
	
	$sql1 = "SELECT `signin_id` FROM `signin` WHERE Email='$Chosen_Email'";
	
	
	$result = $conn->query($sql1);
	
	while($row = $result->fetch_assoc()){
			
		$signin_id = $row["signin_id"];
	}	

	
	$sql2 = "UPDATE signin SET email='$Email', password='$Password', User='patient' WHERE signin_id='$signin_id'";
	
	
	$conn->query($sql2);	

	$sql3 = "UPDATE patient SET patient_name='$Name', patient_gender='$Gender', patient_age='$Age', patient_address='$Address' WHERE signin_id='$signin_id'";
	
	
	if(!$conn->query($sql3)){
		echo "Not Updated";
	}
	else{
		echo "Updated";
	}

	
	
}


?>