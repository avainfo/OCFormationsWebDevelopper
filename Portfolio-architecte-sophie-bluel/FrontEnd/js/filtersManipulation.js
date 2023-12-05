async function loadFilters() {
    const filters = document.getElementById("filters");
    if (!document.cookie.includes("token")) {
        let categories = ""
        categories = await fetch('http://localhost:5678/api/categories')
            .then(resp => resp.json())
            .catch(reason => "");

        const cats = ["Tous"]

        for (let i = 0; i < categories.length; i++) {
            cats.push(categories[i]["name"]);
        }

        for (let cat of cats) {
            filters.appendChild(createFilter(cat));
        }

        setActiveFilter(0);

        for (let i = 0; i < filters.children.length; i++) {
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

function changeFilter(index) {
    const filters = document.getElementById("filters").children;
    if (index !== getActiveFilter()) {
        filters[getActiveFilter()].classList.remove("active");
        setActiveFilter(index);
    }
}

function getActiveFilter() {
    const filters = document.getElementById("filters").children;
    return Array.from(filters).findIndex(filter => filter.classList.contains("active"));
}

function setActiveFilter(index) {
    const filters = document.getElementById("filters").children;
    filters[index].classList.add("active");
}
