const imageSource = "https://photos.alumni.rjh.nz";
// const imageSource = "./images/Years";
const url = new URL(window.location.href);
const params = new URLSearchParams(window.location.search);

if (document.querySelector("body").id == "photos") {
    for (const year in fileStructure) {
        let newLi = document.createElement("li");
        document.getElementById("year-list").appendChild(newLi);

        newLi.innerHTML = year;
        newLi.setAttribute("onclick", `openYear(${year})`)
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
            newDiv.setAttribute("class", "image-box")

            let newImage = document.createElement("img");
            newDiv.appendChild(newImage);
            newImage.setAttribute("src", `${imageSource}/${year}/${photo}`);

            let newP = document.createElement("p");
            newDiv.appendChild(newP);
            caption = photo.replace(/\.\w+|(\d+ )/gi, "");
            newP.innerHTML = caption;
        }
    });
    
}

if (params.has("year")) {
    openYear(params.get("year"));
} else {
    openYear(1976);
}
