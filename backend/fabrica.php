<?php
require_once ("empleado.php");
require_once ("interfaces.php");
const MAXIMO_EMPLEADOS = 5;

class Fabrica implements IArchivo{

    private $_cantidadMaxima;
    private $_empleados;
    private $_razonSocial;

    public function __construct($razonSocial){

        $this->_cantidadMaxima = MAXIMO_EMPLEADOS;
        $this->_empleados = array();
        $this->_razonSocial = $razonSocial;
    }

    public function AgregarEmpleado($empleado){

        if(count($this->_empleados) < $this->_cantidadMaxima){

            array_push($this->_empleados, $empleado);
            $this->EliminarEmpleadosRepetidos();
            return true;
        }
        
         return false;
        
    }

    public function CalcularSueldos(){

        $total = 0;
        foreach($this->_empleados as $item){
            
            $total += $item->GetSueldo();
        }
       
        return $total;
    }

    public function EliminarEmpleado($empleado){

        for($i=0; $i<count($this->_empleados); $i++){

            if($this->_empleados[$i]->GetDni() == $empleado->GetDni()){

                unset($this->_empleados[$i]);
                return true;
            }
        }

        return false;
    }

    private function EliminarEmpleadosRepetidos(){

        $this->_empleados = array_unique($this->_empleados, SORT_REGULAR);
    }

    public function Tostring(){

        $texto = $this->_razonSocial."-". $this->_cantidadMaxima."<br>";
        foreach($this->_empleados as $item){

            $texto = $texto."-".$item->Tostring()."<br>";
        }
        
        return $texto;
    }

    public function GetEmpelados(){
        return $this->_empleados;
    }

    public function TraerDeArchivo($path): void{

        $var = fopen($path, "r");

        while(!feof($var)){

            $info = explode("-", fgets($var)); 
    
            if(count($info) > 1){

                $empl = new Empleado($info[2], $info[0], $info[1], $info[3], $info[4], $info[5], $info[6]);
                $empl->SetPahtFoto($info[7]."-".preg_replace('/[\r\n]/', "", $info[8]));

                $this->AgregarEmpleado($empl);
            }
          
        }
        fclose($var);
    }

    public function GuardarEnArchivo($path): void{

        $var = fopen($path, "w");
            
            foreach($this->_empleados as $valor){

                fwrite($var, $valor->ToString()."\r\n");
            }
        
        fclose($var);
    }
    
}