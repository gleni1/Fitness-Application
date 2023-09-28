<?php
	if (isset($_POST['fetch'])) {
		
		require '../../config.php';
		
		$data = $_POST["data"];

		if ($data == 'Top Movies') {
			require "fetch_top_movies.php";
		}

		if ($data == 'Top Actors') {
			require "fetch_top_actors.php";
		}

		if ($data == "Customers") {
			require "fetch_customers.php";
		}

	}