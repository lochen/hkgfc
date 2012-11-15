<?php
/**
 * Common
 */
error_reporting(E_ERROR | E_WARNING | E_PARSE);
session_start();
define("PATH",dirname(__FILE__)."/");
define("INCLUDES_PATH",PATH."includes/");
define("ADMIN_PATH",PATH."admin/");

//echo PATH;
//if(extension_loaded('zlib')){
	//ob_start('ob_gzhandler');
//}

include(PATH."/config.php");
include(INCLUDES_PATH."/function.php");
include(INCLUDES_PATH."/db.class.php");
include(INCLUDES_PATH."/logger.class.php");

//appfog env

$services = getenv("VCAP_SERVICES");
$services_json = json_decode($services,true);
$appfog_mysql = $services_json["mysql-5.1"][0]["credentials"];
if($appfog_mysql){
	$config['db']['host']=$appfog_mysql['hostname'];
	$config['db']['port']=$appfog_mysql['port'];
	$config['db']['user']=$appfog_mysql['user'];
	$config['db']['password']=$appfog_mysql['password'];
	$config['db']['name']=$appfog_mysql['name'];
}
$db = new DB($config['db']['host'],$config['db']['user'],$config['db']['password'],$config['db']['name'],$config['db']['charset'],$config['db']['prefix']);
$db->connect();

$logger_option=array('path'=>PATH."data/log/",'timezone'=>$config['timezone']);
if($config['log']=="database"){
	$logger_option['mode']='database';
	$logger_option['table']='logging';
	$logger_option['db']=$db;
}
$logger = new Logger($logger_option);

?>