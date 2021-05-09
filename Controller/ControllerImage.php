<?php
require_once("Framework/Controller.php");

class ControllerImage extends Controller
{

	private $methodToExecute;
	public function __construct($method)
	{
		$this->methodToExecute = $method;
		switch ($this->methodToExecute) {
			
			case "resizeImage":
				$this->resizeImage();
				break;
			
			default:
				$this->displayLoginPage();
		}
	}

	


	public function displayLoginPage()
	{
		
		$template = $this->generatePage();
		
		$template->display('Welcome.php', array('success' => 'd-none', 'failure' => 'd-none'));
			
		
	}


	public function resizeImage(){
		$crop_option = $_POST['crop_option'];
		$template = $this->generatePage();

		if(isset($_FILES['image_to_resize']) && $_FILES['image_to_resize']['tmp_name']!="" ){
			require_once('Controller/ImageProcessor.php');
			$gi=new ImageProcessor();
			$gi->LoadFromPostMethod('image_to_resize','Uploads/resizedImages/');
				$feedback = false;	
				if($gi==true){

					if($crop_option == 'products'){
						if($gi->resizeHeightByWidth(300)){
							$feedback = true;
							$gi->save('Uploads/resizedImages/'.$gi->getName());
						}
					}
					else{
						if($gi->cropImageToSquare()){
							$feedback = true;
							$gi->save('Uploads/resizedImages/'.$gi->getName());
							
						}
						else{
							$template->display('Welcome.php', array('success' => 'd-none', 'failure' => '','feedback' => 'image already a square'));
						}
						
					}
						
				}
				if($feedback){
					$template->display('Welcome.php', array('success' => '', 'failure' => 'd-none'));
				}
		}
		else{
			$template->display('Welcome.php', array('success' => 'd-none', 'failure' => '','feedback' => 'Empty image'));
		}
	}

	
}