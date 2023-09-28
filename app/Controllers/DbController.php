<?php
	class Db {

		protected $db_conn;
    	
	    protected function connect(){
		    $this->db_conn = new mysqli(db_host, db_user, db_pass, db_name);
			if ($this->db_conn->connect_error) {
			  die("Connection failed: " . $this->db_conn->connect_error);
			}
	    }
	}
