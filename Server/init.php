<?php
include("common.php");
if($_GET['q']!=""){
	$q=trim($_GET['q']);
	$query=$db->query("SELECT * FROM account WHERE extid='$q'");
	if($info=$db->fetch_array($query)){
		$content=file_get_contents(PATH."/js/init.js");
		$content=str_repalce('var hkgfc_extid="";','var hkgfc_extid="'.$info['extid'].'";',$content);
		echo $content;
	}	
}
else{
	exit(json_encode(array('status'=>400,'error'=>'Invalid params')));
}
?>