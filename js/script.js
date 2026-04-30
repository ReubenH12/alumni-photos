const imageSource = "https://photos.alumni.rjh.nz";
// const imageSource = "R:/Reuben/alumni-photos";
const url = new URL(window.location.href);
const params = new URLSearchParams(window.location.search);
let previousYear = Object.keys(fileStructure)[0];

if (document.querySelector("body").id === "photos") {

const yearButtonList = document.getElementById("year-button-list")
const yearList = document.getElementById("year-list");

for (const year in fileStructure) {
    const newLi = document.createElement("li");
    newLi.setAttribute("id", `button-${year}`)
    yearButtonList.appendChild(newLi);

    newLi.innerHTML = year;
    newLi.addEventListener("click", () => { openYear(year) });

    // For list dropdown 
    const newOption = document.createElement("option");
    yearList.appendChild(newOption);
    newOption.setAttribute("value", year);
    newOption.innerHTML = year;
}

function openYear (year) {

    url.searchParams.set('year', year);
    window.history.pushState({}, '', url);

    document.getElementById(`button-${previousYear}`).classList.remove("selected");
    document.getElementById(`button-${year}`).classList.add("selected");
    previousYear = year;

    const yearTitle = document.getElementById("year-title");
    yearTitle.querySelector("h2").innerHTML = year;
    yearTitle.querySelector("p").innerHTML = `Download PDF for ${year} class photos:`;

    const pdfDownload = yearTitle.querySelector("#pdf-download");
    yearTitle.querySelector("div.balancer").style.width = `${pdfDownload.offsetWidth}px`;
    pdfDownload.querySelector("a").setAttribute("href", `${imageSource}/${year}/${year} Class Photos.pdf`);

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    fileStructure[year].forEach(photo => {
        if (/.+\.jpg/.test(photo)) {

            const newDiv = document.createElement("div");
            gallery.appendChild(newDiv);
            newDiv.setAttribute("class", "image-box");
            newDiv.setAttribute("title", `Open ${photo}`);
            newDiv.addEventListener("click", openPhoto);

            const newImage = document.createElement("img");
            newDiv.appendChild(newImage);
            caption = photo.replace(/\.\w+|(\d+ )/gi, "");
            newImage.setAttribute("src", `${imageSource}/${year}/${photo}`);
            newImage.setAttribute("alt", caption);

            const newP = document.createElement("p");
            newDiv.appendChild(newP);
            newP.innerHTML = caption;
        }
    });
}

// Setup for expanded image
const expandedElmnt = document.getElementById("expanded-overlay");
const expandedImage = expandedElmnt.querySelector("div > img");
const captionElmnt = expandedElmnt.querySelector("div > p");
const closeElmnt = expandedElmnt.querySelector("div > #close-button");

expandedElmnt.addEventListener("click", closePhoto);

const leftButton = expandedElmnt.querySelector("#left-button");
const rightButton = expandedElmnt.querySelector("#right-button");

leftButton.addEventListener("click", switchPhoto);
rightButton.addEventListener("click", switchPhoto);

let originalImage;

function openPhoto (event) {

    originalImage = event.currentTarget.querySelector("img");
    const imageSrc = originalImage.getAttribute("src");
    const imageCaption = originalImage.getAttribute("alt");

    expandedElmnt.style.display = "flex";

    expandedImage.setAttribute("src", imageSrc);
    expandedImage.setAttribute("title", imageCaption)
    expandedImage.setAttribute("alt", imageCaption);
    captionElmnt.innerHTML = imageCaption;

    ["next", "previous"].forEach(function (direction) {
        const isNext = direction === "next";

        const sibling = isNext ? originalImage.parentElement.nextElementSibling : originalImage.parentElement.previousElementSibling;
        const button = isNext ? rightButton : leftButton;

        if (sibling) {
            button.style.display = "initial";
            const adjacentPhotoName = sibling.querySelector("p").innerHTML;
            button.setAttribute("title", `Go to ${direction} photo: ${adjacentPhotoName}`);
        } else {
            button.style.display = "none";
        }
    })
}

function closePhoto (event) {
    if (event.target === expandedElmnt || closeElmnt.contains(event.target)) {
        expandedElmnt.removeAttribute("style");
    }
}

function switchPhoto (event) {
    
    const direction = event.currentTarget.getAttribute("id").replace("-button", "");

    if (direction === "right") {
        originalImage.parentElement.nextElementSibling.click();
    } else {
        originalImage.parentElement.previousElementSibling.click();
    }
}

const yearInput = document.getElementById("year-input");
const selectYearButton = document.getElementById("select-year");
selectYearButton.addEventListener("click", () => { 
    if (fileStructure.hasOwnProperty(yearInput.value)) {
        openYear(yearInput.value);
        yearInput.value = "";
    }
});

if (params.has("year")) {
    openYear(params.get("year"));
} else {
    openYear(2025);
}

}


const linksBox = document.getElementById("external-links");
const logoBox = document.getElementById("footer-logo");

let smallBox;
let bigBox;

if (linksBox.offsetWidth > logoBox.offsetWidth) {
    smallBox = logoBox;
    bigBox = linksBox;
} else {
    smallBox = linksBox;
    bigBox = logoBox;
}

document.fonts.ready.then(() => {
    smallBox.style.width = `${bigBox.offsetWidth}px`;
});


document.getElementById("year-list-gradient").addEventListener("click", () => {
    document.querySelector("#photos aside").classList.toggle("contracted");
});


// navMenuOn = false
hamburgerButton = document.getElementById("hamburger");
navMenu = document.getElementById("menu");

hamburgerButton.addEventListener("click", function() {
    // if (navMenuOn == false) {
    //     navMenuOn = true
    //     drawIndicatorLine(10);
    // } else {
    //     navMenuOn = false
    // }

    navMenu.classList.toggle("opened")
});