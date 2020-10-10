<?php
   require_once ("./fabrica.php");

   if(isset($_POST['hiddenModificar'])){

   $fabrica = new fabrica("Telas");
   $fabrica->TraerDeArchivo("../archivos/empleados.txt");

   foreach($fabrica->GetEmpelados() as $empl){

       if($empl->GetDni() == $_POST['hiddenModificar']){
           
           $p = new stdClass();
           $p->apellido = $empl->GetApellido();
           $p->nombre = $empl->GetNombre();
           $p->dni = $empl->GetDni();
           $p->sexo = $empl->GetSexo();
           $p->legajo = $empl->GetLegajo();
           $p->sueldo = $empl->GetSueldo();
           $p->turno = $empl->GetTurno();
           $p->pathFoto = $empl->GetPathFoto();
           $obJson = json_encode($p);

           echo $obJson;
           break;
       }
   }
   }
?>