<?php
/**
 * Database class(MySQL)
 *
 * @version 1.0
 * @date 2012
 */
class DB{
	private $dbhost;
	private $dbuser;
	private $dbpwd;	
	private $dbname;
	private $connectid;
	private $query_result;
	private $querynum=0;
	private $utf8;
	private $charset;
	private $sql_str;
	private $save_sql=false;
	public $option =array(
		'escape_string'=>'0',
		'url'=>'',
		'report_email'=>'1',
		'report_email_addr'=>'',
		'report_email_smtp'=>'',
		'report_email_port'=>'',
		'debug'=>'1',
		'save_error'=>'0',
		'save_path'=>'./log',
	);	
	protected static $instance;
	public $prefix;
	public $allsql;
	
	/**
	 * Contructor
	 *
	 * @param	array	$config	db config
	 */
	/*public function __construct($config=array()){
		$args=func_get_args();
		if(count($args)==1){
			unset($args);
			$args=array_values($config);
		}		
		if(!empty($args))eval('$this->DB('.implode(', ', $args).');');
	}
	*/
	/**
	 * Init
	 *
	 * @param	string	$host	host
	 * @param	string	$user	user
	 * @param	string	$pwd	password
	 * @param	string	$name	database name
	 * @param	string	$utf8	use utf8 charset
	 * @param	string	$prefix	table prefix
	 * @param	array	$option	option
	 */
	public function DB($host,$user,$pwd,$name,$utf8='',$prefix='',$option=null){
		$this->dbhost=$host;
		$this->dbuser=$user;
		$this->dbpwd=$pwd;	
		$this->dbname=$name;
		$this->prefix=$prefix;
		if($utf8!=""){
			$this->utf8=$utf8;
			$this->charset="utf8";
		}
		self::$instance=$this;
		if($option!=null)$this->option=array_merge($this->option,$option);
	}

	/**
	 * Database connect
	 *
	 * @param	boolean	$test	test connection
	 * @return	int
	 */
	public function connect($test=false) {
		$connectid=@mysql_connect($this->dbhost,$this->dbuser,$this->dbpwd);
		if (!$connectid) {
			if($test) return false;
			else $this->error_msg("Could not connect to the MySQL server.");
		}
		else{
			$this->connectid=$connectid;			
			mysql_select_db($this->dbname);
			if($test) return true;
		}
		if($this->charset!=''){
			$this->set_charset($this->charset);
		}
		return $this->connectid;
	}
	
	/**
	 * Set charset
	 *
	 * @param	string	$charset
	 */
	public function set_charset($charset){	
		mysql_query("SET NAMES ".$charset, $this->connectid);
		mysql_query("SET character_set_connection ".$charset, $this->connectid);
		mysql_query("SET character_set_results ".$charset, $this->connectid);
	}
   
	/**
	 * Select database
	 *
	 * @param	string	$dbname	select database
	 */
	public function database($dbname){
		mysql_select_db($dbname);
		$this->dbname=$dbname; 
	}
	
	public function get_instance(){	
		if( self::$instance === NULL ) {
		self::$instance = new self();
		}
		return self::$instance;
	}
   
	/**
	 * Get current database name
	 *
	 * @return	string
	 */
	public function currentdb(){
		return $this->dbname;   
	}
   
	/**
	 * Get connection id
	 *
	 * @return	int
	 */
	public function connectid(){
		return $this->connectid;   
	}
   
	/**
	 * Close connection
	 *
	 */
	public function close() {
		@mysql_close($this->connectid);
	}
   
	/**
	 * Get field name
	 *
	 * @param	string	$offset
	 * @param	int	$id
	 * @return	array
	 */
	public function field_name($offset,$id='') {
       if (empty($id)){
           return @mysql_field_name($this->query_result, $offset);
       }else{
           return @mysql_field_name($id, $offset);
       }
	}
   
	/**
	 * Fetch array result
	 *
	 * @param	resource	$query	result resource
	 * @param	int	$result_type	result type
	 * @return	array
	 */
	public function fetch_array($query, $type = MYSQL_ASSOC) {
		return mysql_fetch_array($query, $type);
	}
	
	/**
	 * Fetch array result
	 *
	 * @param	resource	$query	result resource
	 * @return	object
	 */
	public function fetch_object($query){
		return mysql_fetch_object($query);
	}

	/**
	 * Execute SQL
	 *
	 * @param	string	$sql	sql string
	 * @param	string	$type	execute type
	 * @return	resource
	 */
	public function query($sql, $type = '') {
		$func = $type == 'UNBUFFERED' && @function_exists('mysql_unbuffered_query') ?
			'mysql_unbuffered_query' : 'mysql_query';
			
		if(!($this->query_result = $func($sql, $this->connectid)) && $type != 'SILENT') {
			$this->error_msg('MySQL Query Error '.$this->error(), $sql);
		}
		
		if($this->save_sql){
			$file=$this->option['save_path']."/".date("Ym")."_sql.exec.php";
			if(!file_exists($file))$txt="<?php exit(); ?>\n";
			$handle=fopen($file,"a");
			fwrite($handle,$txt.date("Y-m-d H:i:s O")."\t".$sql."\n");
			fclose($handle);
		}
		$this->sql_str=$sql;
		$this->allsql.=$sql."\r\n";
		$this->querynum++;
		return $this->query_result;
	}

	/**
	 * Get affected rows
	 *
	 * @return	int
	 */
	public function affected_rows() {
		return mysql_affected_rows();
	}

	/**
	 * Get error
	 *
	 * @return	string
	 */
	public function error() {
		return mysql_error();
	}

	/**
	 * Get error number
	 *
	 * @return	int
	 */
	public function errno() {
		return intval(mysql_errno());
	}

	/**
	 * Get result
	 *
	 * @param	resource	$query	result resource
	 * @param	int	$row	result row number
	 * @return	array
	 */
	public function result($query, $row) {
		$query = @mysql_result($query, $row);
		return $query;
	}

	/**
	 * Get number of row
	 *
	 * @param	resource	$query	result resource
	 * @return	int
	 */
	public function num_rows($query) {
		$query = mysql_num_rows($query);
		return $query;
	}

	/**
	 * Get number of field
	 *
	 * @param	resource	$query	result resource
	 * @return	int
	 */
	public function num_fields($query) {
		return mysql_num_fields($query);
	}

	/**
	 * Release memory
	 *
	 * @param	resource	$query	result resource
	 * @return	boolean
	 */
	public function free_result($query) {
		return mysql_free_result($query);
	}
	
	/**
	 * Get query result
	 *
	 * @param	resource	$query	result resource
	 * @return	array
	 */
	public function fetch_assoc($query){
		return mysql_fetch_assoc($query);	
	}
	
	/**
	 * Move internal result pointer
	 *
	 * @param	resource	$query	result resource
	 * @return	boolean
	 */
	public function data_seek($query,$i){
		return mysql_data_seek($query,$i);
	}
	
	/**
	 * Get the ID generated in the last query
	 *
	 * @return	int
	 */
	public function insert_id() {
		$id = mysql_insert_id();
		return $id;
	}

	/**
	 * Get a result row as an enumerated array
	 *
	 * @param	resource	$query	result resource
	 * @return	array
	 */
	public function fetch_row($query) {
		$query = mysql_fetch_row($query);
		return $query;
	}
		
	/**
	 * Get column information from a result and return as an object
	 *
	 * @param	resource	$query	result resource
	 * @return	object
	 */
	public function fetch_field($query){
		return mysql_fetch_field($query);
	}

	/**
	 * Get MySQL server info
	 *
	 * @return	string
	 */
	public function version() {
		return mysql_get_server_info();
	}

	/**
	 * Get connection info
	 *
	 * @return	string
	 */
	public function connecting_info(){
		echo "<BR>".$this->dbhost;
		echo "<BR>".$this->dbuser;
		echo "<BR>".$this->dbpwd;
		echo "<BR>".$this->dbname;
		echo "<BR>".$this->prefix;
	}
	
	/**
	 * Get query total
	 *
	 * @return	int
	 */
	public function get_querynum(){
		return $this->querynum;
	}
	
	public function get_current_sql(){
		return $this->sql_str;
	}
	/**
	 * Display all sql
	 *
	 * @param	boolean	$return	return/echo the sql
	 * @return	string
	 */
	public function display_allsql($return=false){
		if($return) return $this->allsql;
		else echo str_replace("\n\r","<br /><br />",$this->allsql);
	}
	
	/**
	 * Check table exist
	 *
	 * @param	string	$table table name
	 * @return	string
	 */
	public function check_table($table){
		$query = $this->query("SHOW TABLES LIKE '$table'");
		if($this->result($query,0))return true;		
	}
	
	/**
	 * Delete record
	 *
	 * @param	string	$table table name
	 * @param	string	$condition	condition
	 * @param	boolean	$prefix	use prefix
	 * @return	boolean
	 */
	public function delete($table,$condition,$prefix=false){
		$table=$this->build_table($table,$prefix);		
		if(is_array($condition)){
			foreach($condition as $key => $value){
				$value=$this->parse_value($value);
				//print_pre($value);
				if($value==="NULL"){
					//print_pre("Nll");
					$tmp.="$key IS NULL AND ";
				}
				else{
					$tmp.="$key=$value AND ";
				}
			}
			$where='WHERE '.trim($tmp," AND ");
		}
		elseif(is_string($condition)){
			$where='WHERE '.$condition;
		}
		$sql="DELETE FROM {$table} {$where}";
		$this->query($sql);
		if($this->affected_rows())return true;
		else return false;
	}
	
	/**
	 * Update record
	 *
	 * @param	string	$table	table name
	 * @param	string	$id	field id value
	 * @param	array	$data	data
	 * @param	string	$field	field name
	 * @param	string	$condition	condition
	 * @param	boolean	$prefix	use prefix
	 * @return	boolean
	 */
	public function update($table,$id,$data,$field='id',$condition=array(),$prefix=false){
		if(!is_array($data) || empty($data) || $table==null)return false;
		$table=$this->build_table($table,$prefix);		
		foreach($data as $key => $value){
			$value=$this->parse_value($value);
			$content[]="$key=$value";
		}
			
		$where=$this->build_where($condition);
		/*
		if($condition){
			$where="WHERE $field='$id'";
			if(is_array($id))$where="WHERE $field IN (".$this->build_implode($id).")";
		}*/
		
		
		$sql="UPDATE {$table} SET ".implode(", ",$content)." $where";
		$this->query($sql);
		if($this->affected_rows())return true;
		else return false;
	}
	
	/**
	 * Insert record
	 * @param	
	 * @param	string	$table	table name
	 * @param	array	$data	data
	 * @param	boolean	$multi	multi data insert
	 * @param	boolean	$prefix	use prefix
	 * @return	boolean
	 */
	public function insert($table,$data,$multi=false,$prefix=false){
		if(!is_array($data) || empty($data) || $table==null)return false;
		$table=$this->build_table($table,$prefix);		
		$field=$value=array();
		$sql="INSERT INTO {$table} ";
		if($multi){
			$field=$data['field'];
			$tmp=$data['value'];
			unset($data);
			$data=$tmp;
		}
		
		foreach($data as $key => $val){
			if($multi){
				foreach($val as $k => $v){
					//if(!is_scalar($v))continue;
					$val[$k]=$this->parse_value($v);
				}
				$value[]=$val;
			}
			else{
				//if(!is_scalar($val))continue;
				$field[]=$key;
				$value[]=$this->parse_value($val);
			}
		}
		if($multi){
			$sql.="(`".implode("`,`",$field)."`) VALUES ";
			foreach($value as $key => $val){
				$tmp_value[]="(".implode(",",$val).")";
			}
			$sql.=implode(",",$tmp_value);
		}
		else{
			$sql.="(`".implode("`,`",$field)."`) VALUES (".implode(",",$value).")";
		}
		$this->query($sql);	
		return $this->insert_id();
	}
	
	/**
	 * Fetch all result
	 *
	 * @param	array	$option	table, field, join, condition, group, having, order, limit, offset, count, pagination, pagenum, prefix
	 * @return	array
	 */
	//public function fetch_all($table,$condition=array(),$order=array(),$num=10,$offset=0,$total=false,$prefix=false){
	public function fetch_all($option=array()){
		$default=array(
			'table'=>'',
			'field'=>'*',
			'join'=>array(),
			'condition'=>array(),
			'group'=>array(),
			'having'=>array(),
			'order'=>array(),
			'limit'=>0,
			'offset'=>0,
			'count'=>false,
			'pagination'=>false,
			'pagenum'=>1,
			'prefix'=>false
		);
	
		$option=array_merge($default,$option);
		
		$field=$option['field'];
		$table=$this->build_table($option['table'],$option['prefix']);
		$join=$this->build_join($option['join']);
		$where=$this->build_where($option['condition']);	
		$groupby=$this->build_orderby($option['group']);
		$having=$this->build_where($option['having']);	
		$orderby=$this->build_orderby($option['order']);	
		$limit=$this->build_limit($option['offset'],$option['limit']);
		
		/*$table=$this->build_table($table,$prefix);
		$field=isset($this->select_field)?$this->select_field:'*';		
		$where=$this->build_where($condition);		
		$orderby=$this->build_orderby($order);
		$limit=$this->build_limit($offset,$num);
		
		
		$join=$this->build_join($this->join);
		*/
		
		if($option['count'] || $option['pagination']){
			$count=$this->count($table,$condition,$prefix);
		}
		
		if($option['pagination']){
			if($option['limit']==0)$option['limit']=10;
			$option['pagetotal']=ceil($count/$option['limit']);
			if($option['pagenum']>0)$option['offset'] = ($option['pagenum']-1)*$option['limit'];
			else $option['offset'] = 0;
			$limit=$this->build_limit($option['offset'],$option['limit']);		
		}
		
		$sql="SELECT {$field} FROM {$table}{$join}{$where}{$groupby}{$having}{$orderby}{$limit}";
		
		
		$result=$this->query($sql);
		while($row=$this->fetch_assoc($result)){
			$data[]=$row;
		}
		
		if($option['count'] || $option['pagination']){
			$info=array('data'=>$data,'total'=>$count);
			if($option['pagination']){
				$info['pagenum']=$option['pagenum'];
				$info['pagetotal']=$option['pagetotal'];
			}
			return $info;
		}
		else{
			return $data;
		}
	}
	
	/**
	 * Fetch one result
	 *
	 * @param	string	$table	table name
	 * @param	array	$condition	condition
	 * @param	array	$order	order by
	 * @param	boolean	$prefix	use prefix
	 * @return	array
	 */
	//public function fetch_one($table,$condition=array(),$order=array(),$offset=0,$prefix=false){
	public function fetch_one($option=array()){
		//$table,$condition=array(),$order=array(),$offset=0,$prefix=false){
		//return $this->fetch_all($table,$condition,$order,1,$offset);
		//$table,$condition,$order,1,$offset
		
		$option['limit']=1;
		//print_pre($option);
		return $this->fetch_all($option);
	}
	
	/**
	 * Fetch result by row
	 *
	 * @param	string	$table	table name
	 * @param	int	$row	row number to get
	 * @param	array	$condition
	 * @param	array	$order	order by
	 * @param	int	$num	limit num
	 * @param	int	$offset	limit offset
	 * @param	boolean	$prefix	use prefix
	 * @return	array
	 */
	public function fetch_result($table,$row=0,$condition=array(),$order=array(),$num=10,$offset=0,$prefix=false){
		$table=$this->build_table($table,$prefix);
		$field=isset($this->select_field)?$this->select_field:'*';		
		$where=$this->build_where($condition);		
		$orderby=$this->build_orderby($order);
		$limit=$this->build_limit($offset,$num);
		$sql="SELECT {$field} FROM {$table} {$where} {$orderby} {$limit}";
		$result=$this->query($sql);
		return $this->result($result,$row);
	}
	
	/**
	 * Count the result
	 *
	 * @param	string	$table table name
	 * @param	array	$condition	condition
	 * @param	boolean	$prefix	use prefix
	 * @return	int
	 */
	public function count($table,$condition=array(),$prefix=false){
		$count=0;
		$table=$this->build_table($table,$prefix);
		$where=$this->build_where($condition);
		$sql="SELECT COUNT(*) FROM {$table} {$where}";
		if(strstr($where,'GROUP BY')){
			$sql="SELECT COUNT(*) FROM ({$sql}) c";
		}
		$result=$this->query($sql);
		$count=$this->result($result,0);
		return $count;
	}
	
	/**
	 * Set select field
	 *
	 * @param	mixed	$field	table field
	 */	
	public function set_field($field=array()){
		if(is_array($field) && !empty($field)){
			$field=implode(",",$field);
		}
		elseif(!is_string($field)){
			$field='*';
		}
		$this->select_field=$field;
	}
	
	/**
	 * Set option
	 *
	 * @param	array	$option	option setting
	 * @return	array
	 */
	public function set_option($option=array()){
		return $this->option=array_merge($this->option,$option);
	}	
	 
	/**
	 * Parse data value
	 *
	 * @param	array	$value
	 * @return	array
	 */
	public function parse_value($value){
		//print_pre($this->option);
		if (is_numeric($value))$value = $value;
		elseif(is_null($value))$value = 'NULL';
		elseif(is_string($value)) $value="'".((!$this->option['escape_string'])?$this->escape_string($value):$value)."'";
		return $value;
	}
	
	/**
	 * Build table with prefix
	 *
	 * @param	array	$table table name
	 * @param	boolean	$prefix	user prefix
	 * @return	string
	 */
	public function build_table($table,$prefix=false){
		return ($prefix)?$this->prefix.$table:$table;
	}
	
	/**
	 * Build where
	 *
	 * @param	array	$field
	 * @return	string
	 */
	public function build_where($field=array()){	
		$where='';
		if(!empty($field) && is_array($field)){
			//$where='WHERE ';
			foreach($field as $key => $value){
				$temp[]=$key.'='.$this->parse_value($value);
			}
			$where=' WHERE '.implode(' AND ',$temp);
		}
		elseif(is_string($field)){
			$where=' WHERE '.$field;
		}
		return $where;
	}
	
	/**
	 * Build order by
	 *
	 * @param	array	$order	order by
	 * @return	string
	 */
	public function build_orderby($order=array()){
		$orderby='';
		if(!empty($order) && is_array($order)){
			$temp=array();
			foreach($order as $key => $value){
				//$temp[]=$value['field'].' '.$value['sort'];
				$temp[]=$key.' '.$value;
			}			
			$orderby=' ORDER BY '.implode(', ',$temp);
		}
		elseif(is_string($order)){
			$orderby=' ORDER BY '.$order;
		}
		return $orderby;
	}
	
	/**
	 * Build limit
	 *
	 * @param	int	$start	limit start
	 * @param	int	$num	limit end
	 * @return	string
	 */
	public function build_limit($start=0,$num=null){
		if($start==0 && ($num===null || $num==0))return '';
		if($start==0 && $num==1){
			$limit=' LIMIT 1';
		}
		else{
			$limit=' LIMIT '.abs($start).', '.abs($num);
		}
		return $limit;
	}
	
	/**
	 * Build join
	 *
	 * @param	int	$start	limit start
	 * @param	int	$num	limit end
	 * @return	string
	 */
	public function build_join($join=null){
		$str='';
		if(is_array($join) && !empty($join)){
			foreach($join as $value){
				if(strstr($join,'LEFT JOIN') || strstr($join,'RIGHT JOIN'))$str.=' '.trim($join);
				else $str.=' LEFT JOIN '.trim($join);
			}
		}
		elseif(is_string($join)){
			if(strstr($join,'LEFT JOIN') || strstr($join,'RIGHT JOIN'))$str=' '.trim($join);
			else $str=' LEFT JOIN '.trim($join);
			
		}
		return $str;
	}
	
	public function set_join($join){
		$this->join=$join;
	}
	
	/**
	 * Escape string
	 *
	 * @param	string	$str
	 * @return	string
	 */
	public function escape_string($str){
		if(is_array($str) && !empty($str)){
			foreach($str as $key => $value){
				$str[$key]=$this->escape_string($value);
			}
			return $str;
		}	
		if(function_exists('mysql_real_escape_string')){
			$str=@mysql_real_escape_string($str);
		}
		elseif(function_exists('mysql_escape_string')){
			$str=@mysql_escape_string($str);
		}
		else{
			$str=addslashes($str);
		}
		return $str;
	}
	
	/**
	 * Build implode data
	 *
	 * @param	array	$data	
	 * @return	string
	 */
	public function build_implode($data){
		if(is_array($data))return "'".implode("','",$data)."'";
		else return "'".trim($data)."'";
	}
	
	/**
	 * Display error message
	 *
	 * @param	string	$message	error message
	 * @param	string	$sql	sql string
	 */
   	private function error_msg($message = '', $sql = '') {
		if($this->option['save_error']){		
			$this->save_error($message,$sql);
		}
		
		$errorinfo = "<p>System Error</p>";
		if($this->option['debug']){
			$errorinfo .= "<p>Times: ".date("Y-m-d H:i:s O")."</p>";
			$errorinfo .=  "<p>Script: ".$_SERVER['SCRIPT_NAME']."</p>";
			$errorinfo .=  "<p>Info: ".$message."</p>";
			$errorinfo .=  "<p>Sql: ".$sql."</p>";
		}
		
		if($this->option['report_email']){
			$subject="[SYSTEM]SQL ERROR REPORT[".$this->option['url']."]";
			$content .= "<p>Host: ".$this->option['url']."</p>";
			$content .= "<p>Times: ".date("Y-m-d H:i:s O")."</p>";
			$content .=  "<p>Script: ".$_SERVER['SCRIPT_NAME']."</p>";
			$content .=  "<p>Path Info: ".$_SERVER['PATH_INFO']."</p>";
			$content .=  "<p>Query String: ".$_SERVER['QUERY_STRING']."</p>";
			$content .=  "<p>Error: ".$message."</p>";
			$content .=  "<p>Sql: ".$sql."</p>";
			$headers = "From: ".$this->option['report_email_addr']."\nMIME-Version: 1.0\nContent-type: text/html; charset=utf-8\nContent-Transfer-Encoding: 8bit\n";
			@mail($this->option['report_email_addr'], $subject, $content, $headers);
			if($this->option['debug'])$errorinfo .=  "<p>Error reported to: ".$this->option['report_email_addr']."</p>";
		}

		echo $errorinfo .=  "<p><a href=\"javascript:history.back();\">Back</a></p>";
		exit;
	}
	
	/**
	 * Save error
	 *
	 * @param	string	$message	error message
	 * @param	string	$sql	sql string
	 */
	private function save_error($message,$sql){
		if(!is_dir($this->option['save_path'])){
			mkdir($this->option['save_path']);
		}
		$file=$this->option['save_path']."/".date("Ym")."_sql.log.php";
		
		if(!file_exists($file))$logcontent="<?php exit(); ?>\n";
		$logcontent.="[ERROR]\t".date("Y-m-d H:i:s O")."\t".$this->get_ip()."\t".$_SERVER['PHP_SELF']."\t".$message."\t".$sql."\r\n";
			
		if (!$handle = fopen($file, 'a')) {
			echo "Cannot open file ($file)";
			exit;
		}
		if (fwrite($handle, $logcontent) === FALSE) {
			echo "Cannot write to file ($file)";
			exit;
		}
		fclose($handle);
	}
	
	/**
	 * Get ip address
	 *
	 * @return	string
	 */
	private function get_ip(){
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
		return $ip;
	}
	
	/**
	 * Execute sql file
	 *
	 * @param	string	$file	file name
	 * @param	boolean	$force
	 * @return	boolean
	 */
	public function execute_sql($file,$force=false){
		if(!file_exists($file))return false;
		$sqldump="";
		if(@$fp = fopen($file, 'rb')) {
			$sqldump .= fread($fp, filesize($file));
			fclose($fp);
		}
		
		$sql = str_replace("\r", "\n", $sqldump);
		$ret = array();
		$num = 0;
		$queriesarray = explode(";\n", trim($sql));
		unset($sql);
		foreach($queriesarray as $query) {
			$queries = explode("\n", trim($query));
			foreach($queries as $query) {
				$ret[$num] .= $query[0] == "#" ? NULL : $query;
			}
			$num++;
		}
		
		if(!empty($ret)){
			$pattern='/CREATE TABLE\s+`([a-z\-\_]+)`/i';
			$i=0;
			foreach($ret as $sql) {
				if(trim($sql) != '') {
					if(preg_match($pattern,$sql,$match)){
						$table_name=$this->prefix.$match[1];
						if($this->check_table($table_name)){
							continue;
						}
					}
					$sql=preg_replace($pattern,"CREATE TABLE `".$this->prefix."$1`",$sql);
					$this->query($sql);
					$i++;
				}
			}//foreach
			$this->execute_sql_total=$i;
		}
		return true;		
	}
	
	/**
	 * Drop table
	 *
	 * @param	string	$table	table name
	 * @param	boolean	$prefix	user prefix
	 * @return	boolean
	 */
	public function drop_table($table,$prefix=false){
		if(!is_array($table) || empty($table))return;
		//print_pre($table);
		$sql="DROP TABLE IF EXISTS ";
		foreach($table as $name){
			if($name!=""){
				if($prefix)$sql.=$this->prefix.$name.",";
				else $sql.=$name.",";
			}
		}
		$this->query(trim($sql,","));
		return true;
	}
	
	/**
	 * Alter table field
	 *
	 * @param	string	$action	alter action
	 * @param	string	$table	table name
	 * @param	string	$field	field name
	 * @param	string	$datatype	field type
	 * @param	boolean	$default	default value
	 * @return	boolean
	 */
	public function alter_table_field($action,$table,$field,$datatype='varchar(50)',$default=false){
		if($default!==false)$default=" DEFAULT ".$default;
		if($action=="add"){
			//----check field exist----/
			$sql="SELECT * FROM {$this->prefix}$table";
			$query=$this->query($sql);
			$exist=false;
			$i=0;
			while ($i < $this->num_fields($query)) {
				$meta = $this->fetch_field($query);
				if($meta->name==$field){
					$exist=true;
					break;
				}
			$i++;
			}
			if($exist)return;
		
			$sql="ALTER TABLE {$this->prefix}$table ADD $field $datatype NOT NULL$default";
		}
		elseif($action=="drop"){
			$sql="ALTER TABLE {$this->prefix}$table DROP COLUMN $field";
		}
		elseif($action=="change"){
			$sql="ALTER TABLE {$this->prefix}$table CHANGE $field $datatype NOT NULL$default";
		}
		elseif($action=="modify"){
			$sql="ALTER TABLE {$this->prefix}$table MODIFY $field $datatype $default";
		}
		$this->query($sql);
		if(!$this->error())return true;
	}
	
	/**
	 * Dump table
	 *
	 * @param	string	$table	table name
	 * @param	resource	$fp	fopen resource
	 */
	public function dump_table($table, $fp=0){
		$tabledump = "DROP TABLE IF EXISTS $table;\n";      
		$result = $this->fetch_array($this->query("SHOW CREATE TABLE $table"));
		$tabledump .= $result[1] . ";\r\n";
		if ($fp) {
				fwrite($fp, $tabledump);
		} else {
				echo $tabledump;
		}
		// get data
		$rows = $this->query("SELECT * FROM $table");
		$numfields = $this->num_fields($rows);
		while ($row = $this->fetch_array($rows)) {
			$tabledump = "INSERT INTO $table VALUES(";
			$fieldcounter = -1;
			$firstfield = 1;
			// get each field's data
			while (++$fieldcounter < $numfields) {
				if (!$firstfield) {
						$tabledump .= ", ";
				} else {
						$firstfield = 0;
				}

				if (!isset($row[$fieldcounter])) {
						$tabledump .= "NULL";
				} else {
						$tabledump .= "'" . mysql_escape_string($row[$fieldcounter]) . "'";
				}
			}
			$tabledump .= ");\n";
			if ($fp) {
				fwrite($fp, $tabledump);
			} else {
				echo $tabledump;
			}
		}
		$this->free_result($rows);
	}
	
	public function table_field($name,$prefix=false){
		$result=$this->query("SHOW COLUMNS FROM ".$this->build_table($name,$prefix));
		$info=array();
		if($result){
			while($val = $this->fetch_assoc($result)){
				$info[$val['Field']] = array(
					'name'    => $val['Field'],
					'type'    => $val['Type'],
					'notnull' => $val['Null'],
					'default' => $val['Default'],
					'primary' => (strtolower($val['Key']) == 'pri'),
					'autoinc' => (strtolower($val['Extra']) == 'auto_increment'),
				);
			}
		}
		return $info;
	}
}
?>