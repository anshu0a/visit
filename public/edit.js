//____________________________________________show all filter 
const whole = ['Pools', 'Farms', 'Beachs','Secure','Parking','Fresh area', 'Lakes', 'Castles','Tour', 'Rooms', 'Warehouse',  'Tree house', 'Camping', 'Mountain', 'Games', 'Cave', 'Skiings', 'House boat', 'Tower', 'Under sea', 'Space', 'Camper van', 'Snow']
const sample = document.querySelector(".sample")
const options = document.querySelector(".options")
for(who of whole ){
   let newp =  document.createElement("div")
   newp.setAttribute("class","opn addx");
   newp.innerHTML = sample.innerHTML;
   newp.children[0].innerText = who;
    options.appendChild(newp);
}
// ___________________________________________________________________upload img____________________________________________________________________
let actimg = document.querySelector("#actimg");
let showimgg = document.querySelector(".showimgg");
actimg.addEventListener("change", () => {
    const file = actimg.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            showimgg.src = e.target.result;
        }
        reader.readAsDataURL(file)
    }
})

// _________________________________________________submit___________________________________________________

const fm = document.querySelector(".form");
const xtitle = document.querySelector("#tit");
const xcountry = document.querySelector("#cou");
const xprice = document.querySelector("#pri");
const xlocation = document.querySelector("#loc");
const xdec = document.querySelector("#dec");
const warn = document.querySelector(".warn");

document.querySelector(".clk").addEventListener("click", function () {
    if (xtitle.value.length === 0) {
        warn.style.display = "flex"
        warn.children[1].innerText = "Enter title"
    } else if (xcountry.value.length === 0) {
        warn.style.display = "flex"
        warn.children[1].innerText = "Enter country name"
    } else if (xprice.value.length === 0) {
        warn.style.display = "flex"
        warn.children[1].innerText = "Enter price"
    } else if (xlocation.value.length === 0) {
        warn.style.display = "flex"
        warn.children[1].innerText = "Enter location of your post"
    } else if (xdec.value.length === 0) {
        warn.style.display = "flex"
        warn.children[1].innerText = "Enter description"
    } else if (gofilt.value.length === 0) {
        warn.style.display = "flex"
        warn.children[1].innerText = "Select any filters"
    } else {
        warn.style.display = "none"
        warn.children[1].innerText = ""
        loader.style.display = "flex"
        fm.submit();
        
    }
})



// _______________________________________________________________filter__________________________________________
const opn = document.querySelectorAll(".opn");
const gofilt = document.querySelector("#filters")
let filterx = gofilt.value.split(',').map(item => item.trim());
for(xxv of opn){
    if (filterx.includes(xxv.children[0].innerText)) {
        xxv.setAttribute("class",("opn cutx"))
    }
    xxv.addEventListener("click",function(){
        if(this.getAttribute("class")==="opn addx"){
            filterx.push(this.children[0].innerText)
            gofilt.value = [filterx];
            
            this.setAttribute("class",("opn cutx"))
        }else if(this.getAttribute("class")==="opn cutx"){
            filterx = filterx.filter(item => item !==this.children[0].innerText );
            gofilt.value = [filterx];
            
            this.setAttribute("class",("opn addx"))
        }
    })
}