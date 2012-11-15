<?php
/**
 * Sync data
 */
include("common.php");

if(isset($_POST['action'])){
	$status=400;
	$error='Invalid params';
	$time=time();
	$ip=get_ip();
	extract($_POST);				
	switch($action){
		case "put":
			$sql="SELECT * FROM account WHERE email='$email'";
			$query=$db->query($sql);
			if(!$info=$db->fetch_array($query)){
				$sql="INSERT INTO `account` (`extid`, `email`, `username`, `dateline`, `ip`, `uid`, `verify`) VALUES ('$extid', '$email', '$username', '$time', '$ip', 0, 1)";
				$db->query($sql);
				//$db->insert("logging",array("type"=>"INFO","content"=>"[SYNC]INSERT","dateline"=>$time,"ip"=>$ip));
				$status=200;
				$error='';
			}
			else{
				//$db->insert("logging",array("type"=>"INFO","content"=>"[SYNC]EXIST","dateline"=>$time,"ip"=>$ip));
				$status=201;
				$error='';
			}
			break;
		case "get":
			$sql="SELECT * FROM account WHERE email='$email'";
			$query=$db->query($sql);
			if($info=$db->fetch_array($query)){
				$status=200;
				$data=$info;
			}
			else{
				$status=404;
				$error="Data not found";
			}			
			break;
		case "set":
			break;	
	}
	$response=array('status'=>$status);//,'error'=>$error);
	if($error!='')$response['error']=$error;
	if($data)$response['data']=$data;
	
	$content="SYNC REQUEST FROM: ".$_SERVER['HTTP_REFERER']."\t".http_build_query($_POST)."\tRESPONSE: ".http_build_query($response);
	$db->insert("logging",array("type"=>"SYNC","content"=>$content,"dateline"=>$time,"ip"=>$ip));
	exit(json_encode($response));
}

function sync_request($url,$data){
global $config, $db, $logger;
	//$url="http://hkgfc.aws.af.cm/sync.php";
	$useragent='Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_ENCODING ,'gzip');
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_REFERER, $_SERVER['HTTP_HOST']);
	$result = curl_exec($ch);
	$content="SYNC POST to: ".$url;
	$content.="\t".http_build_query($data);
	$content.="\tResult: ".$result;
	$db->insert("logging",array("type"=>"SYNC","content"=>$content,"dateline"=>time()));
	//$logger->write($content,"SYNC");
	//print_r($result);
	
	curl_close($ch);
}


//Format: TEXT\tDATA\t
function sync($data){
global $db, $logger;
	$servers=json_decode(file_get_contents(PATH."server.json"));
	foreach($servers as $server){
		if($server!=$_SERVER['HTTP_HOST']){
			$tmp[]=$server;
		}
	}
	if(!empty($tmp)){
		$content="SYNC TO SERVER: ".implode(",",$tmp)."\t".http_build_query($data);
		$db->insert("logging",array("type"=>"SYNC","content"=>$content,"dateline"=>time()));
		//$logger->write($content,"SYNC");
		sleep(1);
		foreach($tmp as $server){
			sync_request("http://".$server."/sync.php",$data);
		}
	}
	else{
		$content="NO SERVER TO SYNC\t".http_build_query($data);
		$db->insert("logging",array("type"=>"SYNC","content"=>$content,"dateline"=>time()));
		//$logger->write($content,"SYNC");
	}
}

$name="---".time();
$extid=md5(uniqid(rand(), true));
$email=md5(uniqid(rand(), true));
$d=array(
	'extid'=>$extid,
	'email'=>$email,
	'username'=>$name,
	'action'=>'put'
);
sync($d);
?>