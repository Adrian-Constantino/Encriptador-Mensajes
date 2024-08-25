const d = document;
const textArea = d.querySelector(".form__input");
const imagenPersona = d.querySelector(".result__img");
const loaderCarga = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".result__title");
const resultadoText = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelectorAll(".form__btn");
const botonCopiar = d.querySelector(".result__btn");

const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function EncriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1]; 
        break; 
      }
    }
    mensajeEncriptado += encriptada;
  }

  return mensajeEncriptado;
}

function DesencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;
  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]); 
  }
  return mensajeDesencriptado; 
}

textArea.addEventListener("input", (e) => {
  imagenPersona.style.display = "none";
  loaderCarga.classList.remove("hidden");
  resultadoTitulo.textContent = "Analizando Mensaje.";
  resultadoText.textContent = "";
});

botonEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textArea.value.toLowerCase();
  let mensajeEncriptado = EncriptarMensaje(mensaje);
  resultadoText.textContent = mensajeEncriptado;
  botonCopiar.classList.remove("hidden");
  resultadoTitulo.textContent = "El resultado encriptado es:";
});

botonDesencriptar[1].addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textArea.value.toLowerCase();
  let mensajeDesencriptado = DesencriptarMensaje(mensaje);
  resultadoText.textContent = mensajeDesencriptado;
  resultadoTitulo.textContent = "El resultado desencriptado es:";
  botonCopiar.classList.remove("hidden");
});


botonCopiar.addEventListener('click', ()=>{
    let textoCopiado = resultadoText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        imagenPersona.style.display = "block";
        loaderCarga.classList.add("hidden");
        resultadoTitulo.textContent = "El texto ha sido copiado";
        botonCopiar.classList.add("hidden");
        resultadoText.textContent = "";
    })
});