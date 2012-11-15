<?php
include("../common.php");
$config['admin']['username']="admin";
$config['admin']['password']="asd852hk";
$config['admin']['timeout']=(60*15);

if($_GET['action']=="logout"){
	$_SERVER['PHP_AUTH_USER']="";
	$_SERVER['PHP_AUTH_PW']="";
	//header("Location: ./?action=auth");
	authenticate();
	exit();
}

function authenticate() {
    header('WWW-Authenticate: Basic realm="HKGFC Authentication System"');
    header('HTTP/1.0 401 Unauthorized');
    echo "You must enter a valid login ID and password to access this resource\n";
    exit;
}
if (!isset($_SERVER['PHP_AUTH_USER'])) {
    authenticate();
}

?>