<?php
    ini_set( 'display_errors', 1 );
    ini_set( 'display_startup_errors', 1 );
    error_reporting( E_ALL );
    
    /**
     * Database details
     */
    define( 'db_host', 'localhost' );
    define( 'db_name', 'sakila' );
    define( 'db_user', 'root' );
    define( 'db_pass', '' );

    define( 'ABS_PATH', __DIR__ );
    define( 'WEB_PATH', "http://localhost/v-4/" );
    define( 'APP_DIR', ABS_PATH . "/app" );
    define( 'CONTROLLERS_DIR', APP_DIR . "/Controllers" );
    define( 'INCLUDES_DIR', ABS_PATH . "/includes" );
    define( 'header', INCLUDES_DIR . "/header.php");
    define( 'footer', INCLUDES_DIR . "/footer.php");


    //--require required files
    require_once APP_DIR . '/functions.php';
    require_once CONTROLLERS_DIR . '/DbController.php';
    require_once CONTROLLERS_DIR . '/ActorController.php';
    require_once CONTROLLERS_DIR . '/FilmController.php';
    require_once CONTROLLERS_DIR . '/CustomerController.php';

    $actor_Controller = new Actors();
    $film_Controller = new Films();
    $customer_Controller = new Customers();