<?php
	class Actors extends Db
	{
		
		function __construct(){ 
			$this->connect(); 
		}

		//--Get actors and films they have acted
	    public function get_actors(){
	    	$query = $this->db_conn->prepare("SELECT * FROM `actor` LEFT JOIN actor_info ON actor.actor_id = actor_info.actor_id");
	    	$query->execute();
        	$results = $query->get_result();

        	$actors = array();
        	while ($actor = $results->fetch_assoc()) {
        		array_push($actors, $actor);
        	}
        	return $actors;
	    }

	    public function get_actor_data($actor_id) : array
	    {
	    	$query = $this->db_conn->prepare("SELECT * FROM `actor` WHERE actor_id = ?");
	    	$query->bind_param('i', $actor_id);
	    	$query->execute();
        	$results = $query->get_result();
        	return $results->fetch_assoc();
	    }

	    public function get_actor_films($actor_id){
	    	$query = $this->db_conn->prepare("SELECT * FROM `film_actor` WHERE actor_id = ?");
	    	$query->bind_param('i', $actor_id);
	    	$query->execute();
        	return $query->get_result();
	    }

	    public function get_actor_num_films($actor_id) : int {
        	return mysqli_num_rows($this->get_actor_films($actor_id));
	    }

	    public function get_actor_films_data($actor_id): array {
	    	$results = $this->get_actor_films($actor_id);
	    	$films = array();
        	while ($film = $results->fetch_assoc()) {
        		array_push($films, $film);
        	}
        	return $films;
	    }

	    

	}