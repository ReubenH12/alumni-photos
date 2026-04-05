console.log(fileStructure);

if (document.querySelector("body").id == "photos") {
    for (const year in fileStructure) {
        let newLi = document.createElement("li");
        document.getElementById("year-list").appendChild(newLi);

        newLi.innerHTML = year;
        newLi.setAttribute("onclick", `openYear(${year})`)
    }
}

function openYear (year) {
    console.log(year)
}