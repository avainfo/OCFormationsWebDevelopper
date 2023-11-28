const MAX_POSITION = 5;

async function showArticles() {
    const works = await getInstantWorks();
    let dialogID = 0;
    let posID = 1;

    for (const workID in works) {
        document.getElementsByClassName("diag-works")[0].appendChild(createArticle(works[workID], dialogID, workID, posID));
        dialogID++;
        posID++;
        if (posID % MAX_POSITION === 0) posID++;
    }
}

function createArticle(imageUrl, dialogID, workID, posID) {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const trashIcon = document.createElement("i");

    article.style.gridArea = getPos(posID);
    img.src = imageUrl;

    trashIcon.classList.add("fa-solid", "fa-trash-can");
    trashIcon.style.color = "white";
    trashIcon.onclick = () => deleteWork(workID, dialogID);

    article.appendChild(img);
    article.appendChild(trashIcon);
    return article;
}

function getPos(i) {
    return `${Math.floor(i / MAX_POSITION) + 1} / ${i - MAX_POSITION * Math.floor(i / MAX_POSITION)}`;
}

function updatePosID(posID) {
    return posID % MAX_POSITION === 0 ? posID + 2 : posID + 1;
}
