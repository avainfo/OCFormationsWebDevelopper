async function openDialog() {
    document.querySelector("dialog").showModal();
    const works = await getInstantWorks();
    console.log(works[11]);
    for(const w in works) {
        document.querySelector(".diag-works").appendChild(createArticles(works[w], w));
        await new Promise(r => setTimeout(r, 100));
    }
}

function createArticles(imageUrl, index) {
    let article = document.createElement("article");
    let img = document.createElement("img");
    let i = document.createElement("i");

    article.style.gridArea = getPos(index)

    img.src = imageUrl

    i.classList.add("fa-solid")
    i.classList.add("fa-trash-can")
    i.style.color = "white"

    article.appendChild(img);
    article.appendChild(i);
    return article;
}

function getPos(i) {
    return (Math.floor(i / 5) + 1) + " / " + (i - 5 * Math.floor(i / 5));
}