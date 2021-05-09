<?php
abstract class Controller{
	
	public function generatePage(){
		require_once("View/Twig/lib/Twig/Autoloader.php");
		Twig_Autoloader::register();
		$loader = new Twig_Loader_Filesystem(array('View/Templates','View/MasterPages'));
		$twig=new Twig_Environment($loader,array('cache'=>false, 'charset'=>'utf-8'));
		return $twig;
	}

}