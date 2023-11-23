async function openDialog() {
    const dialog = document.getElementsByTagName("dialog")[0];
    showDeletingPage();
    dialog.showModal();
    const works = await getInstantWorks();
    let i = 0;
    for (const w in works) {
        document.querySelector(".diag-works").appendChild(createArticles(works[w], i, w));
        i++;
    }
    dialog.addEventListener('click', function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

function createArticles(imageUrl, index, w) {
    let article = document.createElement("article");
    let img = document.createElement("img");
    let i = document.createElement("i");

    article.style.gridArea = getPos(index)

    img.src = imageUrl

    i.classList.add("fa-solid")
    i.classList.add("fa-trash-can")
    i.style.color = "white"
    i.onclick = () => deleteWork(w, index);

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

function showAddingPage() {
    document.querySelector("dialog").children[0].style.display = "none";
    document.querySelector("dialog").children[1].style.display = "unset";
}

async function showDeletingPage() {
    document.querySelector("dialog").children[1].style.display = "none";
    document.querySelector("dialog").children[0].style.display = "flex";
    let categories = await fetch('http://localhost:5678/api/categories')
        .then((resp) => resp.text())
        .then((json) => JSON.parse(json));
    for (const key of categories) {
        const option = document.createElement("option");
        option.setAttribute("value", key["name"]);
        option.textContent = key["name"];
        document.getElementsByTagName("select")[0].appendChild(option);
    }
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

async function deleteWork(w, index) {
    const request = await fetch("http://localhost:5678/api/works/" + w, {
        method: "DELETE",
        headers: {
            'Accept': '*/*',
            'Authorization': "Bearer " + document.cookie.replace("token=", "")
        },

    });


    document.getElementsByClassName("diag-works")[0].innerHTML = ""
    console.log(request.statusCode)
    const works = await getInstantWorks();
    let i = 0;
    for (const w in works) {
        document.querySelector(".diag-works").appendChild(createArticles(works[w], i, w));
        i++;
    }
    document.getElementsByClassName("gallery")[0].children[index].innerHTML = "";
}
