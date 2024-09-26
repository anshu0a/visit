//____________________________________________show all filter 
const whole = ['Pools', 'Farms', 'Beachs', 'Lakes', 'Secure', 'Parking', 'Fresh area', 'Tour', 'Castles', 'Rooms', 'Warehouse', 'Tree house', 'Camping', 'Mountain', 'Games', 'Cave', 'Skiings', 'House boat', 'Tower', 'Under sea', 'Space', 'Camper van', 'Snow']
const sample = document.querySelector(".sample")
const options = document.querySelector(".options")
for (who of whole) {
    let newp = document.createElement("div")
    newp.setAttribute("class", "opn addx");
    newp.innerHTML = sample.innerHTML;
    newp.children[0].innerText = who;
    options.appendChild(newp);
}

// _____________________________________________cut image____________________________________________
const cutoption = document.querySelector(".norm");
const outimage = document.querySelector(".sowim");
const actimg = document.querySelector("#actimg");

actimg.addEventListener("change", () => {
    if (actimg.value.length === 0) {
        outimage.style.display = "none"
        outimage.children[1].src = "";
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

    }
})


cutoption.addEventListener("click", () => {
    outimage.style.display = "none"
    outimage.children[1].src = "";
    actimg.value = "";

})
// _______________________________________________________________filter__________________________________________
const opn = document.querySelectorAll(".opn");
const gofilt = document.querySelector("#filters")
let filterx = [];
for (xxv of opn) {
    xxv.addEventListener("click", function () {
        if (this.getAttribute("class") === "opn addx") {
            filterx.push(this.children[0].innerText)
            gofilt.value = [filterx];

            this.setAttribute("class", ("opn cutx"))
        } else if (this.getAttribute("class") === "opn cutx") {
            filterx = filterx.filter(item => item !== this.children[0].innerText);
            gofilt.value = [filterx];

            this.setAttribute("class", ("opn addx"))
        }

    })
}


//___________________________________________________________________________check valid or not____________________________________________
const loader = document.querySelector(".loader");
const fm = document.querySelector(".form");
const xtitle = document.querySelector("#titlex");
const xcountry = document.querySelector("#country");
const xprice = document.querySelector("#price");
const xlocation = document.querySelector("#location");
const xdec = document.querySelector("#description");
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
        warn.children[1].innerText = "Select filters"
    } else {
        warn.style.display = "none"
        warn.children[1].innerText = ""
        loader.style.display = "flex"
        fm.submit();
        
    }
})