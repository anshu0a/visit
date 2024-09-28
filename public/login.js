window.history.replaceState(null, document.title, window.location.href);
//___________________________________________________flash_________________________________
const cutt = document.querySelector(".hide");
const swit = document.querySelector(".swit");
const sub = document.querySelector(".sub");

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