async function loadFilters() {
    let filters = document.getElementById("filters");
    let request = await fetch('http://localhost:5678/api/categories', {
        method: "GET" // default, so we can ignore
    });

    let categories = ""
    await request.text().then((v) => {
        categories = JSON.parse(v);
    });

    let cats = ["Tous"]

    for(let i = 0; i < categories.length; i++) {
        cats.push(categories[i]["name"]);
    }

    for(let cat of cats) {
        filters.appendChild(createFilter(cat));
        console.log(cat);
    }


    console.log(cats)

    setActiveFilter(0);

    for(let i = 0; i < filters.children.length; i++) {
        filters.children[i].onclick = () => changeFilter(i)
    }
}

function createFilter(name) {
    const filter = document.createElement("div");
    const filterText = document.createElement("p");
    filterText.textContent = name;
    filter.appendChild(filterText);
    return filter;
}

function changeFilter(i) {
    let filters = document.getElementById("filters").children;
    if(i !== getActiveFilter()) {
        filters[getActiveFilter()].classList.remove("active");
        setActiveFilter(i)
    }
}

function getActiveFilter() {
    let filters = document.getElementById("filters").children;
    for(let i = 0; i < filters.length; i++) {
        if(filters[i].classList.contains("active")) {
            return i;
        }
    }
}

function setActiveFilter(i) {
    let filters = document.getElementById("filters").children;
    filters[i].classList.add("active");
}