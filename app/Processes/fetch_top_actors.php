<?php

	//--get 5 films: sort by `rental_duration`
	$actors = $actor_Controller->get_actors();

	//-- loop over Actors

	/**
	 * declare an empty array to hold actors and number of movies they've featured in
	 * we will count how many movies each actor has featured in, and add a new array key to their data, 
	 * and add their data to this empty array
	 */

	$actors_Data = array();

	foreach ($actors as $actor) {

		//--get how many films this actor has acted in
		$actor_num_films = $actor_Controller->get_actor_num_films($actor["actor_id"]);

		//-- add new array key
		$actor["num_films"] = $actor_num_films;
		
		array_push($actors_Data, $actor);

	}


	//--sort the $actors_Data array by `num_films`
	usort($actors_Data, function($a, $b) {
	    return$b['num_films'] <=> $a['num_films'];
	});


	//--slice array and get top five
	$top_actors = array_slice($actors_Data, 0, 5, true);
	

	echo json_encode($top_actors);