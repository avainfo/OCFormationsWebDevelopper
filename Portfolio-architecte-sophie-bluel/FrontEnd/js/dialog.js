async function openDialog() {
    const dialog = document.getElementsByTagName("dialog")[0];
    showDeletingPage();
    dialog.showModal();
    await showArticles();
    dialog.addEventListener('click', function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

async function showArticles() {
    const works = await getInstantWorks();
    let dialogID = 0;
    let posID = 1;
    for (const workID in works) {
        document.querySelector(".diag-works").appendChild(createArticles(works[workID], dialogID, workID, posID));
        dialogID++;
        posID++;
        if (posID % 5 === 0) posID++
    }
}

function createArticles(imageUrl, dialogID, workID, posID) {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const i = document.createElement("i");

    article.style.gridArea = getPos(posID)

    img.src = imageUrl

    i.classList.add("fa-solid")
    i.classList.add("fa-trash-can")
    i.style.color = "white"
    i.onclick = () => deleteWork(workID, dialogID);

    article.appendChild(img);
    article.appendChild(i);
    return article;
}

function getPos(i) {
    return (Math.floor(i / 5) + 1) + " / " + (i - 5 * Math.floor(i / 5));
}

function closeDialog() {
    document.querySelector(".diag-works").innerHTML = '';
    document.querySelector("dialog").close()
}

async function showAddingPage() {
    document.querySelector("dialog").children[0].style.display = "none";
    document.querySelector("dialog").children[1].style.display = "unset";


    const categories = await fetch('http://localhost:5678/api/categories')
        .then((resp) => resp.text())
        .then((json) => JSON.parse(json));
    for (const key of categories) {
        const option = document.createElement("option");
        option.setAttribute("value", key["name"]);
        option.textContent = key["name"];
        document.getElementById("cat").appendChild(option);
    }
}

function showDeletingPage() {
    document.querySelector("dialog").children[1].style.display = "none";
    document.querySelector("dialog").children[0].style.display = "flex";

}

function openInput() {
    document.querySelector(".input").children[0].click();
}

function updateImage(e) {
    if (e.files.length === 1) {
        const childrens = e.parentElement.children;
        for (const children of childrens) {
            console.log(children)
            children.style.display = "none"
        }
        const [file] = e.files
        if (file) {
            console.log(URL.createObjectURL(file))
            e.parentElement.style.backgroundImage = "url(" + URL.createObjectURL(file) + ")"
        }
        updateDialogButton()
    }
}

function updateDialogButton() {
    const input = document.querySelector(".input > input").files.length === 1;
    const title = document.getElementById("title").value !== "";
    const cat = document.getElementById("cat").value !== "";

    if (input + title + cat === 3) {
        const dialog = document.getElementsByTagName("dialog")[0];
        const form = dialog.children[1].children[1];
        const button = form.getElementsByTagName("button")[0];
        button.disabled = false;
    }
}

async function deleteWork(workID, dialogID) {
    console.log(workID, dialogID)
    const request = await fetch("http://localhost:5678/api/works/" + workID, {
        method: "DELETE",
        headers: {
            'Accept': '*/*',
            'Authorization': "Bearer " + document.cookie.replace("token=", "")
        },
    });
    document.getElementsByClassName("diag-works")[0].children[dialogID].innerHTML = ""
    console.log(request.statusCode)
    await showArticles();
    document.getElementsByClassName("gallery")[0].children[dialogID].remove();
    document.getElementsByTagName("dialog")[0].close();
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
    console.log(response);

    document.getElementsByClassName("diag-works")[0].innerHTML = ""
    console.log(request.statusCode)
    const works = await getInstantWorks();

    const imageUrl = works[Object.keys(works)[Object.keys(works).length - 1]];

    document.getElementsByClassName("gallery")[0].appendChild(createFigure(title, imageUrl, 1));
    document.getElementsByTagName("dialog")[0].close();
}
