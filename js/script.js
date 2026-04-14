const imageSource = "https://photos.alumni.rjh.nz";
// const imageSource = "./images/Years";
const url = new URL(window.location.href);
const params = new URLSearchParams(window.location.search);


let yearList = document.getElementById("years");
if (document.querySelector("body").id == "photos") {
    for (const year in fileStructure) {
        let newLi = document.createElement("li");
        document.getElementById("year-list").appendChild(newLi);

        newLi.innerHTML = year;
        newLi.addEventListener("click", () => { openYear(year) });

        // For list dropdown 
        let newOption = document.createElement("option");
        yearList.appendChild(newOption);
        newOption.setAttribute("value", year);
        newOption.innerHTML = year;
    }
}

function openYear (year) {

    url.searchParams.set('year', year);
    window.history.pushState({}, '', url);

    gallery = document.getElementById("gallery");
    
    gallery.innerHTML = "";

    fileStructure[year].forEach(photo => {
        if (/.jpg|.jpeg/i.test(photo)) {

            let newDiv = document.createElement("div");
            gallery.appendChild(newDiv);
            newDiv.setAttribute("class", "image-box");
            newDiv.addEventListener("click", openImage);

            let newImage = document.createElement("img");
            newDiv.appendChild(newImage);
            caption = photo.replace(/\.\w+|(\d+ )/gi, "");
            newImage.setAttribute("src", `${imageSource}/${year}/${photo}`);
            newImage.setAttribute("alt", caption);

            let newP = document.createElement("p");
            newDiv.appendChild(newP);
            newP.innerHTML = caption;
        }
    });
}

// Setup for expanded image
let expandedElmnt = document.getElementById("expanded-overlay");
let expandedImage = expandedElmnt.querySelector("div > img");
let captionElmnt = expandedElmnt.querySelector("div > p");
let closeElmnt = expandedElmnt.querySelector("div > #close-button")

expandedElmnt.addEventListener("click", closeImage);

function openImage (event) {

    let originalImage = event.currentTarget.querySelector("img");
    let imageSrc = originalImage.getAttribute("src");
    let imageCaption = originalImage.getAttribute("alt");

    expandedElmnt.style.display = "flex";

    expandedImage.setAttribute("src", imageSrc);
    expandedImage.setAttribute("alt", imageCaption);
    captionElmnt.innerHTML = imageCaption;
}

function closeImage (event) {
    if (event.target == expandedElmnt || event.target == closeElmnt) {
        expandedElmnt.removeAttribute("style");
    }
}

let yearInput = document.getElementById("year-input");
let selectYearButton = document.getElementById("select-year");
selectYearButton.addEventListener("click", () => { 
    if (fileStructure.hasOwnProperty(yearInput.value)) { openYear(yearInput.value) } 
});

if (params.has("year")) {
    openYear(params.get("year"));
} else {
    openYear(1976);
}
