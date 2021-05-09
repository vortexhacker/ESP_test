<?php
require_once('Controller/ControllerImage.php');
$request="";
if(!empty($_POST['controller'])){
	$request = $_POST['controller'];
}
else{
	if(!empty($_GET['controller'])){
		$request = $_GET['controller'];
	}
}
new ControllerImage($request);


