<?php
include("common.php");
if($_COOKIE['hkgfc_login']){
	include(PATH."/templates/index.tpl.php");
}
else{
	include(PATH."/templates/login.tpl.php");
}
?>