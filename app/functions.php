<?php
	/**
	* Preformat an object before dumping
	*/
	function dump_var( $obj = null ) {
		echo '<pre>';
		var_dump($obj);
		echo '</pre>';
		return null;
	}