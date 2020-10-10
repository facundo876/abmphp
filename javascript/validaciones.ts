/// <reference path="ajax.ts" />

window.onload = ():void => {
    MostrarGrilla();
}; 

function MostrarGrilla(){
    
    var parametros : string = "";
    var ajax : Ajax = new Ajax();

    ajax.Post("backend/mostrar.php", 
                MostrarGrillaSuccess, 
                parametros, 
                Fail);
}

function MostrarGrillaSuccess(grilla:string):void {
    console.clear();
    console.log(grilla);
    (<HTMLDivElement>document.getElementById("divMostrarEmpleados")).innerHTML = grilla;
}

function Fail(retorno:string):void {
    console.clear();
    console.log(retorno);
    alert("Ha ocurrido un ERROR!!!");
}

function AdministrarValidaciones (){
    
    InicializarSpanDeIndex();

    if(AdministrarCamposVacios() && 
       AdministrarComboSexo() && 
       AdministrarRangosNumericos() && 
       AdministrarSueldoMaximoPorTruno())
    {
        //(<HTMLFormElement> document.getElementById("frmAltaEmpelados")).submit();
        AltaEmpleado();
        (<HTMLFormElement> document.getElementById("frmAltaEmpelados")).reset();
    }
    
}

function AltaEmpleado(){

    var parametros : FormData = new FormData(<HTMLFormElement> document.getElementById("frmAltaEmpelados"));
     
    var ajax : Ajax = new Ajax();

    ajax.Post("backend/administracion.php", 
                MostrarGrilla, 
                parametros, 
                Fail);
}

function EliminarEmpleado(legajo:string){

    if( confirm("Desea eliminar el empleado: "+legajo)){

        var parametro :string = "legajo="+legajo;
        var ajax : Ajax = new Ajax();

        ajax.Get("backend/eliminar.php",
                    MostrarGrilla,
                    parametro,
                    Fail);
    }  
}

function AdministarValidacionesLogin(){

    if(AdministrarCamposVaciosLogin() && AdministrarRangosNumericosLogin())
    {
        if(VerificarValidaciones("frmLogin"))
            (<HTMLFormElement> document.getElementById("frmLogin")).submit();
    }
}

function AdministrarModificar(dni:string){

    (<HTMLInputElement> document.getElementById("hiddenModificar")).value = dni;
    //(<HTMLFormElement>document.getElementById("frmMostar")).submit();
    ModificarEmpleado();
}

function ModificarEmpleado(){

    var parametros : FormData = new FormData(<HTMLFormElement> document.getElementById("frmMostar")); 
     
    var ajax : Ajax = new Ajax();

    ajax.Post("backend/modificarEmpleado.php", 
                FormularioEmpleado, 
                parametros, 
                Fail);
}

function FormularioEmpleado(grilla:string){
    
    var empl = JSON.parse(grilla);
    var empleado: Empleado = new Empleado(empl.apellido, empl.nombre, empl.dni, empl.sexo, empl.legajo, empl.sueldo, empl.turno, empl.pathFoto)
    ModifyEmployee(empleado);
}

function ModifyEmployee(empleado: Empleado){

    ModificarTitulosFormulario("HTML5 Formulario Modificar Empleado","Modificar Empleado");
    AsignarValorInputElement("btnEnviar", "Modificar");
    LLenarCamposDelFormulario(empleado);
    ActivarSoloLectura(empleado);
}
//#region 

function ModificarTitulosFormulario(title:string, innerHTML:string){

    document.title = title;
    (<HTMLElement>document.getElementById("tituloFrm")).innerHTML = innerHTML;
   
}

function AsignarValorInputElement(nameInputElement:string, valor:string){

    (<HTMLInputElement>document.getElementById(nameInputElement)).value = valor;
}

function LLenarCamposDelFormulario(empleado:Empleado){

    AsignarValorInputElement("txtApellido", empleado.GetApellido());
    AsignarValorInputElement("txtNombre", empleado.GetNombre());
    AsignarValorInputElement("txtDni", empleado.GetDni());
    AsignarValorInputElement("txtLegajo", empleado.GetLegajo());
    AsignarValorInputElement("txtSueldo", empleado.GetSueldo());
    AsignarValorInputElement("txtPathFoto", empleado.GetFoto());
    (<HTMLInputElement>document.getElementById("hdnModificar")).value = empleado.GetDni();
    (<HTMLSelectElement>document.getElementById("cboSexo")).selectedIndex = empleado.ObtenerSexoID();
    (<HTMLInputElement>document.getElementById(empleado.ObtenerTurnoParaComboBox())).checked = true;
}

function ActivarSoloLectura(empleado:Empleado){
    ActivarSoloLEcturaInputElement("txtDni", true);
    ActivarSoloLEcturaInputElement(empleado.ObtenerTurnoParaComboBox(), true)
    ActivarSoloLEcturaInputElement("txtLegajo", true);
}

function ActivarSoloLEcturaInputElement(nameInputElement:string, estado:boolean){
    
    (<HTMLInputElement>document.getElementById(nameInputElement)).readOnly = estado;
}

function InicializarSpanDeIndex(){

    administrarSpanError("spanDni", false);
    administrarSpanError("spanNombre", false);
    administrarSpanError("spanApellido", false);
    administrarSpanError("spanLegajo", false);
    administrarSpanError("spanSueldo", false);
    administrarSpanError("spanDni", false);
    administrarSpanError("spanLegajo", false);
    administrarSpanError("spanSueldo", false);
    administrarSpanError("spanSexo", false);
    administrarSpanError("spanFoto", false);
}

function VerificarValidaciones(strFrm: string): boolean{
    var cantidad: number = (<HTMLFormElement> document.getElementById(strFrm)).getElementsByTagName("span").length;
    
    for(var i: number = 0; i< cantidad; i++ ){
        
        //Recorer los span de index y compara si todos son "none"
        if(! ((<HTMLFormElement> document.getElementById(strFrm)).getElementsByTagName("span").item(i)?.style.display == "none")){

            return false;
        }

    }

    return true;
}

function AdministrarRangosNumericosLogin(){
    if(ValidarRangoNumerico(parseInt((<HTMLInputElement> document.getElementById("txtDni")).value), 
    parseInt((<HTMLInputElement> document.getElementById("txtDni")).min),
    parseInt((<HTMLInputElement> document.getElementById("txtDni")).max))){

        administrarSpanError("spanDni", true);
        return false;
    }
    return true;
}

function AdministrarCamposVaciosLogin(){
    var respuesta:boolean = true;
    if(ValidarCamposVacios("txtDni"))
    {    
        administrarSpanError("spanDni", true);
        respuesta = false;
    }
    else
    {
        administrarSpanError("spanDni", false);
    }
    if(ValidarCamposVacios("txtApellido"))
    {     
        administrarSpanError("spanApellido", true);
        respuesta = false;
    }
    else
    {
        administrarSpanError("spanApellido", false);
    }
    return respuesta;
}

function administrarSpanError(cadena: string, estado : boolean){

    if(estado == true){

        (<HTMLInputElement> document.getElementById(cadena)).style.display = "block";
    }
    else{
        (<HTMLInputElement> document.getElementById(cadena)).style.display = "none";
    }
}

function AdministrarSueldoMaximoPorTruno():boolean{
    var respuesta:boolean = true;
    if(ValidarSueldoMaximoPorTurno()){
        
        administrarSpanError("spanSueldo", true);
        respuesta = false;
    }
    return respuesta;
}

function AdministrarComboSexo():boolean{

    var respuesta:boolean = true;
    if(ValidarCombo("cboSexo", "--") ){

        administrarSpanError("spanSexo", true);
        respuesta = false;
    }
    return respuesta;
}

function AdministrarCamposVacios(){
    var respuesta:boolean = true;

    if(ValidarCamposVacios("txtDni")){
        administrarSpanError("spanDni", true);
        respuesta = false;
    }
    if(ValidarCamposVacios("txtApellido")){
        administrarSpanError("spanApellido", true);
        respuesta = false;
    }
    if(ValidarCamposVacios("txtNombre")){
        administrarSpanError("spanNombre", true);
        respuesta = false;
    }
    if(ValidarCamposVacios("txtLegajo")){
        administrarSpanError("spanLegajo", true);
        respuesta = false;
    }
    if(ValidarCamposVacios("txtSueldo")){
        administrarSpanError("spanSueldo", true);
        respuesta = false;
    }
    if(ValidarCamposVacios("archivoFoto")){
        //Si el boton es "Modificar" no valida la imagen.
        if(((<HTMLInputElement> document.getElementById('btnEnviar')).value == "Enviar")){
            administrarSpanError("spanFoto", true);
            respuesta = false;
        }

    }
    return respuesta;
}

function AdministrarRangosNumericos():boolean{
    var respuesta:boolean = true;
    if( ValidarRangoNumerico(parseInt((<HTMLInputElement> document.getElementById("txtDni")).value),
    parseInt((<HTMLInputElement> document.getElementById("txtDni")).min),
    parseInt((<HTMLInputElement> document.getElementById("txtDni")).max))
        ){

        administrarSpanError("spanDni", true);
        respuesta = false;
        }
    if( ValidarRangoNumerico(parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).value),
        parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).min),
        parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).max))
        ){

        administrarSpanError("spanLegajo", true);
        respuesta = false;
        }
    if( ValidarRangoNumerico(parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).value),
        parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).min),
        parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).max))
        ){

        administrarSpanError("spanSueldo", true);
        respuesta = false;
        }
        return respuesta;
}
//#endregion
function ValidarCamposVacios(string:string):boolean{

    if((<HTMLInputElement> document.getElementById(string)).value != ""){
        return false;
    }
    return true;
}

function ValidarRangoNumerico(valor:number, min:number, max:number){

    if(valor >= min && valor <= max){
        return false;
    }
    return true;
}

function ValidarCombo(valor : string, noDebe:string):boolean{

    if((<HTMLInputElement> document.getElementById(valor)).value == noDebe){
        return true; 
    }
    return false;
}

function ObtenerTurnoSeleccionado(): string{
    
    if((<HTMLInputElement> document.getElementById("radioMañana")).checked == true){
        return "radioMañana";
    }
    else if((<HTMLInputElement> document.getElementById("radioTarde")).checked == true){
        return "radioTarde";
    }
    else{
        return "radioNoche";
    }
}

function ObtenerSueldoMaximo(valor : string):number{

    if(valor == "radioMañana"){
        return 20000;
    }
    else if(valor == "radioTarde"){
        return 18500;
    }
    else{
        return 25000;
    }
}

function ValidarSueldoMaximoPorTurno(){

    var sueldoMinimo = 8000;
    var sueldoMaximo = ObtenerSueldoMaximo(ObtenerTurnoSeleccionado());
    var sueldoActual = parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).value);

    if(sueldoActual >= sueldoMinimo && sueldoActual <= sueldoMaximo){
        return false;
    }
    return true;
}