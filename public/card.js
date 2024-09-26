
const icon = document.querySelectorAll(".dell")
const cancel = document.querySelector(".canx")
const outt = document.querySelector(".outt")
const body = document.querySelector("body")
const noticeid = document.querySelector("#noticeid")
for (icx of icon) {
    icx.addEventListener("click", function () {
        noticeid.value = this.getAttribute("class").slice(5)
        outt.style.display = "flex";
        body.style.overflow = "hidden";
    });
};
cancel.addEventListener("click", () => {
    noticeid.value = ""
    body.style.overflow = "";
    outt.style.display = "";
});
const deleteonebtn = document.querySelectorAll(".delonexx")
for (icx of deleteonebtn) {
    icx.addEventListener("click", function () {

loader.style.display = "flex"
loader.innerText="Removing . . ."
        this.nextElementSibling.submit();
    });
};


// ________________________________________________flash_____________________________________
const cutt = document.querySelector(".successCut");
if (cutt) {
    const flash = document.querySelector(".flash");
    flash.style.transition = ".5s ease"
    
    flash.style.opacity = "1";
    setTimeout(()=>{
        flash.style.opacity="0"
        setTimeout(()=>{flash.style.display="none"},500);

    },3000)

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

actimg.addEventListener("change",()=>{
    if(actimg.value.length===0){
        outimage.style.display="none"
        outimage.children[1].src="";
        outimage.style.display="none"
        save.style.display="none"
        btn.style.display="flex"
    }else{
        const file = actimg.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                outimage.children[1].src = e.target.result;
            }
            reader.readAsDataURL(file)
        }
        outimage.style.display="flex"
            save.style.display="flex"
            btn.style.display="none"
    
    }
})


cutoption.addEventListener("click",function(){
    outimage.style.display="none"
    save.style.display="none"
    btn.style.display="flex"
    outimage.children[1].src="";
    actimg.value="";

})


// _____________________________________________________________laodaer on save____________________________
let loader = document.querySelector(".loader");
let onx = document.querySelector(".one");
let waitt = document.querySelector(".waitt");
let no = 0;
let no2 = 0

save.addEventListener("click",()=>{
    loader.style.display = "flex"
    // const idx = setInterval(() => {
        
    //     if (no2 == 3) {
    //         waitt.style.display = "flex"
    //     } else if (no2 == 10) {
    //         no2 = 0
    //         clearInterval(idx)
    //     }


    //     if (no === 0) {
    //         console.log(no)
    //         vbfg.innerHtml="uploading"
    //         no++;
    //     } else if (no === 1) {console.log(no)
    //         vbfg.innerHtml="uploading . .";
    //         no++;

    //     } else if (no === 2) {console.log(no)
    //         vbfg.innerHtml="uding . . .";
    //         no++;

    //     } else if (no === 3) {console.log(no)
    //         no++;
    //     }  else if (no === 4) {console.log(no)
    //         vbfg.innerHtml="uploading . . ";
    //         no++;

    //     } else if (no === 5) {console.log(no)
    //         vbfg.innerHtml="uploading . ";
    //         no++;

    //     }else {console.log(no)
    //         vbfg.innerHtml="uploading";
    //         no = 0;
    //         no2++
    //     }
    // }, 500);
formofimg.submit();
})
// _____________________________________________________delete post ______________________________________

const button= document.querySelector(".button");

if(button){
    button.addEventListener("click",function(){
        loader.style.display = "flex"
        onx.innerText="Deleating . . ."
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


if(bigdata.childElementCount==1){
    bigdata.style.display="none"
}else if(bigdata.childElementCount>>10){
    sendimg.style.display="none"

}

function firse(){
    for(vbfg of allhu){
 vbfg.style.opacity="1";
if(vbfg.nextElementSibling){
     vbfg.nextElementSibling.style.display="none"
}
    }
}
for(vbfg of allhu){
vbfg.addEventListener("click",function(){
    firse()
    this.style.opacity=".5"
   myDiv.src = this.src;
   if(this.nextElementSibling){
    setTimeout(()=>{this.nextElementSibling.style.display="flex"},200)
   }

})
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
        star.value=rrx.getAttribute("class").slice(9);
    })
}
