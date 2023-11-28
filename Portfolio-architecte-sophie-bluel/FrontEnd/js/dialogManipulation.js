const MAX_POSITION = 5;

async function showArticles() {
    const works = await getInstantWorks();
    let dialogID = 0;
    let posID = 1;
    for (const workID in works) {
        document.querySelector(".diag-works").appendChild(createArticles(works[workID], dialogID, workID, posID));
        dialogID++;
        posID++;
        if (posID % MAX_POSITION === 0) posID++;
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
