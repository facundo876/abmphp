<?php
require_once ("persona.php");

class Empleado extends Persona{

    protected $_legajo;
    protected $_pathFoto;
    protected $_sueldo;
    protected $_turno;

    public function __construct($apellido, $dni, $nombre, $sexo, $legajo, $sueldo, $turno){

        parent::__construct($apellido, $dni, $nombre, $sexo);
        $this->_legajo = $legajo;
        $this->_sueldo = $sueldo;
        $this->_turno = $turno;
        
    }

    public function GetPathFoto(){

        return $this->_pathFoto;
    }
    public function SetPahtFoto($pahtFoto)
    {
        $this->_pathFoto = $pahtFoto;
    }
    public function GetLegajo(){
        return $this->_legajo;
    }
    
    public function GetSueldo(){
        return $this->_sueldo;
    }
    
    public function GetTurno(){
        return $this->_turno;
    }

    public function Hablar($idioma){

        $texto = "El empleado habla ";
        for($i=0; $i<count($idioma); $i++){

            $texto = $texto.",".$idioma[$i];
        }

        return $texto;
    }

    public function ToString():string
    {
       return parent::ToString()."-". $this->_legajo."-". $this->_sueldo."-". $this->_turno."-". $this->_pathFoto;
    }
}