<!DOCTYPE html>
<html lang="en">
<head>
	<title><?= $page_Title ?></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="<?= WEB_PATH ?>includes/style.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
	<script src="<?= WEB_PATH ?>includes/functions.js"></script>
</head>
<body>

	<nav class="navbar navbar-expand-sm bg-light">

	  	<div class="container-fluid">
		    <ul class="navbar-nav">
		      	<li class="nav-item">
		        	<a class="nav-link <?= $page_Title == "Home" ? 'active' : '' ?>" href="./">Home</a>
		      	</li>
		      	<li class="nav-item">
		        	<a class="nav-link <?= $page_Title == "Movies" ? 'active' : '' ?>" href="movies.php">Movies</a>
		      	</li>
		      	<li class="nav-item">
		        	<a class="nav-link <?= $page_Title == "Customers" ? 'active' : '' ?>" href="customers.php">Customers</a>
		      	</li>
		      	<li class="nav-item">
		        	<a class="nav-link <?= $page_Title == "Reports" ? 'active' : '' ?>" href="reports.php">Reports</a>
		      	</li>
		    </ul>
	  	</div>

	</nav>

	<div class="container mt-3">
		<div class="card">
			<h1 class="text-center"><?= $page_Title ?></h1>
		</div>
	</div>