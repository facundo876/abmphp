<?php
    require "./backend/validarSesion.php";
    require_once ("./backend/fabrica.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML 5 – Formulario Alta Empleado</title>

    <script src="./javascript/funciones.js"></script>
</head>
<body>
    <div><h2 >Arce Facundo</h2></div>
    <table>
            <tr>
                <td width="50%">
                    <div id="divAltaEmpleado" ><!--Formulario alta empleado-->
                        
                        <form id="frmAltaEmpelados">                     
                        <input type="hidden" id="hdnModificar" name="hdnModificar" >
                            <table align="center">
                                <tr>
                                    <td><h2 id="tituloFrm">Alta Empleados</h2></td>
                                </tr>
                                <tr>
                                    <td><h4>Datos Personales</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><hr></td>
                                </tr>
                                <tr>
                                    <td>DNI:</td>
                                    <td>
                                        <input type="number" name="txtDni" id="txtDni" size="8" min="1000000" max="55000000">
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanDni">*</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Apellido:</td>
                                    <td> 
                                        <input type="text" name="txtApellido" id="txtApellido">   
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanApellido">*</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nombre:</td>
                                    <td>
                                        <input type="text" name="txtNombre" id="txtNombre">   
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanNombre">*</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sexo:</td>
                                    <td>
                                        <select name="cboSexo" id="cboSexo">
                                            <option value="--" selected>Seleccione</option>
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                        </select>  
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanSexo">*</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h4>Datos Laborales</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><hr></td>
                                </tr>
                                <tr>
                                    <td>Legajo:</td>
                                    <td>
                                        <input type="number" name="txtLegajo" id="txtLegajo" min="100" max="500">                   
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanLegajo">*</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sueldo:</td>
                                    <td>
                                        <input type="number" name="txtSueldo" id="txtSueldo" min="8000" max="25000" step="500">    
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanSueldo">*</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Turno:</td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;padding-left:45px">
                                        <input type="radio" id="radioMa&ntilde;ana" name="rdoTurno" checked value="Ma&ntilde;ana">
                                        <label for="radioMa&ntilde;ana">Ma&ntilde;ana</label><br>
                                        <input type="radio" id="radioTarde" name="rdoTurno"value="Tarde">
                                        <label for="radioTarde">Tarde</label><br>
                                        <input type="radio" id="radioNoche" name="rdoTurno" value="Noche"> 
                                        <label for="radioNoche">Noche</label>
                                    </td>
                                </tr>
                                <tr >
                                    <td > Foto: </td>
                                    <td >                    
                                        <input type="file" name="archivoFoto" id="archivoFoto">
                                        <input style="display:none;" type="text" name="txtPathFoto" id="txtPathFoto"/> 
                                    </td>
                                    <td>
                                        <span style="color:red;display: none;" id="spanFoto">*</span>
                                    </td>
                                    </tr>
                                <tr>
                                    <td colspan="2"><hr></td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="right">
                                        <input type="reset" value="Limpiar">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="right" onclick="AdministrarValidaciones()">
                                        <input type="button" id="btnEnviar" value="Enviar">
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div><!--Fin div Alta empleado -->
                </td>
                <td>
                    <div id="divMostrarEmpleados">

                    </div>
                    <div><br/><a href="./backend/convertirPDF.php">Covertir listado a PDF</a></div>
                </td>
            </tr>
        </table>
        <div><br/><a href="./backend/cerrarSesion.php">Desloguearse</a></div>
        
    <?php
   
        if(isset($_POST['hiddenModificar'])){

        $fabrica = new fabrica("Telas");
        $fabrica->TraerDeArchivo("./archivos/empleados.txt");

        foreach($fabrica->GetEmpelados() as $empl){

            if($empl->GetDni() == $_POST['hiddenModificar']){
                
                echo "<script> ModifyEmployee( new Empleado('".$empl->GetApellido()."', '".$empl->GetNombre()."','".$empl->GetDni()."','".$empl->GetSexo()."','".$empl->GetLegajo()."','".$empl->GetSueldo()."','".$empl->GetTurno()."','".$empl->GetPathFoto()."'));</script>";
                break;
            }
        }
        }
?>
</body>
</html>