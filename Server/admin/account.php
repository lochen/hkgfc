<?php
include("global.php");
$tpl['menu']['current']="account";

if($_GET['action']=="delete" && $_GET['id']!=""){
	$id=trim($_GET['id']);
	$db->query("DELETE FROM account WHERE aid='$id'");
	exit(json_encode(array('status'=>200)));
}

if(isset($_POST['action'])){
	if($_POST['action']=="delete" && !empty($_POST['aaid'])){
		$db->query("DELETE FROM account WHERE aid IN (".implode_ids($_POST['aid']).")");
		$message='<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">กั</button>Delete success</div>';
	}
	elseif($_POST['action']=="delete_all"){
		$db->query("DELETE FROM account");
		$message='<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">กั</button>Delete success</div>';	
	}
}

$query=$db->query("SELECT * FROM account ORDER BY dateline DESC LIMIT 0, 10");
$i=0;
while($info=$db->fetch_array($query)){
	$info['date']=datetime($info['dateline'],"Y-m-d H:i:s",$config['timezone']);
	$list[$i]=$info;
	$i++;
}
?>

<?php include("templates/header.tpl.php"); ?>

<div class="row">
	<div class="span12">
		<div class="box">
		<?=$message;?>
		<form id="logging_form" name="logging_form" method="post" class="confirm">
		<table class="table table-bordered table-hover">
			<tr class="head"><th class="chk"><input type="checkbox" class="chkall"></th><th width="250">Extension id</th><th>Username</th><th width="250">Email(Encrypted)</th><th>Verify</th><th width="150">Date</th><th width="120">IP</th></tr>
			
			<?php if(!empty($list)){ ?>
				<?php foreach($list as $key => $value){ ?>
					<tr>
					<td><input type="checkbox" name="aid[]" value="<?=$value['aid'];?>" /></td>
					<td><?=$value['extid'];?></td>
					<td><?=$value['username'];?></td>
					<td><?=$value['email'];?></td>
					<td><?=$value['verify'];?></td>
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
					//alert("#delete_all.click()");
					$("#action").val("delete_all");
					$("#logging_form").submit();
				});
			</script>
		</form>
		</div>
	</div>
</div>

<?php include("templates/footer.tpl.php"); ?>