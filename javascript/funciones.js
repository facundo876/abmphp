var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Persona = /** @class */ (function () {
    function Persona(apellido, nombre, dni, sexo) {
        this._apellido = apellido;
        this._nombre = nombre;
        this._dni = dni;
        this._sexo = sexo;
    }
    Persona.prototype.GetApellido = function () {
        return this._apellido;
    };
    Persona.prototype.GetNombre = function () {
        return this._nombre;
    };
    Persona.prototype.GetDni = function () {
        return this._dni;
    };
    Persona.prototype.GetSexo = function () {
        return this._sexo;
    };
    return Persona;
}());
var SEXO_MASCULINO = 1, SEXO_FEMENINO = 2;
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(apellido, nombre, dni, sexo, legajo, sueldo, turno, foto) {
        var _this = _super.call(this, apellido, nombre, dni, sexo) || this;
        _this._legajo = legajo;
        _this._sueldo = sueldo;
        _this._turno = turno;
        _this._foto = foto;
        return _this;
    }
    Empleado.prototype.GetLegajo = function () {
        return this._legajo;
    };
    Empleado.prototype.GetSueldo = function () {
        return this._sueldo;
    };
    Empleado.prototype.GetTurno = function () {
        return this._turno;
    };
    Empleado.prototype.GetFoto = function () {
        return this._foto;
    };
    Empleado.prototype.ObtenerSexoID = function () {
        if (this.GetSexo() == "M") {
            return SEXO_MASCULINO;
        }
        return SEXO_FEMENINO;
    };
    Empleado.prototype.ObtenerTurnoParaComboBox = function () {
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
    };
    return Empleado;
}(Persona));
var Ajax = /** @class */ (function () {
    function Ajax() {
        var _this = this;
        this.Get = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
            _this._xhr.open('GET', ruta);
            _this._xhr.send();
            _this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === Ajax.DONE) {
                    if (_this._xhr.status === Ajax.OK) {
                        success(_this._xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this._xhr.status);
                        }
                    }
                }
            };
        };
        this.Post = function (ruta, success, params, error) {
            //let parametros:string = params.length > 0 ? params : "";
            if (params === void 0) { params = ""; }
            _this._xhr.open('POST', ruta, true);
            //this._xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            _this._xhr.setRequestHeader("enctype", "multipart/form-data");
            _this._xhr.send(params);
            _this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === Ajax.DONE) {
                    if (_this._xhr.status === Ajax.OK) {
                        success(_this._xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this._xhr.status);
                        }
                    }
                }
            };
        };
        this._xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }
    return Ajax;
}());
/// <reference path="ajax.ts" />
window.onload = function () {
    MostrarGrilla();
};
function MostrarGrilla() {
    var parametros = "";
    var ajax = new Ajax();
    ajax.Post("backend/mostrar.php", MostrarGrillaSuccess, parametros, Fail);
}
function MostrarGrillaSuccess(grilla) {
    console.clear();
    console.log(grilla);
    document.getElementById("divMostrarEmpleados").innerHTML = grilla;
}
function Fail(retorno) {
    console.clear();
    console.log(retorno);
    alert("Ha ocurrido un ERROR!!!");
}
function AdministrarValidaciones() {
    InicializarSpanDeIndex();
    if (AdministrarCamposVacios() &&
        AdministrarComboSexo() &&
        AdministrarRangosNumericos() &&
        AdministrarSueldoMaximoPorTruno()) {
        //(<HTMLFormElement> document.getElementById("frmAltaEmpelados")).submit();
        AltaEmpleado();
        document.getElementById("frmAltaEmpelados").reset();
    }
}
function AltaEmpleado() {
    var parametros = new FormData(document.getElementById("frmAltaEmpelados"));
    var ajax = new Ajax();
    ajax.Post("backend/administracion.php", MostrarGrilla, parametros, Fail);
}
function EliminarEmpleado(legajo) {
    if (confirm("Desea eliminar el empleado: " + legajo)) {
        var parametro = "legajo=" + legajo;
        var ajax = new Ajax();
        ajax.Get("backend/eliminar.php", MostrarGrilla, parametro, Fail);
    }
}
function AdministarValidacionesLogin() {
    if (AdministrarCamposVaciosLogin() && AdministrarRangosNumericosLogin()) {
        if (VerificarValidaciones("frmLogin"))
            document.getElementById("frmLogin").submit();
    }
}
function AdministrarModificar(dni) {
    document.getElementById("hiddenModificar").value = dni;
    //(<HTMLFormElement>document.getElementById("frmMostar")).submit();
    ModificarEmpleado();
}
function ModificarEmpleado() {
    var parametros = new FormData(document.getElementById("frmMostar"));
    var ajax = new Ajax();
    ajax.Post("backend/modificarEmpleado.php", FormularioEmpleado, parametros, Fail);
}
function FormularioEmpleado(grilla) {
    var empl = JSON.parse(grilla);
    var empleado = new Empleado(empl.apellido, empl.nombre, empl.dni, empl.sexo, empl.legajo, empl.sueldo, empl.turno, empl.pathFoto);
    ModifyEmployee(empleado);
}
function ModifyEmployee(empleado) {
    ModificarTitulosFormulario("HTML5 Formulario Modificar Empleado", "Modificar Empleado");
    AsignarValorInputElement("btnEnviar", "Modificar");
    LLenarCamposDelFormulario(empleado);
    ActivarSoloLectura(empleado);
}
//#region 
function ModificarTitulosFormulario(title, innerHTML) {
    document.title = title;
    document.getElementById("tituloFrm").innerHTML = innerHTML;
}
function AsignarValorInputElement(nameInputElement, valor) {
    document.getElementById(nameInputElement).value = valor;
}
function LLenarCamposDelFormulario(empleado) {
    AsignarValorInputElement("txtApellido", empleado.GetApellido());
    AsignarValorInputElement("txtNombre", empleado.GetNombre());
    AsignarValorInputElement("txtDni", empleado.GetDni());
    AsignarValorInputElement("txtLegajo", empleado.GetLegajo());
    AsignarValorInputElement("txtSueldo", empleado.GetSueldo());
    AsignarValorInputElement("txtPathFoto", empleado.GetFoto());
    document.getElementById("hdnModificar").value = empleado.GetDni();
    document.getElementById("cboSexo").selectedIndex = empleado.ObtenerSexoID();
    document.getElementById(empleado.ObtenerTurnoParaComboBox()).checked = true;
}
function ActivarSoloLectura(empleado) {
    ActivarSoloLEcturaInputElement("txtDni", true);
    ActivarSoloLEcturaInputElement(empleado.ObtenerTurnoParaComboBox(), true);
    ActivarSoloLEcturaInputElement("txtLegajo", true);
}
function ActivarSoloLEcturaInputElement(nameInputElement, estado) {
    document.getElementById(nameInputElement).readOnly = estado;
}
function InicializarSpanDeIndex() {
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
function VerificarValidaciones(strFrm) {
    var _a;
    var cantidad = document.getElementById(strFrm).getElementsByTagName("span").length;
    for (var i = 0; i < cantidad; i++) {
        //Recorer los span de index y compara si todos son "none"
        if (!(((_a = document.getElementById(strFrm).getElementsByTagName("span").item(i)) === null || _a === void 0 ? void 0 : _a.style.display) == "none")) {
            return false;
        }
    }
    return true;
}
function AdministrarRangosNumericosLogin() {
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtDni").value), parseInt(document.getElementById("txtDni").min), parseInt(document.getElementById("txtDni").max))) {
        administrarSpanError("spanDni", true);
        return false;
    }
    return true;
}
function AdministrarCamposVaciosLogin() {
    var respuesta = true;
    if (ValidarCamposVacios("txtDni")) {
        administrarSpanError("spanDni", true);
        respuesta = false;
    }
    else {
        administrarSpanError("spanDni", false);
    }
    if (ValidarCamposVacios("txtApellido")) {
        administrarSpanError("spanApellido", true);
        respuesta = false;
    }
    else {
        administrarSpanError("spanApellido", false);
    }
    return respuesta;
}
function administrarSpanError(cadena, estado) {
    if (estado == true) {
        document.getElementById(cadena).style.display = "block";
    }
    else {
        document.getElementById(cadena).style.display = "none";
    }
}
function AdministrarSueldoMaximoPorTruno() {
    var respuesta = true;
    if (ValidarSueldoMaximoPorTurno()) {
        administrarSpanError("spanSueldo", true);
        respuesta = false;
    }
    return respuesta;
}
function AdministrarComboSexo() {
    var respuesta = true;
    if (ValidarCombo("cboSexo", "--")) {
        administrarSpanError("spanSexo", true);
        respuesta = false;
    }
    return respuesta;
}
function AdministrarCamposVacios() {
    var respuesta = true;
    if (ValidarCamposVacios("txtDni")) {
        administrarSpanError("spanDni", true);
        respuesta = false;
    }
    if (ValidarCamposVacios("txtApellido")) {
        administrarSpanError("spanApellido", true);
        respuesta = false;
    }
    if (ValidarCamposVacios("txtNombre")) {
        administrarSpanError("spanNombre", true);
        respuesta = false;
    }
    if (ValidarCamposVacios("txtLegajo")) {
        administrarSpanError("spanLegajo", true);
        respuesta = false;
    }
    if (ValidarCamposVacios("txtSueldo")) {
        administrarSpanError("spanSueldo", true);
        respuesta = false;
    }
    if (ValidarCamposVacios("archivoFoto")) {
        //Si el boton es "Modificar" no valida la imagen.
        if ((document.getElementById('btnEnviar').value == "Enviar")) {
            administrarSpanError("spanFoto", true);
            respuesta = false;
        }
    }
    return respuesta;
}
function AdministrarRangosNumericos() {
    var respuesta = true;
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtDni").value), parseInt(document.getElementById("txtDni").min), parseInt(document.getElementById("txtDni").max))) {
        administrarSpanError("spanDni", true);
        respuesta = false;
    }
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtLegajo").value), parseInt(document.getElementById("txtLegajo").min), parseInt(document.getElementById("txtLegajo").max))) {
        administrarSpanError("spanLegajo", true);
        respuesta = false;
    }
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtSueldo").value), parseInt(document.getElementById("txtSueldo").min), parseInt(document.getElementById("txtSueldo").max))) {
        administrarSpanError("spanSueldo", true);
        respuesta = false;
    }
    return respuesta;
}
//#endregion
function ValidarCamposVacios(string) {
    if (document.getElementById(string).value != "") {
        return false;
    }
    return true;
}
function ValidarRangoNumerico(valor, min, max) {
    if (valor >= min && valor <= max) {
        return false;
    }
    return true;
}
function ValidarCombo(valor, noDebe) {
    if (document.getElementById(valor).value == noDebe) {
        return true;
    }
    return false;
}
function ObtenerTurnoSeleccionado() {
    if (document.getElementById("radioMañana").checked == true) {
        return "radioMañana";
    }
    else if (document.getElementById("radioTarde").checked == true) {
        return "radioTarde";
    }
    else {
        return "radioNoche";
    }
}
function ObtenerSueldoMaximo(valor) {
    if (valor == "radioMañana") {
        return 20000;
    }
    else if (valor == "radioTarde") {
        return 18500;
    }
    else {
        return 25000;
    }
}
function ValidarSueldoMaximoPorTurno() {
    var sueldoMinimo = 8000;
    var sueldoMaximo = ObtenerSueldoMaximo(ObtenerTurnoSeleccionado());
    var sueldoActual = parseInt(document.getElementById("txtSueldo").value);
    if (sueldoActual >= sueldoMinimo && sueldoActual <= sueldoMaximo) {
        return false;
    }
    return true;
}
