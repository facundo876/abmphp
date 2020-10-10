abstract class Persona{

    private _apellido: string;
    private _nombre: string;
    private _dni: string;
    private _sexo: string;

    public constructor(apellido:string, nombre:string, dni:string, sexo:string){
        this._apellido = apellido;
        this._nombre = nombre;
        this._dni = dni;
        this._sexo = sexo;
    }

    public GetApellido():string{
        return this._apellido;
    }
    public GetNombre():string{
        return this._nombre;
    }
    public GetDni(){
        return this._dni;
    }
    public GetSexo():string{
        return this._sexo;
    }
}