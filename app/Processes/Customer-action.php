<?php
	if (isset($_POST['delete'])) {
		require '../../config.php';

		$customer_id = $_POST["customer_id"];
		$delete_Customer = $customer_Controller->delete_Customer($customer_id);
		echo $delete_Customer;
		
	}
	