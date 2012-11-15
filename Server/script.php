<?php
include("common.php");
if($_GET['extid']!=""){
	$file="init.js";
	header("Content-type:application");
	header("Content-Disposition: attachment; filename=".$file);	
	readfile(PATH."/js/init.js");
	exit(0);
}
?>