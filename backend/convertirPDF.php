<?php

    require_once '../vendor/autoload.php';
    require_once ("./fabrica.php");

    header('content-type:application/pdf');

    $mpdf = new \Mpdf\Mpdf(['orientation' => 'P', 
                            'pagenumPrefix' => 'Arce Facundo. ',
                            'pagenumSuffix' => ' - ',
                            'nbpgPrefix' => ' de ',
                            'nbpgSuffix' => ' páginas']);
    
    $mpdf->SetHeader('{DATE j-m-Y}||{PAGENO}{nbpg}');
    $mpdf->setFooter('|https://afternoon-sea-03993.herokuapp.com/|');

    $mpdf->SetProtection(array(), ObtenerDniDeLegueado(), 'MyPassword');

    $fabrica = new Fabrica("telas");
    $fabrica->TraerDeArchivo("../archivos/empleados.txt");
    $grilla = MostrarListadoDeEmpleados($fabrica);

    
    $mpdf->WriteHTML("<h3>Listado de empleados</h3>");
    $mpdf->WriteHTML("<br>");
    $mpdf->WriteHTML($grilla);

    $mpdf->Output();

    function ObtenerDniDeLegueado(){
        session_start();
        return $_SESSION['DNIEmpleado'];
    }

    function MostrarListadoDeEmpleados($fabrica){

        $tabla = "<table border='1' align='center'>";
        
        foreach($fabrica->GetEmpelados() as $valor)
        {  
            $tabla = $tabla."<tr>
                                <td>".
                                    $valor->Tostring().
                                "</td>
                                <td>".
                                    '<img src="../fotos/'.$valor->GetPathFoto().'" width="90px" height="90px">'.
                                "<td/>".
                            '</tr>';
        }
        $tabla = $tabla."</table>";

        return $tabla;
    }
?>