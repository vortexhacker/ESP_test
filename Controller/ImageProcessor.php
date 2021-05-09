<?php
class ImageProcessor{

private $type="";
private $allowedextensions=array('png','jpg','jpeg','gif');
private $allowedTypes=array('image/jpg','image/jpeg','image/pjpeg','image/png','image/gif');

private $image;
private $name;

public function __construct(){
}
public function loadImage($chemin){
	$info=getimagesize($chemin);
	$this->type=$info[2];
	
	if($this->type==IMAGETYPE_JPEG){
		$this->image=imagecreatefromjpeg($chemin);
	}
	elseif($this->type==IMAGETYPE_GIF){
		$this->image=imagecreatefromgif($chemin);
	}
	elseif($this->type==IMAGETYPE_PNG){
		$this->image=imagecreatefrompng($chemin);
	}
	if($this->type==IMAGETYPE_JPEG){
		$this->image=imagecreatefromjpeg($chemin);
	}
	
}

public function getWidth(){
	
	return imagesx($this->image);
	
}

public function getHeight(){
	
	return imagesy($this->image);
}

public function getName(){
	return $this->name;
}

public function resize($x,$y){
	
	$new_image=imagecreatetruecolor($x,$y);
	imagecopyresampled($new_image,$this->image,0,0,0,0,$x,$y,$this->getWidth(),$this->getHeight());
	$this->image=$new_image;
}

public function resizeWidthByHeight($height){
	$width=$this->getWidth()*($height / $this->getHeight());
	$this->resize($width,$height);
}

public function resizeHeightByWidth($width){
	$height=$this->getHeight()*($width / $this->getWidth());
	$this->resize($width,$height);
	return true;
}

public function resizeByPercentage($percentage){
	$width=$this->getWidth() * $percentage / 100;
	$height=$this->getHeight() * $percentage / 100;
	
}

public function cropImageToSquare($location='center'){
	$feedback = true;
	$width = $this->getWidth();
	$height = $this->getHeight();
	if($width == $height){
		$feedback = false;
	}
	else{
		$new_w = 250;
		$new_h = 250;
	
		$orig_w = $this->getWidth();
		$orig_h = $this->getHeight();
		$w_ratio = ($new_w / $orig_w);
		$h_ratio = ($new_h / $orig_h);
	
		if ($orig_w > $orig_h ) {//landscape
			$crop_w = round($orig_w * $h_ratio);
			$crop_h = $new_h;
		} elseif ($orig_w < $orig_h ) {//portrait
			$crop_h = round($orig_h * $w_ratio);
			$crop_w = $new_w;
		} else {//square
			$crop_w = $new_w;
			$crop_h = $new_h;
		}
		$dest_img = imagecreatetruecolor($new_w,$new_h);
		imagecopyresampled($dest_img, $this->image, 0 , 0 , 0, 0, $crop_w, $crop_h, $orig_w, $orig_h);
		$this->image=$dest_img;
		$feedback = true;
	}
	
	return $feedback;

}



public function LoadFromPostMethod($imagefield,$moveto,$prefix=""){
	
	if(is_uploaded_file($_FILES[ $imagefield ]['tmp_name'])){
		
		$i=strpos($_FILES[$imagefield]['name'],'.');
		if(! $i){
			return false;
		}
		else{
			$l = strlen($_FILES[$imagefield]['name'] ) - $i;
			$ext = strtolower (substr($_FILES[ $imagefield]['name'], $i+1, $l ) ); 
			
			if(in_array($ext,$this->allowedextensions)){
				if(in_array($_FILES[$imagefield] ['type'],$this->allowedTypes)){
					$name=str_replace( ' ', '', $_FILES[$imagefield]['name']);
					$this->name=$prefix . $name; 
					$path=$moveto . $prefix.$name; 
					$path=$moveto .$this->name;
					move_uploaded_file($_FILES[$imagefield]['tmp_name'],$path);
					$this->LoadImage($path);
					return true;
			}
			else{
				return false;
			}
			}
			else{
				return false;
			}
	
		}
	}
	
}


public function save($location,$type="",$quality=100){
	
	$type=($type == "") ? $this->type : $type;
	
	if($type==IMAGETYPE_JPEG){
		imagejpeg($this->image,$location,$quality);
	}
	elseif($type==IMAGETYPE_GIF){
		imagegif($this->image,$location);
	}
	elseif($type==IMAGETYPE_PNG){
		imagepng($this->image,$location);
	}
}
	
}