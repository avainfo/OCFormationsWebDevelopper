async function openDialog() {
    showDeletingPage();
    dialog.showModal();
    await showArticles();
    dialog.addEventListener('click', handleDialogClick);
}

function handleDialogClick(event) {
    if (event.target === dialog) {
        closeDialog();
        dialog.removeEventListener('click', handleDialogClick);
    }
}

function closeDialog() {
    diagWorks.innerHTML = '';
    dialog.close();
}

function showDeletingPage() {
    dialog.children[1].style.display = "none";
    dialog.children[0].style.display = "flex";
}

async function showAddingPage() {
    dialog.children[0].style.display = "none";
    dialog.children[1].style.display = "unset";

    catInput.innerHTML = ""
    const option = document.createElement("option");
    catInput.appendChild(option);

    const categories = await fetch('http://localhost:5678/api/categories')
        .then((resp) => resp.json());

    categories.forEach((key) => {
        const option = document.createElement("option");
        option.value = key.name;
        option.textContent = key.name;
        catInput.appendChild(option);
    });
}

function openInput() {
    document.getElementsByClassName("input")[0].children[0].click();
}

function updateImage(e) {
    if (e.files.length === 1) {
        const children = e.parentElement.children;
        for (const child of children) {
            child.style.display = "none";
        }
        const [file] = e.files;
        if (file) {
            e.parentElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        }
        updateDialogButton();
    }
}

function updateDialogButton() {
    const input = inputFile.files.length === 1;
    const title = titleInput.value.trim() !== "";
    const cat = catInput.value.trim() !== "";

    const form = dialog.children[1].children[1];
    const button = form.getElementsByTagName("button")[0];
    button.disabled = !(input && title && cat);
}
