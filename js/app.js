const formulario = document.querySelector('#enviar-mail');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const botonEnviar = document.querySelector('#enviar');
const botonReset = document.querySelector('#resetBtn');

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', deshabilitarBotonEnviar);
    email.addEventListener('blur', compruebaFormulario);
    asunto.addEventListener('blur', compruebaFormulario);
    mensaje.addEventListener('blur', compruebaFormulario);
    botonEnviar.addEventListener('click', enviaEmail);
    botonReset.addEventListener('click', limpiaFormulario);
}

function compruebaFormulario() {
    validarLongitud(this);
    habilitaBotonCamposCompletos();
    if (this.type === 'email') {
        validaEmail(this);
    }
}

function validarLongitud(campo) {
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
        return;
    }
    campo.style.borderBottomColor = 'red';
    campo.classList.add('error');
    return;
}

function validaEmail(campo){
    let email = campo.value;
    if(email.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
        return;
    }
}

function habilitaBotonCamposCompletos() {
    let errores = document.querySelectorAll('.error');
    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            botonEnviar.disabled = false;
        }
    }
}

function deshabilitarBotonEnviar() {
    botonEnviar.disabled = true;
}

function limpiaFormulario() {
    formulario.reset();
}

function enviaEmail(event) {
    event.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    const envio = document.createElement('img');
    envio.src = 'img/mail.gif';
    envio.style.display = 'block';

    setTimeout(function(){
        const loaders = document.querySelector('#loaders');
        spinner.style.display = 'none';

        loaders.appendChild( envio);
        setTimeout(function(){
            envio.remove();
            limpiaFormulario();
        }, 4000)
    }, 2000);
}