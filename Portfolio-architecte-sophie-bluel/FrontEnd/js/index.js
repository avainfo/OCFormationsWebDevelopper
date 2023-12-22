document.body.onload = () => {
    load();
    setClickHandlers(document.querySelector(".edition div").children, closeEditing);
    setClickHandlers(document.querySelector(".edit").children, openDialog);
    setClickHandlers([
        document.querySelector("dialog button"),
        document.querySelector("dialog section:nth-child(2) div button")
    ], closeDialog);
    setClickHandlers([document.querySelector(".diag-footer button")], showAddingPage);
    setClickHandlers([document.querySelector(".fa-solid.fa-arrow-left")], showDeletingPage);
    setClickHandlers(document.getElementsByClassName("input"), openInput)
    setClickHandlers([document.querySelector("dialog form button")], addWork)
    document.getElementsByTagName("dialog")[0].onclose = () => closeDialog();
    document.getElementById("file").onchange = () => updateImage(document.getElementById("file"));
    document.getElementById("title").oninput = () => updateDialogButton();
    document.getElementById("cat").onchange = () => updateDialogButton();
}

function setClickHandlers(elements, callBack) {
    for (let child of elements) {
        child.onclick = () => callBack();
    }
}

async function load() {
    checkMode();
    loadFilters();
    loadWorks();
}
