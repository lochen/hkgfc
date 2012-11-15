<?php
include("global.php");
$tpl['menu']['current']="logging";
if(isset($_POST['action'])){
	if($_POST['action']=="delete" && !empty($_POST['lid'])){
		$db->query("DELETE FROM logging WHERE lid IN (".implode_ids($_POST['lid']).")");
//		$message='<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button>Delete success</div>';
		set_alert_message("Delete success(".count($_POST['lid']).")","success",5);
		$_SESSION['DELETED']=time();
		redirect("logging.php");
	}
	elseif($_POST['action']=="delete_all"){
		$db->query("DELETE FROM logging");
		//$message='<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button>Delete success</div>';	
		set_alert_message("Delete all success","success",5);
		redirect("logging.php");
	}
}
$query=$db->query("SELECT * FROM logging ORDER BY dateline DESC");
while($info=$db->fetch_array($query)){
	$info['date']=datetime($info['dateline'],"Y-m-d H:i:s",$config['timezone']);	
	if($info['type']=="SYNC"){
		$datas=explode("\t",trim($info['content']));
		$content=array_shift($datas)."\n";
		foreach($datas as $key => $data){
			if(preg_match("/([\s\S]*?)\=([\s\S]*?)/",$data,$match)){
				parse_str($data,$output);
				if($output){
					$tmp="";
					foreach($output as $k => $v){
						$tmp.=$k."=".$v."\n";
					}
				}
				$content.=$tmp."\n";
			}
			else{
				$content.=$data."\n";
			}
		}
		$info['content']=$content;
	}	
	$info['content']=str_replace("\t","\n",$info['content']);
	$list[]=$info;
}
//print_pre($_SESSION);
//print_pre(PATH);
//clearstatcache();
//print_pre(ini_get('session.save_path'));
?>
<?php include("templates/header.tpl.php"); ?>
<div class="row">
	<div class="span12">
		<div class="box">
		<?=get_alert_message();?>
		<form id="logging_form" name="logging_form" method="post" class="confirm">
		<table class="table table-bordered table-hover">
			<tr class="head"><th class="chk"><input type="checkbox" class="chkall"></th><th>Type</th><th>Content</th><th width="150">Date</th><th width="120">IP</th></tr>
			<?php if(!empty($list)){ ?>
				<?php foreach($list as $key => $value){ ?>
					<tr>
					<td><input type="checkbox" name="lid[]" value="<?=$value['lid'];?>" /></td>
					<td><?=$value['type'];?></td>
					<td><div class="wrap_box"><?=nl2br($value['content']);?></div></td>
					<td><?=$value['date'];?></td>
					<td><?=$value['ip'];?></td>
					</tr>
				<?php } ?>
			<?php } ?>
		</table>
			<div class="">
				<input type="hidden" id="action" name="action" value="delete" />
				<input type="submit" value="Delete" class="btn btn-primary" />
				<input type="button" id="delete_all" value="Delete All" class="btn btn-danger" />
			</div>
			<script type="text/javascript">
				$("#delete_all").click(function(){
					$("#action").val("delete_all");
					$("#logging_form").submit();
				});
			</script>
		</form>
		</div>
	</div>
</div>
<?php //clear_alert_message(); ?>
<?php include("templates/footer.tpl.php"); ?>