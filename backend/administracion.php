<?php
    require_once ("./fabrica.php");

    $empleadoRecibido = new Empleado($_POST["txtApellido"], $_POST["txtDni"], $_POST["txtNombre"],$_POST["cboSexo"],$_POST["txtLegajo"],$_POST["txtSueldo"],$_POST["rdoTurno"]);
    $empleadoRecibido->SetPahtFoto(ValidarFotoEmpleado());
    $fabrica = new Fabrica("Telas");
    $fabrica->TraerDeArchivo("../archivos/empleados.txt");

    $fabrica->EliminarEmpleado($empleadoRecibido);

    if($fabrica->AgregarEmpleado($empleadoRecibido)){

        $fabrica->GuardarEnArchivo("../archivos/empleados.txt");
        echo '<a href="mostrar.php">Empleado agregado EXITOSAMENTE</a>';
    }
    else{

        echo $fabrica->ToString();
        echo '<a href="./index.html">Error! al agregar al empleado</a>';
    }
//---------------------------------------------------
    function EscribirArchivo($path, $texto){

        $ar = fopen($path, "a");

            fputs($ar, $texto."\r\n");

        fclose($ar);
    }
    
    function ValidarFotoEmpleado(){
    
        if($_FILES['archivoFoto']['name'] != ''){
            
            $pathFoto = "../fotos/". $_FILES['archivoFoto']['name'];
            if(ValidarImagen($pathFoto)){

                $NewName = $_POST['txtDni']."-".$_POST['txtApellido'].".".pathinfo($_FILES['archivoFoto']['name'], PATHINFO_EXTENSION);

                $pathFoto = "../fotos/".$NewName;
                move_uploaded_file($_FILES['archivoFoto']['tmp_name'], $pathFoto);
                return $NewName;
            }
        }
        else{
            return $_POST['txtPathFoto'];
        }
        return "";
    }

    function ValidarImagen($destino){

        $tipoArchivo = pathinfo($destino, PATHINFO_EXTENSION);

        if(getimagesize($_FILES['archivoFoto']['tmp_name']) != false)//No es imagen
        {
            //Su extencion es valida
            if($tipoArchivo == "jpg" || $tipoArchivo == "bnp" || $tipoArchivo == "gif" || $tipoArchivo == "png" || $tipoArchivo == "jpeg"){
                //Su size es menor a 1mb
                if($_FILES['archivoFoto']['size'] < 1000000){

                    if(! file_exists($destino)){
                        return true;
                    }
                }
            }
        }

        return false;
    }