<?php
    session_start();

    if(!isset($_SESSION['DNIEmpleado'])){
       
        $array = array("backend/mostrar.php", "index.php");
        $path = str_replace($array,"login.html",$_SERVER["PHP_SELF"]) ; 

        header("location: ".$path);
    }

?>