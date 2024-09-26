
//___________________________________________________flash_________________________________

const cutt = document.querySelector(".successCut");
if (cutt) {
    const flash = document.querySelector(".flash");
    flash.style.transition = ".5s ease"
    flash.style.opacity = "1";
    setTimeout(()=>{
        flash.style.opacity="0"
        setTimeout(()=>{flash.style.display="none"},500);

    },5000)

    function fx() {
        this.parentElement.parentElement.style.display = "none";
        cutt.removeEventListener("click", fx)
    }
    cutt.addEventListener("click", fx)
}

// ___________________________________________________________loader

let onx = document.querySelector(".one");

