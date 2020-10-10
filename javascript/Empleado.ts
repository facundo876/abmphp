const SEXO_MASCULINO:number=1, SEXO_FEMENINO:number=2;

class Empleado extends Persona{
    
    protected _legajo:string;
    protected _sueldo:string;
    protected _turno:string;
    protected _foto:string;

    public constructor(apellido:string, nombre:string, dni:string, sexo:string, legajo:string, sueldo:string, turno:string, foto:string){
        super(apellido, nombre, dni, sexo);
        this._legajo = legajo;
        this._sueldo = sueldo;
        this._turno = turno;
        this._foto = foto;
    }

    public GetLegajo():string{
        return this._legajo;
    }
    public GetSueldo(){
        return this._sueldo;
    }
    public GetTurno(){
        return this._turno;
    }
    public GetFoto(){
        return this._foto;
    }

    public ObtenerSexoID():number{
        if(this.GetSexo() == "M"){
            return SEXO_MASCULINO;
        }
        return SEXO_FEMENINO;
    
    }
    public ObtenerTurnoParaComboBox(){
        switch (this._turno) {
            case "Mañana":
                return "radioMañana";

            case "Tarde":
                return "radioTarde";

            case "Noche":
                return "radioNoche";
            default:
                return "";
        }
    }
}