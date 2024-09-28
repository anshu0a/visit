
    // window.history.pushState(null, document.title, window.location.href);
    // window.addEventListener('popstate', function () {
    //     window.history.pushState(null, document.title, window.location.href);
    // });

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

// ________________________________________________________like______________________________

const clklike = document.querySelector(".likemex");
let bbtt = document.querySelectorAll(".kk");
for(lik of bbtt){
lik.addEventListener("click",function(){
    clklike.action=this.parentElement.children[0].innerText;
    if(this.getAttribute("class").slice(0 , -3)==="hai"){
loader.children[0].innerText="Removing from wishlist . . ."
    loader.style.display="flex"
    }else{
        loader.children[0].innerText="Adding to wishlist . . ."
    loader.style.display="flex"
    }
    clklike.submit();

})
}

