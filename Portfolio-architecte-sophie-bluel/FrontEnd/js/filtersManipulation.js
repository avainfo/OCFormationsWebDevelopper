async function loadFilters() {
    const filters = document.getElementById("filters");
    if(sessionStorage.getItem("logged") !== "1") {
        const request = await fetch('http://localhost:5678/api/categories');

        let categories = ""
        await request.text().then((v) => {
            categories = JSON.parse(v);
        });

        const cats = ["Tous"]

        for(let i = 0; i < categories.length; i++) {
            cats.push(categories[i]["name"]);
        }

        for(let cat of cats) {
            filters.appendChild(createFilter(cat));
        }

        setActiveFilter(0);

        for(let i = 0; i < filters.children.length; i++) {
            filters.children[i].onclick = () => {
                changeFilter(i);
                filterFigures(i);
            }
        }
    } else {
        filters.style.display = "none";
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
    const filters = document.getElementById("filters").children;
    if(i !== getActiveFilter()) {
        filters[getActiveFilter()].classList.remove("active");
        setActiveFilter(i)
    }
}

function getActiveFilter() {
    const filters = document.getElementById("filters").children;
    for(let i = 0; i < filters.length; i++) {
        if(filters[i].classList.contains("active")) {
            return i;
        }
    }
}

function setActiveFilter(i) {
    const filters = document.getElementById("filters").children;
    filters[i].classList.add("active");
}
