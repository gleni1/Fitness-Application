<?php

	//--get 5 films: sort by `rental_duration`
	$films = $film_Controller->get_films();

	echo json_encode($films);