function AdministrarValidaciones() {
    if (AdministrarCamposVacios() && AdministrarComboSexo() && AdministrarRangosNumericos() && AdministrarSueldoMaximoPorTruno) {
        document.getElementById("frmAltaEmpelados").submit();
    }
}
//#region 
function AdministrarSueldoMaximoPorTruno() {
    var respuesta = true;
    if (ValidarSueldoMaximoPorTurno()) {
        alert("El turno y su sueldo maximo no coinciden");
        respuesta = false;
    }
    return respuesta;
}
function AdministrarComboSexo() {
    var respuesta = true;
    if (ValidarCombo("cboSexo", "--")) {
        alert("Debe Seleccionar Sexo");
        respuesta = false;
    }
    return respuesta;
}
function AdministrarCamposVacios() {
    var respuesta = true;
    if (ValidarCamposVacios("txtDni")) {
        alert("Campo DNI vacio");
        respuesta = false;
    }
    if (ValidarCamposVacios("txtApellido")) {
        alert("Campo Apellido vacio");
        respuesta = false;
    }
    if (ValidarCamposVacios("txtNombre")) {
        alert("Campo Nombre vacio");
        respuesta = false;
    }
    if (ValidarCamposVacios("txtLegajo")) {
        alert("Campo Legajo vacio");
        respuesta = false;
    }
    if (ValidarCamposVacios("txtSueldo")) {
        alert("Campo Sueldo vacio");
        respuesta = false;
    }
    return respuesta;
}
function AdministrarRangosNumericos() {
    var respuesta = true;
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtDni").value), parseInt(document.getElementById("txtDni").min), parseInt(document.getElementById("txtDni").max))) {
        alert("DNI NO esta en el rango.");
        respuesta = false;
    }
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtLegajo").value), parseInt(document.getElementById("txtLegajo").min), parseInt(document.getElementById("txtLegajo").max))) {
        alert("Legajo NO esta en el rango.");
        respuesta = false;
    }
    if (ValidarRangoNumerico(parseInt(document.getElementById("txtSueldo").value), parseInt(document.getElementById("txtSueldo").min), parseInt(document.getElementById("txtSueldo").max))) {
        alert("Sueldo NO esta en el rango.");
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
