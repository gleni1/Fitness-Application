<?php
	class Films extends Db
	{
		
		function __construct(){ 
			$this->connect(); 
		}


		//--Get films
		public function get_films(): array
		{
	    	$query = $this->db_conn->prepare("SELECT * FROM `film` ORDER BY `rental_duration` DESC LIMIT 5");
	    	$query->execute();
        	$results = $query->get_result();

        	$films = array();
        	while ($film = $results->fetch_assoc()) {
        		array_push($films, $film);
        	}
        	return $films;
	    }


	    public function get_movie_actors($film_id)
	    {
	    	$query = $this->db_conn->prepare("SELECT actor_id FROM `film_actor` WHERE actor_id = ?");
	    	$query->bind_param('i', $film_id);
	    	$query->execute();
        	$results = $query->get_result(); 

        	$actors = array();
        	while ($actor = $results->fetch_assoc()) {
        		array_push($actors, $actor);
        	}
        	return $actors;
	    }


	    public function search_for_actors($query_string){
	    	$query1 = $this->db_conn->prepare("SELECT actor_id FROM `actor` WHERE actor.first_name LIKE ? OR actor.last_name LIKE ?");
	    	$query1->bind_param('ss', $query_string, $query_string);
	    	$query1->execute();
        	$results1 = $query1->get_result();
		}


	    public function search_for_films($query_string): array
	    {
			$query_string = "%".$query_string."%";

	    	$query = $this->db_conn->prepare("SELECT * FROM `film` WHERE film.title LIKE ? OR film.description LIKE ?");
	    	$query->bind_param('ss', $query_string, $query_string);
	    	$query->execute();
        	$results = $query->get_result();

	    	$films = array();
        	while ($film = $results->fetch_assoc()) {
        		array_push($films, $film);
        	}
        	return $films;
	    	
	    }

	}

