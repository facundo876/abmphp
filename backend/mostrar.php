<?php
    require "validarSesion.php";
    require_once ("./fabrica.php");
?>
<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="../javascript/funciones.js"></script>

</head>
<body>
<h2>Listado de Empleados</h2>
    <form id="frmMostar" action="../index.php" method="POST" >
        <table align="center">
                <tr>
                    <td>
                        <h4>Info</h4>
                    </td>
                </tr>
                <tr> 
                    <td colspan="3"><hr></td>
                <tr>
                    <td>
                        <?php
                            MostrarGrillaSuccess();
                         ?>
                    </td>
                   </tr> 
                <tr>
                    <td colspan="3"><hr></td>
                </tr>
        </table>
        <input name="hiddenModificar" type="hidden" id="hiddenModificar">
    </form>
</body>
</html>
   
<?php
    function MostrarGrillaSuccess(){
        $fabrica = GenerarEmpleadosDelArchivo("../archivos/empleados.txt");
        echo (MostrarListadoDeEmpleados($fabrica));
    }

    function GenerarEmpleadosDelArchivo($path):fabrica{

        $var = fopen($path, "r");

        $fabrica = new Fabrica("Telas", 7);

            while(!feof($var)){

                $info = explode("-", fgets($var)); 

                if(count($info) > 1){

                     $empl = new Empleado($info[2], $info[0], $info[1], $info[3], $info[4], $info[5], $info[6]);
                     $empl->SetPahtFoto($info[7]."-".$info[8]);
                     $fabrica->AgregarEmpleado($empl);
                }
                        
            }
        fclose($var);
        return $fabrica;
    }

    function MostrarListadoDeEmpleados($fabrica){

        $tabla = "<table border='0' align='center'>";
        foreach($fabrica->GetEmpelados() as $valor)
        {

            $tabla = $tabla."<tr>
                                <td>".
                                    $valor->Tostring().
                                "</td>
                                <td>".
                                    '<img src="fotos/'.$valor->GetPathFoto().'" width="90px" height="90px">'.
                                "<td/>
                                <td>".
                                     '<input type="button" name="btnEliminar" id="btnEliminar" value="Eliminar" onclick= EliminarEmpleado('.$valor->GetLegajo().')>'.
                                '</td>
                                <td>
                                    <input type="button" name="btnModificar" id="btnModificar" value="Modificar" onclick= "AdministrarModificar('.$valor->GetDni().')">
                                <td/>
                            </tr>';
        }
        $tabla = $tabla."</table>";

        return $tabla;
    }
    ?>