async function loadWorks() {
    const request = await fetch("http://localhost:5678/api/works");
    const response = await request.text();
    const jsonResp = JSON.parse(response);
    for (const work of jsonResp) {
        document.getElementsByClassName("gallery")[0].appendChild(createFigure(work["title"], work["imageUrl"]))
        await new Promise(r => setTimeout(r, 100));
        document.querySelector(".gallery figure:last-child").style.opacity = "1";
    }
}

async function getInstantWorks() {
    try {
        const request = await fetch("http://localhost:5678/api/works");
        const response = await request.text();
        const jsonResp = JSON.parse(response);
        const arr = {};
        for (const work of jsonResp) {
            arr[work["id"]] = work["imageUrl"];
        }
        return arr;
    } catch (error) {
        return {};
    }
}


function createFigure(name, imgUrl, opacity = 0) {
    let fig = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");

    figImg.setAttribute("src", imgUrl);
    figImg.setAttribute("alt", name);

    figCaption.textContent = name;

    fig.appendChild(figImg);
    fig.appendChild(figCaption);
    fig.style.opacity = opacity.toString();
    fig.style.transitionDuration = "0.2s";

    return fig;
}

async function filterFigures(categoryID) {
    const galleryChildren = document.getElementsByClassName("gallery")[0].children;
    try {
        const works = await fetch("http://localhost:5678/api/works")
            .then(response => response.text())
            .then((json) => JSON.parse(json));
        let figureID = 0;
        for (let workID in works) {
            if (categoryID !== 0 && works[workID]['categoryId'] !== categoryID) {
                galleryChildren[figureID].style.display = "none"
            } else {
                galleryChildren[figureID].style.display = "block"
            }
            figureID++;
        }
    } catch (error) {
        console.log(error);
    }
}

async function addWork() {
    const imageInput = document.getElementsByClassName("input")[0].children[0];
    const image = imageInput.files[0];
    const title = document.getElementById("title").value;
    const categories = document.getElementById("cat").value;
    const data = new FormData();

    data.append('image', image);
    data.append("title", title);
    data.append("category", ["O", "A", "H"].indexOf(categories[0]) + 1);

    const token = document.cookie.replace("token=", "");

    const request = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: data,
    });

    const response = await request.json();

    document.getElementsByClassName("diag-works")[0].innerHTML = ""
    const works = await getInstantWorks();

    const imageUrl = works[Object.keys(works)[Object.keys(works).length - 1]];

    document.getElementsByClassName("gallery")[0].appendChild(createFigure(title, imageUrl, 1));
    document.getElementsByTagName("dialog")[0].close();
}

async function deleteWork(workID, dialogID) {
    const request = await fetch("http://localhost:5678/api/works/" + workID, {
        method: "DELETE",
        headers: {
            'Accept': '*/*',
            'Authorization': "Bearer " + document.cookie.replace("token=", "")
        },
    });
    document.getElementsByClassName("diag-works")[0].children[dialogID].innerHTML = ""
    await showArticles();
    document.getElementsByClassName("gallery")[0].children[dialogID].remove();
    document.getElementsByTagName("dialog")[0].close();
}
