<?php
include("global.php");
$db_usage=0;
$query=$db->query("SHOW TABLE STATUS FROM {$config['db']['name']}");
while($table = $db->fetch_array($query)) {
	//if(preg_match($pattern,$table['Name'])){
	$db_usage = $db_usage + $table['Data_length'];
	$table['Data_length'] = bytes_size($table['Data_length']);
	$table['Index_length'] = bytes_size($table['Index_length']);
	$table['Data_free'] = bytes_size($table['Data_free']);
	$table['Create_time'] = datetime(strtotime($table['Create_time']),"Y-m-d H:i:s",$config['timezone']);
	$table_list[]=$table;	
	//}
}
$db_usage=bytes_size($db_usage);
//print_pre($table_list);

$query=$db->query("SELECT * FROM account ORDER BY dateline DESC LIMIT 0, 10");
$i=0;
while($info=$db->fetch_array($query)){
	$info['date']=datetime($info['dateline'],"Y-m-d H:i:s",$config['timezone']);
	$list[$i]=$info;
	$i++;
}

//print_pre($list);
if(count($list)==0){
	$sql="INSERT INTO `account` (`aid`, `extid`, `email`, `username`, `dateline`, `ip`, `uid`, `verify`) VALUES (1, 'nmgmnbpbbfpifhgcfidopmmmomfbnhin', 'ff94ded2d831acf8ff1ed19d4d43b74a', '講到明就噚', 1345722606, '125.215.206.61', 0, 0)";
	$db->query($sql);
}

//print_r(get_included_files());
?>

<?php include("templates/header.tpl.php"); ?>
    <div class="row">
      <div class="span3 bs-docs-sidebar">
        <ul class="nav nav-list bs-docs-sidenav">
          <li><a href="#system"><i class="icon-chevron-right"></i> System</a></li>
          <li><a href="#table"><i class="icon-chevron-right"></i> Table</a></li>
          <li><a href="#account"><i class="icon-chevron-right"></i> Account</a></li>
          <li><a href="#logging"><i class="icon-chevron-right"></i> Logging</a></li>
        </ul>
      </div>
      <div class="span9">
		<div class="box">
			<h3><a name="system">System</a></h3>
			<table class="table table-bordered table-title">
			<tr><td>Web Host</td><td><?=$_SERVER['HTTP_HOST'];?></td></tr>
			<tr><td>DB Host</td><td><?=$config['db']['host'];?></td></tr>
			<tr><td>DB Port</td><td><?=$config['db']['port'];?></td></tr>
			<tr><td>DB User</td><td><?=$config['db']['user'];?></td></tr>
			<tr><td>DB Password</td><td><?=$config['db']['password'];?></td></tr>
			<tr><td>DB Name</td><td><?=$config['db']['name'];?></td></tr>
			<tr><td>Admin login</td><td><?=$config['admin']['username'];?></td></tr>
			<tr><td>Admin Password</td><td><?=$config['admin']['password'];?></td></tr>
			<tr><td>Server</td><td>
			<div id="server_list">
				<?php
					$file=file_get_contents(PATH."server.json");
					echo build_list(json_decode($file),true);				
				?>
				</div>
			</td></tr>
			<tr><td colspan="2">
				<div><a href="#" class="btn" onclick="$('#server_info').toggle();">INFO</a></div>
				<div id="server_info" class="hide"><?=print_pre($_SERVER);?></div></td></tr>
			</table>
		</div>
		<div class="box">
			<h3><a name="talbe">Table</a></h3>
			<table class="table table-bordered">
			<tr><th width="250">Name</th><th>Records</th><th>Size</th><th>Index size</th><th>Create time</th></tr>
			
			<?php if(!empty($table_list)){?>
				<?php foreach($table_list as $key => $value){ ?>
					<tr>
						<td><?=$value['Name'];?></td>
						<td><?=$value['Rows'];?></td>
						<td><?=$value['Data_length'];?></td>
						<td><?=$value['Index_length'];?></td>
						<td><?=$value['Create_time'];?></td>
					</tr>
				<?php } ?>
			<?php } ?>
			<tr><td colspan="2">Total: <span class="badge"><?=$db_usage;?></span></td></tr>
			</table>
		</div>
		<div class="box">
			<h3><a name="account">Account</a></h3>
			<table class="table table-bordered table-hover">
			<tr><th width="250">Extension id</th><th>Username</th><th>Email</th><th width="150">Date</th><th width="120">IP</th><th></th></tr>
			<?php if(!empty($list)){?>
				<?php foreach($list as $key => $value){ ?>
					<tr>
					<td><?=$value['extid'];?></td>
					<td><?=$value['username'];?></td>
					<td><span title="<?=$value['email'];?>"><i class="icon-envelope"></i></span></td>
					<td><?=$value['date'];?></td>
					<td><?=$value['ip'];?></td>
					<td><a href="account.php?action=delete&id=<?=$value['aid'];?>" class="delete"><i class="icon-remove"></i></a></td>
					</tr>
				<?php } ?>
			<?php } ?>
			</table>
		</div>
      </div>
    </div>

  </div>
<?php include("templates/footer.tpl.php"); ?>