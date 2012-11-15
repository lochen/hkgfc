<?php
/**
 * Verify HKG account
 */
include("common.php");
define("COOKIE_PATH",PATH."cookie/");

if(!is_dir(COOKIE_PATH)){
	mkdir(COOKIE_PATH,0777);
}

function hkglogin($email,$password,$server='m'){
	$cookie_file=COOKIE_PATH."cookie_".md5($email).".txt";
	if($server=='m'){
		$url="http://m.hkgolden.com/login.aspx";
	}
	else{
		$url="http://forum".$server.".hkgolden.com/login.aspx";
	}
	//echo $url;
	//curl init
	
	$useragent='Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
	
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch,CURLOPT_ENCODING ,'gzip');
	curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
	
	//params
	$v='/wEPDwUKMTc1OTczODAyN2QYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW4gsq3NTcEOUiqGgZPqVW/PCMGaXg==';
	$e='/wEWBQLI9+D8DwLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCLgG9vdHOljUTzr+ZlJSiBz0zk5a';
	$params=array(
		'__VIEWSTATE'=>$v,
		'__EVENTVALIDATION'=>$e,
		'ctl00$ContentPlaceHolder1$txt_email'=>$email,
		'ctl00$ContentPlaceHolder1$txt_pass'=>$password,
		'ctl00$ContentPlaceHolder1$cb_remember_login'=>'on',
		'ctl00$ContentPlaceHolder1$linkb_login'=>'µn¤J'
	);
	
	$data=http_build_query($params);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);
	if(preg_match("/logout\.aspx/i",$result,$match)){
		preg_match('/<div class="MobileTopPanel\_Right">(.*?)<\\/div>/ims',$result,$m);
		//print_r($match);
		$text=trim($m[1]);
		$pos=strpos(trim($m[1]),"[");
		$username=substr($text,0,$pos);
		return trim($username);
	}
	else{
		$result;
	}
}

if(isset($_POST['login'])){
	$email=trim($_POST['email']);
	$password=trim($_POST['password']);
	$md5_email=md5($email);
	
		$time=time();
	$logger->write("Verify account\t".$md5_email."\t".$_POST['extid']);
	$query=$db->query("SELECT * FROM account WHERE email='$md5_email'");
	if($info=$db->fetch_array($query)){
		$data=array(
			'status'=>201,
			'username'=>$info['username'],
			'time'=>$time,
			'extid'=>$_POST['extid'],
			'message'=>'Already verified',
		);	
		exit(json_encode($data));
	}
	else{
	if($username=hkglogin($email,$password)){
		$logger->write("Verify success\t".$username);
		$sql="INSERT INTO account (email,username,uid,ip,dateline) VALUES ";
		$sql.="('".$md5_email."','".$username."','0','".get_ip()."','".$time."')";
		$db->query($sql);
		$data=array(
			'status'=>200,
			'username'=>$username,
			'time'=>$time,
			'extid'=>$_POST['extid'],
		);
		exit(json_encode($data));
	}
	else{
		$logger->write("Verify fail\t");
		exit(json_encode(array('status'=>400,'error'=>'Verify fail, invalid email/password')));
	}
	}
}
else{
	//exit(json_encode($_POST));
}
?>