// _______________________________________top____________________________
let topx = document.querySelector(".top")
let sx = document.querySelector(".sx")
let sv = document.querySelector(".sv")
const aa = document.querySelector(".aa")

let open = false;
sx.addEventListener("click", function () {
    sv.style.transition = ".25s ease"
    sv.style.width = "17px";
    setTimeout(() => { sv.style.width = "" }, 100);
    if (open) {
        topx.style.alignItems = ""
        topx.style.height = "3.5rem"
        for (let i = 0; i < aa.childElementCount; i++) {
            aa.children[i].style.display = "";
        }
        open = false;
    } else {
        topx.style.alignItems = "start"
        topx.style.transition = ".25s ease"
        topx.style.height = "8rem"
        for (let i = 0; i < aa.childElementCount; i++) {
            aa.children[i].style.display = "flex";
        }
        open = true;

    }
})

document.addEventListener('click', function (event) {
    if (!topx.contains(event.target) ) {
        console.log("hx")
        topx.style.alignItems = ""
        topx.style.height = "3.5rem"
        for (let i = 0; i < aa.childElementCount; i++) {
            aa.children[i].style.display = "";
        }
        open = false;
    }

});

//__________________________________________________ logout_____________________________________________________
let logoutform = document.querySelector(".logoutform")
let logout = document.querySelector(".logout")
if (logout) {
    logout.addEventListener("click", () => {
        logoutform.submit();
    })
}