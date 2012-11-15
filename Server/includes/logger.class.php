<?php
class Logger{
	private $path = "./";
	private $ext = ".log";
	private $format = "date";
	private $format_value = "Ymd";
	private $linebreak = "\r\n";
	private $timezone = 0;
	private $mode = "file";//file or database
	private $db = null; //db object
	private $table = "log";
	
	public function __construct($options=null){
		if(!empty($options)){
			$vars=get_class_vars('Logger');
			foreach($options as $key => $value){
				if(isset($vars[$key])){
					$this->__set($key,$value);
				}
			}
		}
	}
	
	public function write($text,$type='INFO',$text=''){
		if($this->mode=="db" && $this->db!=null){
			$data=array(
				"type"=>$type,
				"content"=>$text,
				"dateline"=>time(),
				"ip"=>$this->ip()
			);		
			$this->db->insert($this->table,$data);		
		}
		else{
			if($text!="")$this->format="custom";
			$file=$this->file_name($text);		
			$content="[$type]\t".date("Y-m-d H:i:s",$this->time())."\t".$this->ip()."\t".nl2br($text).$this->linebreak;
			if(strstr($this->ext,".php") && !file_exists($file)){
				$content="<?php exit(); ?>".$this->linebreak.$content;
			}
			$this->save($file,$content,"a");
		}
	}
	
	public function save($file,$content,$mode='w'){
		$handle=fopen($file,$mode);
		fwrite($handle,$content);
		fclose($handle);
	}
	
	private function __set($k,$v){
		$this->$k=$v;
	}
	private function __get($k){
		return isset($this->$k) ? $this->$k : null;
	}
	
	private function ip(){	
		if (getenv('HTTP_CLIENT_IP')) {
			$ip = getenv('HTTP_CLIENT_IP');
		}
		elseif (getenv('HTTP_X_FORWARDED_FOR')) {
			$ip = getenv('HTTP_X_FORWARDED_FOR');
		}
		elseif (getenv('HTTP_X_FORWARDED')) {
			$ip = getenv('HTTP_X_FORWARDED');
		}
		elseif (getenv('HTTP_FORWARDED_FOR')) {
			$ip = getenv('HTTP_FORWARDED_FOR');
		}
		elseif (getenv('HTTP_FORWARDED')) {
			$ip = getenv('HTTP_FORWARDED');
		}
		else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		if(strstr($ip,","))$ip = substr($ip,0,strpos($ip,","));
		return $ip;
	}
	
	private function time(){
		return time()+(3600*$this->timezone);
	}
	
	private function file_name($text=''){
		if($this->format=="date"){
			$filename=date($this->format_value);
		}
		elseif($this->format=="time"){
			$filename=time();
		}
		elseif($this->format=="custom"){
			$filename="";
		}
		else{
			$filename=md5(uniqid(rand(), true));
		}
		return $this->path.$filename.$text.$this->ext;
	}
	
}
?>