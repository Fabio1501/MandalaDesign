import {contactForm, hamburguerMenu, mostrarContenido, scrollTopBtn, verJSON} from "./componentes.js";

const d = document;

d.addEventListener("DOMContentLoaded",e=>{
    hamburguerMenu(".panel-btn", ".panel",".menu a",".card-focus", ".fondo-card-focus");
    mostrarContenido(".verMas-btn", ".card-focus span");
    scrollTopBtn(".scroll-top-btn", ".scroll-icon", ".scroll-path");
    verJSON();
    contactForm();
})
