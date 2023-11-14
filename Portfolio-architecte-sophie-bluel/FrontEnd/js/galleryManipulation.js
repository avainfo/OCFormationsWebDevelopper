let figures = {};
let actualFigures = []


function loadWorks() {
    getWorks();
}

async function getWorks() {
    let request = await fetch("http://localhost:5678/api/works");
    let response = await request.text();
    let jsonResp = JSON.parse(response);
    for(const k of jsonResp) {
        document.querySelector(".gallery").appendChild(createFigure(k["title"], k["imageUrl"]))
        figures[k["id"]] = k["categoryId"];
        actualFigures.push(k["id"]);
        await new Promise(r => setTimeout(r, 100));
        document.querySelector(".gallery figure:last-child").style.opacity = "1";
    }
}

async function getInstantWorks() {
    let request = await fetch("http://localhost:5678/api/works");
    let response = await request.text();
    let jsonResp = JSON.parse(response);
    let arr = {};
    for(const k of jsonResp) {
        arr[k["id"]] = k["imageUrl"];
    }
    return arr;
}


function createFigure(name, imgUrl) {
    let fig = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");

    figImg.setAttribute("src", imgUrl);
    figImg.setAttribute("alt", name);

    figCaption.textContent = name;

    fig.appendChild(figImg);
    fig.appendChild(figCaption);
    fig.style.opacity = "0";
    fig.style.transitionDuration = "0.2s";

    return fig;
}

async function filterFigures(i) {
    var gallery = document.querySelector(".gallery").children;


    for(var figure in figures) {
        if(i !== 0) {
            console.log(figures[figure])
            if(figures[figure] !== i) {
                console.log(figure - 1);
                console.log(gallery[figure - 1]);
                gallery[figure - 1].style.display = "none";
            } else {
                gallery[figure - 1].style.display = "unset";
            }
        } else {
            gallery[figure - 1].style.display = "unset";
        }
    }
}