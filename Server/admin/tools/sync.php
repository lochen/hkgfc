<?php
/**
 * Sync data
 */
require("../global.php");
if(isset($_POST['action'])){
	$data=array(
		"extid"=>$_POST['extid'],
		"username"=>$_POST['username'],
		"email"=>md5($_POST['email']),
		"action"=>"put"
	);
	sync($data);
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

if($_GET['action']=="generate"){
	$info=array(
		"extid"=>md5(uniqid(rand(), true)),
		"username"=>"Name-".time(),
		"email"=>md5(uniqid(rand(), true))
	);
}

echo $file=INCLUDES_PATH."templates/header.tpl.php";
echo file_exists($file);

print_r(get_included_files());
exit;
?>
<?php include(ADMIN_PATH."templates/header.tpl.php"); ?>
	
<div class="row">
	<div class="span12">
		<div class="box">
		<?=$message;?>
		<form id="sync_form" name="sync_form" method="post" class="confirm">
		<table class="table table-bordered table-title">
			<tr><td>Extension id</td><td><input type="text" name="extid" value="<?=$info['extid'];?>"><td></tr>
			<tr><td>Username</td><td><input type="text" name="username" value="<?=$info['username'];?>"><td></tr>
			<tr><td>Email</td><td><input type="text" name="email" value="<?=$info['email'];?>"><td></tr>
			<tr><td colspan="2">
			<input type="hidden" name="action" value="sync">
			<input type="submit" value="Sync" class="btn btn-primary">
			<input type="button" id="generate" value="Generate" class="btn">
			<td></tr>
		</table>
		</div>
		</form>
		<script type="text/javascript">
			$("#generate").click(function(){
				document.location=document.location+'?action=generate';
			});
		</script>
	</div>
</div>		
<?php include(ADMIN_PATH."templates/footer.tpl.php"); ?>