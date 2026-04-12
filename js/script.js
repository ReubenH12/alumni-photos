const imageSource = "https://photos.alumni.rjh.nz";
// const imageSource = "./images/Years";
const url = new URL(window.location.href);
const params = new URLSearchParams(window.location.search);

if (document.querySelector("body").id == "photos") {
    for (const year in fileStructure) {
        let newLi = document.createElement("li");
        document.getElementById("year-list").appendChild(newLi);

        newLi.innerHTML = year;
        newLi.addEventListener("click", () => { openYear(year) });
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


function openImage (event) {
    let originalImage = event.currentTarget.querySelector("img");
    let imageSrc = originalImage.getAttribute("src");
    let imageCaption = originalImage.getAttribute("alt");

    expandedElmnt.style.display = "flex";

    expandedImage.setAttribute("src", imageSrc);
    expandedImage.setAttribute("alt", imageCaption);
    captionElmnt.innerHTML = imageCaption;

    document.addEventListener("click", closeImage, true);
}

function closeImage (event) {
    if (!expandedElmnt.contains(event.target) || closeElmnt.contains(event.target)) {
        expandedElmnt.removeAttribute("style");
        document.removeEventListener("click", closeImage, true);
    }
}

if (params.has("year")) {
    openYear(params.get("year"));
} else {
    openYear(1976);
}
