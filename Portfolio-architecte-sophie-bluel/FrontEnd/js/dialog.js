async function openDialog() {
    const dialog = document.getElementsByTagName("dialog")[0];
    showDeletingPage();
    dialog.showModal();
    await showArticles();
    dialog.addEventListener('click', handleDialogClick);
}

function handleDialogClick(event) {
    const dialog = document.getElementsByTagName("dialog")[0];
    if (event.target === dialog) {
        closeDialog();
        dialog.removeEventListener('click', handleDialogClick);
    }
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
            children.style.display = "none"
        }
        const [file] = e.files
        if (file) {
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
