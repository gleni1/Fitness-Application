<?php
	if (isset($_POST['fetch'])) {
		
		require '../../config.php';

		$query = $_POST["query"];

		$films = $customer_Controller->search_for_customers($query);

		echo json_encode($films);

	}