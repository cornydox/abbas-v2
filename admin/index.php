<?php
if (!isset($_SERVER['PHP_AUTH_USER']) || ($_SERVER['PHP_AUTH_USER'] != "abbas" && 
	$_SERVER['PHP_AUTH_PW'] != "1001inventions") ) {
    header('WWW-Authenticate: Basic realm="Restricted"');
    header('HTTP/1.0 401 Unauthorized');
    echo '<h1>Authentication Failed</h1>';
    exit;
} 

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>Admin - Games | 1001 Inventions</title>
	<link rel="stylesheet" href="./datatables/css/demo_table.css">	
	<link rel="stylesheet" href="admin.css">
	<script src="../assets/js/vendor/jquery-1.10.2.min.js"></script>
	<script src="./datatables/js/jquery.dataTables.min.js"></script>
	<script src="admin.js"></script>
</head>
<body>
	<div class="main-content">
		<h3>Registered Users</h3>
		<table id="result" border="0">
			<thead>
				<th>ID</th>
				<th>Name</th>
				<th>Contact #</th>
				<th>Email</th>
				<th>Score</th>
				<th>Register Date</th>
			</thead>
			<tbody id="result-content">
			</tbody>
		</table>
		<button id="export">Export to CSV</button>		
	</div>
</body>
</html>