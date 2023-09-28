<?php
	if (isset($_POST['fetch'])) {
		
		require '../../config.php';

		$query = $_POST["query"];

		$films = $film_Controller->search_for_films($query);

		echo json_encode($films);

	}