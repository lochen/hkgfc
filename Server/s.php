<?php
function sync_request($url,$data){
global $config, $db;

	//$url="http://hkgfc.aws.af.cm/sync.php";
	$useragent='Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
	echo $url;
	print_r($data);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_ENCODING ,'gzip');
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	$result = curl_exec($ch);
	//$content="SYNC POST to: ".$url;
	//$content.="\t".http_build_query($data);
	//$content.="\tResult: ".$result;
	//$db->insert("logging",array("type"=>"SYNC","content"=>$content,"dateline"=>time()));
	//print_r($result);
	
	print_r($result);
	//close connection
	curl_close($ch);
}

$name="@".time();
$d=array(
	'extid'=>'nmgmnbpbbfpifhgcfidopmmmomfbnhin',
	'email'=>'ff94ded2d831acf8ff1ed19d4d43b74b',
	'username'=>"ABCDEFGZYX",
	'action'=>'put'
);
print_r($d);
sync_request("http://hkgfc.aws.af.cm/sync.php",$d);
?>
<!--
<form action="sync.php" method="post">

<input type="text" name="extid" value="nmgmnbpbbfpifhgcfidopmmmomfbnhin">
<input type="text" name="email" value="ff94ded2d831acf8ff1ed19d4d43b74b">
<input type="text" name="username" value="ASGFDS">
<input type="text" name="action" value="put">
<input type="submit" value="SYNC">
</form>
-->