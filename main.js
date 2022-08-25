window.onload = () => {
    if (window.localStorage.getItem("color")) {
        document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"));
        colorsLi.forEach(ele => {
            ele.classList.remove("active")
            if (ele.dataset.color === window.localStorage.getItem("color")) {
                ele.classList.add("active")
            }
        })
    }

    if (window.localStorage.getItem("backgroundImage")) {
        backgroundLi.forEach(ele => {
            ele.classList.remove("active")
            if (ele.dataset.background === window.localStorage.getItem("backgroundImage")) {
                ele.classList.add("active")
            }
        })
    }

    if (window.localStorage.getItem("bullets")) {
        bulletsLi.forEach(ele => {
            ele.classList.remove("active")
            if (ele.dataset.bullet === window.localStorage.getItem("bullets")) {
                ele.classList.add("active")
            }
            if (window.localStorage.getItem("bullets") === "no") {
                bullets.style.display = "none"
            }
            else {
                bullets.style.display = "flex"
            }
        })
    }
}



//burger icon in mobile phone
let burgerIcon = document.querySelector(".toggle-menu")
// menu on clicking on the icon
let links = document.querySelector(".links")
burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("show");
    links.classList.toggle("show")
})




// global variables
let isRandomImgs = true;
let backgroundInterval;


//change background imgs
let landingPage = document.querySelector(".landing-page")

function randomizeImgs() {
    if (isRandomImgs === true) {
        backgroundInterval = setInterval(() => {
            //array of images
            let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]
            //get randome img index
            let randomNum = Math.floor(Math.random() * imgsArray.length)
            //change background url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")'
        }, 8000);
    }
}



// settings box
let gearIcon = document.querySelector(".settings-box i")
let settingsBox = document.querySelector(".settings-box")
gearIcon.addEventListener("click", () => {
    settingsBox.classList.toggle("show")
})



//switch colors
let colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        colorsLi.forEach(ele => {
            ele.classList.remove("active")
        })
        li.classList.add("active")

        //set the color on the root element
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)

        //save colors in local storage
        window.localStorage.setItem("color", e.target.dataset.color)
    })
})


//background change options
let backgroundLi = document.querySelectorAll(".background-list li")

backgroundLi.forEach(li => {
    li.addEventListener("click", (e) => {
        backgroundLi.forEach(ele => {
            ele.classList.remove("active")
        })
        li.classList.add("active")

        if (e.target.dataset.background === "yes") {
            randomizeImgs()
        }
        else {
            clearInterval(backgroundInterval)
        }

        //save colors in local storage
        window.localStorage.setItem("backgroundImage", e.target.dataset.background)
    })
})


//show or hide bullets
let bulletsLi = document.querySelectorAll(".bullets-list li")
let bullets = document.querySelector(".bullets")

bulletsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        bulletsLi.forEach(ele => {
            ele.classList.remove("active")
        })
        li.classList.add("active")

        if (e.target.dataset.bullet === "no") {
            bullets.style.display = "none"
        }
        else {
            bullets.style.display = "flex"
        }
        //save colors in local storage
        window.localStorage.setItem("bullets", e.target.dataset.bullet)
    })
})

// reset button
document.querySelector("button[type=reset]").onclick = () => {
    //we can use clear
    // localStorage.clear()

    //or delete specific items
    localStorage.removeItem("color")
    localStorage.removeItem("backgroundImage")
    localStorage.removeItem("bullets")
    window.location.reload()
}


//skills section on scroll
let skillSection = document.querySelector(".our-skills")
let skillSpans = document.querySelectorAll(".skill-progress span")

window.onscroll = () => {
    if (window.scrollY >= skillSection.offsetTop - 200) {
        skillSpans.forEach((span) => {
            span.style.width = span.dataset.width
        })
    }
}


//gallery imgs pop up
let ourGallery = document.querySelector(".gallery")
let galleryImgs = document.querySelectorAll(".gallery img")

galleryImgs.forEach(img => {
    img.addEventListener("click", () => {
        //pop up overlay
        let popUpOverlay = document.createElement("div")
        popUpOverlay.className = "popup-overlay"
        document.body.appendChild(popUpOverlay)

        //create pop up
        let popup = document.createElement("div")
        popup.className = "popup"
        popUpOverlay.appendChild(popup)

        //create popup img
        let popupImg = document.createElement("img")
        //get me the src of the img
        // console.log(img.src)
        popupImg.src = img.src
        popup.appendChild(popupImg)

        //pop up close button
        let popupClose = document.createElement("span")
        popupClose.className = "popup-close"
        popupClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        popup.appendChild(popupClose)

        popupClose.addEventListener("click", () => {
            popUpOverlay.style.display = "none"
        })
        //close by clicking anywhere
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup-overlay")) {
                popUpOverlay.style.display = "none"
            }
        })

        //create header
        let popupHeader = document.createElement("h3")
        popupHeader.className = "popupHeader"
        popupHeader.textContent = img.alt
        popup.insertAdjacentElement("afterbegin", popupHeader)

    })
})
