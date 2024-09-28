
// window.history.replaceState(null, document.title, window.location.href);


const icon = document.querySelectorAll(".dell");
const cancel = document.querySelector(".canx")
const outt = document.querySelector(".outt")
const common = document.querySelector(".common")
const inp1 = document.querySelector("#inp1")
const inp2 = document.querySelector("#inp2")
const fn = document.querySelector("#fn")
const ul = document.querySelector("#ul")


for (icx of icon) {
    icx.addEventListener("click", function () {
        common.removeChild(fn);
        common.removeChild(ul);
        inp2.value = this.getAttribute("class").slice(5);
        outt.style.display = "flex";
        common.children[0].innerHTML="Are you sure!<br> for <b>deleting</b> your review"
        common.action = '/deleteReview';
        loader.children[0].innerText = "Removing review . . .";
        
    });
};

common.addEventListener("submit",()=>{
    
    loader.style.display = "flex"; 
    outt.style.display = "none";
})

cancel.addEventListener("click", () => {  
    outt.style.display = "none";
});

// _________________________________________________________________delete one img__________________________________________----------

const deleteonebtn = document.querySelector(".delonexx")

if(deleteonebtn){
    deleteonebtn.addEventListener("click", function () {
        common.removeChild(inp1);
        common.removeChild(inp2);
         outt.style.display = "flex";
         common.children[0].innerHTML="Are you sure! <br> picture can't <b>restore</b> in future ";
        common.action = `/deleteonepost/${inp1.value}`;
        loader.children[0].innerText = "Removing picture . . .";
        
    });
    
}


// ________________________________________________flash_____________________________________
const cutt = document.querySelector(".successCut");
if (cutt) {
    const flash = document.querySelector(".flash");
    flash.style.transition = ".5s ease"

    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0"
        setTimeout(() => { flash.style.display = "none" }, 500);

    }, 3000)

    function fx() {
        this.parentElement.parentElement.style.display = "none";
        cutt.removeEventListener("click", fx)
    }
    cutt.addEventListener("click", fx)
}
// _______________________________________________add img_____________________________________

const cutoption = document.querySelector(".norm");
const outimage = document.querySelector(".sowim");
const actimg = document.querySelector("#iimmgg");
const btn = document.querySelector(".btn");
const save = document.querySelector(".save");
const formofimg = document.querySelector(".addmoreimg")

let isimg = false;

actimg.addEventListener("change", () => {
    if (actimg.value.length === 0) {
        outimage.style.display = "none"
        outimage.children[1].src = "";
        outimage.style.display = "none"
        save.style.display = "none"
        btn.style.display = "flex"
    } else {
        const file = actimg.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                outimage.children[1].src = e.target.result;
            }
            reader.readAsDataURL(file)
        }
        outimage.style.display = "flex"
        save.style.display = "flex"
        btn.style.display = "none"

    }
})


cutoption.addEventListener("click", function () {
    outimage.style.display = "none"
    save.style.display = "none"
    btn.style.display = "flex"
    outimage.children[1].src = "";
    actimg.value = "";

})


// _____________________________________________________________laodaer on save____________________________

let onx = document.querySelector(".one");
let waitt = document.querySelector(".waitt");
let no = 0;
let no2 = 0

save.addEventListener("click", () => {
    loader.style.display = "flex"
    formofimg.submit();
})
// _____________________________________________________delete post ______________________________________

const button = document.querySelector(".button");

if (button) {
    button.addEventListener("click", function () {
        loader.style.display = "flex"
        onx.innerText = "Deleating . . ."
        this.parentElement.submit();
    })
}
// _______________________________________________________boundary of small img_____________________________________

// const inner = document.querySelector(".inner").getBoundingClientRect().width;
// 
// myDiv.addEventListener("scroll",function(){
//     let my = this.getBoundingClientRect().width;
//     console.log("my: "+this.innerWidth)
// console.log('Width:', inner);
// })
// ____________________________________________________all small img pre_______________________________________

const allhu = document.querySelectorAll(".allimx");
const myDiv = document.querySelector(".imgx")
const bigdata = document.querySelector(".allinone")
const sendimg = document.querySelector(".sndimgv")


if (bigdata.childElementCount == 1) {
    bigdata.style.display = "none"
} else if (bigdata.childElementCount >> 10) {
    sendimg.style.display = "none"

}

function firse() {
    for (vbfg of allhu) {
        vbfg.style.opacity = "1";
        vbfg.style.cursor="pointer"
    }
}
for (vbfg of allhu) {
    vbfg.addEventListener("click", function () {
        firse()
        this.style.opacity = ".5"
        this.style.cursor="no-drop"
        myDiv.src = this.src;
        ul.value = this.src;
        fn.value = this.previousElementSibling.innerText
        

    })
}
// ___________________________________________________________________________________
const re = document.querySelector(".ree")
const feature = re.innerText.split(',').map(item => item.trim()); 
for(fe of feature){
let newp = document.createElement("div")
newp.setAttribute("class","re")
newp.innerText= fe;
re.parentElement.appendChild(newp)
}
// ______________________________________________________rating star_______________________________________

const ratingbox = document.querySelectorAll(".sttar");
const star = document.querySelector("#star");
let str = 1;
let clickk = false;
let clearx = function () {
    for (let rrx of ratingbox) {
        rrx.children[0].style.fill = ""
        rrx.children[1].style.fill = ""
    }
}
for (let rrx of ratingbox) {
    rrx.setAttribute("class", `sttar str${str++}`)
    rrx.addEventListener("click", function () {
        clearx();
        this.children[0].style.fill = "rgb(255, 191, 14)";
        this.children[1].style.fill = "rgb(255, 191, 14)";
        if (this.previousElementSibling !== null) {
            this.previousElementSibling.children[0].style.fill = "rgb(255, 191, 14)";
            this.previousElementSibling.children[1].style.fill = "rgb(255, 191, 14)";
            if (this.previousElementSibling.previousElementSibling !== null) {
                this.previousElementSibling.previousElementSibling.children[0].style.fill = "rgb(255, 191, 14)";
                this.previousElementSibling.previousElementSibling.children[1].style.fill = "rgb(255, 191, 14)";
                if (this.previousElementSibling.previousElementSibling.previousElementSibling !== null) {
                    this.previousElementSibling.previousElementSibling.previousElementSibling.children[0].style.fill = "rgb(255, 191, 14)";
                    this.previousElementSibling.previousElementSibling.previousElementSibling.children[1].style.fill = "rgb(255, 191, 14)";
                    if (this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling !== null) {
                        this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].style.fill = "rgb(255, 191, 14)";
                        this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].style.fill = "rgb(255, 191, 14)";
                    }
                }
            }
        }
        star.value = rrx.getAttribute("class").slice(9);
    })
}

// ________________________________________________________----review submit_________________________________------
const suu = document.querySelector(".suu")
suu.addEventListener("click",function(){
    if(this.parentElement.children[4].value.trim()===""){
        this.parentElement.children[4].style.border="1px solid red"
        this.parentElement.children[4].value=""
    }else{
        loader.style.display="flex";
        loader.children[0].innerText="Review posting . . ."
        this.parentElement.submit();
    }
})

// ________________________________________________________click filters____________________________________________
const fi= document.querySelectorAll(".dekho");
for(let xxv of fi){
xxv.addEventListener("click",function(){
   if(loader){
    loader.style.display = "flex";
        onx.innerText="Searching . . .";
   }
   window.location.href=`/filters/${this.children[1].innerText}`;
})
}