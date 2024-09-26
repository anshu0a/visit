const form = document.querySelector(".create")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const pass1 = document.querySelector("#pass1")
const pass2 = document.querySelector("#pass2")

const msg = document.querySelector(".msg")
const outmsg = document.querySelector(".outmsg")
outmsg.style.display="none"
const button = document.querySelector(".go")

button.addEventListener("click", () => {
    if (username.value.length == 0) {
        outmsg.style.display = "flex"
        msg.innerText = "Enter Username"
    } else if (email.value.length === 0 ) {
        outmsg.style.display = "flex"
        msg.innerText = "Enter Valid Email"
    } else if (pass1.value.length <= 5) {
        pass1.value = "";
        pass2.value = "";
        outmsg.style.display = "flex"
        msg.innerText = "Passsword length must be greater then 5 digit"
    } else if ((pass1.value.length !== 0) && (pass1.value === pass2.value)) {
        outmsg.style.display = "none"
        msg.innerText = ""
        form.submit();
    } else {
        outmsg.style.display = "flex"
        msg.innerText = "Password not matched"
    }
})

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
