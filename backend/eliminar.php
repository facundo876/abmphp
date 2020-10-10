<?php
    require_once ("./fabrica.php");

    $empl = TraerEmpleadoDeArchivoPorLegajo("../archivos/empleados.txt", $_GET["legajo"]);

    if($empl != null){
            
        $fabrica = new Fabrica("Telas", 7);
        $fabrica->TraerDeArchivo("../archivos/empleados.txt");
        
        unlink("../fotos/".$empl->GetPathFoto());

        if($fabrica->EliminarEmpleado($empl)){

            $fabrica->GuardarEnArchivo("../archivos/empleados.txt");
            echo "<h2>El Empelado fue eliminado</h2>";
        }
        else{

            echo "<h2>Error! El Empelado NO pudo ser eliminado</h2>";
        }
        
    }
    else {
        echo "<h2>El Empleado NO existe</h2>";
    }

    echo '<br/><a href="mostrar.php">Pagina Mostar empleados.<a/>';
    echo '<br/><br/><a href="../index.php">Pagina Alta Empleados.</a>';

    //--------------------------------------------
    function TraerEmpleadoDeArchivoPorLegajo($path, $legajo){

        $var = fopen("../archivos/empleados.txt", "r");
            $empl = null;
            while(!feof($var)){

                $strEmpelado = fgets($var);
                if(strpos($strEmpelado, "-".$legajo."-")){

                    $info = explode("-", $strEmpelado);
                    $empl = new Empleado($info[2], $info[0], $info[1], $info[3], $info[4], $info[5], $info[6]);
                    $empl->SetPahtFoto($info[7]."-".preg_replace('/[\r\n]/', "", $info[8]));
                    break;
                }
            }
        fclose($var);

        return $empl;
    }