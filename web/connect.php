<?php
    require('config.php');
    $con = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if($con->connect_error){
        echo("Error Establishing database connection");
    }
?>