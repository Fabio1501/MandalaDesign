const d = document,
w=window;

function hamburguerMenu(panelBtn, panel, menuLink, focus, focusFondo){
    
    d.addEventListener("click", (e)=>{
        if(e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)){
            d.querySelector(panel).classList.toggle("is-active");
            d.querySelector(panelBtn).classList.toggle("is-active"); 

            if(d.querySelector(focus).classList.contains("visible") && d.querySelector(focusFondo).classList.contains("visible")) {
                d.querySelector(focus).classList.remove("visible");
                d.querySelector(focusFondo).classList.remove("visible");
            }
        }
        if(e.target.matches(menuLink)){
            d.querySelector(panel).classList.remove("is-active");
            d.querySelector(panelBtn).classList.remove("is-active");
        }
    })
} 

function mostrarContenido(verMas, close){
    
    d.addEventListener("click", e=>{
        if (e.target.matches(verMas)) {
            d.querySelector(".fondo-card-focus").classList.add("visible");
            d.querySelector(".card-focus").classList.add("visible");
        }

        if (e.target.matches(close)) {
            d.querySelector(".fondo-card-focus").classList.remove("visible");
            d.querySelector(".card-focus").classList.remove("visible");
        }
    })
}

function responsiveSlider(){
    const $nextBtn = d.querySelector(".slider-btns .next"),
    $prevBtn = d.querySelector(".slider-btns .prev"),
    $slides = d.querySelectorAll(".slider-slide"),
    $focusImg = d.querySelector(".card-focus img"),
    $description = d.querySelector(".card-focus .description"),
    $precio = d.querySelector(".precio");

    let i = 0;
    
    d.addEventListener("click", e=>{
        if (e.target === $prevBtn) {
            e.preventDefault();
            console.log($slides)
            $slides[i].classList.remove("active");
            i--;
 
            if (i<0) {
                i = $slides.length - 1;
            }

            $slides[i].classList.add("active");
            let src= $slides[i].querySelector("img").getAttribute("src"),
            description = $slides[i].dataset.description,
            precio = $slides[i].dataset.precio;
            $focusImg.setAttribute("src", src);
            $description.textContent = description;
            $precio.textContent = precio;
        }
        
        if (e.target === $nextBtn) {
            e.preventDefault();
            $slides[i].classList.remove("active");
            i++;

            if (i>=$slides.length) {
                i = 0;
            }

            $slides[i].classList.add("active");
            let src= $slides[i].querySelector("img").getAttribute("src"),
            description = $slides[i].dataset.description,
            precio = $slides[i].dataset.precio;
            $focusImg.setAttribute("src", src);
            $description.textContent = description;
            $precio.textContent = precio;
        }
    })
}

async function verJSON(){
    try {
        let resp = await axios.get("../card.json"),
        json = await resp.data.card,
        $contenedorSlides = d.querySelector(".slider .slider-slides"),
        $template = d.querySelector(".slider-slides .template").content, 
        $fragment = d.createDocumentFragment();

        json.forEach(el=>{
            
            $template.querySelector(".slider-slide").dataset.id = el.id;
            $template.querySelector(".slider-slide").dataset.description = el.descripcion;
            $template.querySelector(".slider-slide").dataset.precio = el.precio;
            $template.querySelector(".slider-slide .card img").setAttribute("src", el.url);
            $template.querySelector(".slider-slide .card img").setAttribute("alt", el.nombre);
            $template.querySelector(".slider-slide .card .key-value .tipo").textContent = el.tipo;
            $template.querySelector(".slider-slide .card .key-value .nombre").textContent = el.nombre;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        })
        $contenedorSlides.appendChild($fragment)
        d.querySelector("[data-id = '1']").classList.add("active");

        responsiveSlider();
        
    } catch (err) {
        let message = err.statusText || "Ocurrió un error"
        console.log(err, message);
    }
}

function contactForm(){
    const $form = d.querySelector(".contact-form");
    const $inputs = d.querySelectorAll(".contact-form [required]");

    $inputs.forEach(input=>{
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
        input.insertAdjacentElement("afterend",$span);
    });

    d.addEventListener("keyup", e=>{
        if (e.target.matches(".contact-form [required]")) {
            let $input = e.target, pattern = $input.pattern || $input.dataset.pattern;

            if (pattern && $input.value !== "") {
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active")
            }

            if (!pattern) {
                return $input.value === ""
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active")
            }
        } 
    });
    d.addEventListener("submit", e=>{
        e.preventDefault();

        const $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

        $loader.classList.remove("none");
        
        fetch("https://formsubmit.co/ajax/vallejosabrina47@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json=>{
                $loader.classList.add("none");
                $response.classList.remove("none");
                $form.reset();
            })
            .catch(err=>{
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
                $response.innerHTML = `Error ${err.status}: ${message}`;
            })
            .finally(()=>{
                setTimeout(()=>{
                    $response.classList.add("none")
                    $response.innerHTML = "";
                }, 3000)
            })
    })
}

function scrollTopBtn(btn, icon, svg){
    const $scrollBtn = document.querySelector(btn);
    const $scrollIcon = document.querySelector(icon);
    const $scrollPath = document.querySelector(svg);
    w.addEventListener("scroll", e=>{
        let scrollTop = d.documentElement.scrollTop;
        if(scrollTop > 300){
            $scrollBtn.classList.remove("hidden")
            $scrollIcon.classList.remove("hidden")
            $scrollPath.classList.remove("hidden")
        } else{
            $scrollBtn.classList.add("hidden")
            $scrollIcon.classList.remove("hidden")
            $scrollPath.classList.remove("hidden") 
        }
    });
    d.addEventListener("click",e=>{
        if (e.target.matches(svg) || e.target.matches(btn) || e.target.matches(icon)) {
            w.scrollTo({scroll:"smooth", top: 0})
        } 
    })
}


export {hamburguerMenu, responsiveSlider, mostrarContenido, verJSON, contactForm, scrollTopBtn};
