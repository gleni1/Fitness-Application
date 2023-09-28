<?php
	//--get customers:
	$customers = $customer_Controller->get_customers();

	echo json_encode($customers);