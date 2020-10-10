<?php

if(ExisteEmpleado()){

    session_start();

    $_SESSION['DNIEmpleado'] = $_POST['txtDni'];

    header("Location: ../index.php");
}
else{
    echo "<h4>Error! El empleado no existe <h4/>";
    echo '<br/><a href="../login.html">Volver al Login.</a>';
}
//---------------------------------------------------------
function ExisteEmpleado(){

    $rta = false;
    $var = fopen("../archivos/empleados.txt", "r");

        while(! feof($var)){
            
            $strEmpelado = " ".strtolower(fgets($var));
            
            if(strpos($strEmpelado, strtolower($_POST['txtApellido']))){

                if(strpos($strEmpelado, strtolower($_POST['txtDni'])."-")){

                    $rta = true;
                }
                 
            }
        }
    fclose($var);

    return $rta;
}