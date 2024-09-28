//_________________________________________________________filter scroll
const outfilter = document.querySelector(".outfilter")
const leftxx= document.querySelector(".left")
const rightxx = document.querySelector(".right")

function rightx() {
    outfilter.scrollBy({ left: (outfilter.clientWidth - 30), behavior: 'smooth' });
    setTimeout(()=>{checkScrollPosition()},600)
}
function leftx() {
    outfilter.scrollBy({ left:-(outfilter.clientWidth - 30), behavior: 'smooth' });
    setTimeout(()=>{checkScrollPosition()},600)
}
function checkScrollPosition() {
    const maxScrollLeft = outfilter.scrollWidth - outfilter.clientWidth;
    if (outfilter.scrollLeft <= 5) {
        leftxx.style.visibility="hidden";
        rightxx.style.visibility="visible";

    } else if (outfilter.scrollLeft >= (maxScrollLeft-5)) {
        leftxx.style.visibility="visible";
        rightxx.style.visibility="hidden";
    } else {
       leftxx.style.visibility="visible";
        rightxx.style.visibility="visible";
    }
}

//_________________________________________________________submit form____________________________

const filt= document.querySelectorAll(".filt");
for(let xxv of filt){
xxv.addEventListener("click",function(){
   if(loader){
    loader.style.display = "flex";
        loader.children[0].innerText=`Searching filter ${this.children[1].innerText} . . .`;
   }
   window.location.replace(`/filters/${this.children[1].innerText}`);
})
}

// ______________________________________________selected filter___________________________________________
const fill = document.querySelector(".fillx")
    for(let xxv of filt){
       if(xxv.children[1].innerText === fill.value){
xxv.style.borderBottom="2px solid black";
xxv.style.background="none";
outfilter.scrollBy({ left:(xxv.getBoundingClientRect().left - 110), behavior: 'smooth' });
setTimeout(()=>{checkScrollPosition()},600);
xxv.children[0].style.fill="black";
xxv.children[1].style.color="black";
       }
        }
