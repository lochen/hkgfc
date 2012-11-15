<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>HKGFC Admin Console</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Le styles -->
	<link href="/static/css/bootstrap.css" rel="stylesheet">
	<link href="/static/css/bootstrap-responsive.css" rel="stylesheet">
	<link href="/static/css/docs.css" rel="stylesheet">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="/static/js/bootstrap.min.js"></script>
	<script src="/static/js/admin.js"></script>

	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>

<body data-spy="scroll" data-target=".bs-docs-sidebar">

	<!-- .navbar -->
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="brand" href="/admin/?action=logout">Logout</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li<?php if($tpl['menu']['current']==""){ ?> class="active"<?php } ?>>
						<a href="./">Home</a>
						</li>
						<li<?php if($tpl['menu']['current']=="account"){ ?> class="active"<?php } ?>>
						<a href="./account.php">Account</a>
						</li>
						<li<?php if($tpl['menu']['current']=="logging"){ ?> class="active"<?php } ?>>
						<a href="./logging.php">Logging</a>
						</li>
						<li class="dropdown <?php if($tpl['menu']['current']=="tools"){ ?> active<?php } ?>">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <b class="caret"></b></a>
						<ul class="dropdown-menu">
						<li><a href="tools/pma">phpMyAdmin</a></li>
						<li><a href="sync.php">Sync</a></li>
						</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- end .navbar -->
	<!-- .container-->
	<div class="container">