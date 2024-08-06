<?php

$server = "localhost";
$username = "root";
$password = "";
$database = "telehealth";
$conn = new mysqli($server, $username, $password, $database);

if(!$conn){
	die("Connection failed: ". $conn->connect_error);
}

?>