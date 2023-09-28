<?php
	class Customers extends Db
	{
		
		function __construct(){ 
			$this->connect(); 
		}

		//--Get customers and films they have acted
	    public function get_customers(){
	    	$query = $this->db_conn->prepare("SELECT * FROM `customer` LEFT JOIN address ON customer.address_id = address.address_id");
	    	$query->execute();
        	$results = $query->get_result();

        	$customers = array();
        	while ($customer = $results->fetch_assoc()) {
        		array_push($customers, $customer);
        	}
        	return $customers;
	    }

	    public function search_for_customers($query_string): array
	    {
	    	if ($query_string === "All customers") {
		    	$query = $this->db_conn->prepare("SELECT * FROM `customer` LEFT JOIN address ON customer.address_id = address.address_id");
	    	}
	    	else{
				$query_string_ = "%".$query_string."%";
		    	$query = $this->db_conn->prepare("SELECT * FROM `customer` LEFT JOIN address ON customer.address_id = address.address_id WHERE customer.customer_id = ? OR customer.first_name LIKE ? OR customer.last_name LIKE ?");
		    	$query->bind_param('iss', $query_string, $query_string_, $query_string_);
		    	
	        }

	        $query->execute();
        	$results = $query->get_result();

	    	$films = array();
        	while ($film = $results->fetch_assoc()) {
        		array_push($films, $film);
        	}
        	return $films;
	    	
	    }

	    public function delete_Customer($customer_id) 
	    {
	    	$query = $this->db_conn->prepare("DELETE FROM `customer` WHERE customer_id = ?");
	    	$query->bind_param('i', $customer_id);
	    	return $query->execute();
	    }

	}