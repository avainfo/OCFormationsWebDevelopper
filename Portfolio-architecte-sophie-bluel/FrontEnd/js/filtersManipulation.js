async function loadFilters() {
    const filters = document.getElementById("filters");

    if (!document.cookie.includes("token")) {
        try {
            const categories = await fetch('http://localhost:5678/api/categories')
                .then((response) => response.json());

            const cats = ["Tous", ...categories.map(category => category.name)];

            cats.forEach((cat, index) => {
                filters.appendChild(createFilter(cat, index));
            });

            setActiveFilter(0);

            filters.addEventListener('click', event => {
                const index = Array.from(filters.children).indexOf(event.target);
                if (index !== -1) {
                    changeFilter(index);
                    filterFigures(index);
                }
            });
        } catch (error) {
            console.error(error)
        }
    } else {
        filters.style.display = "none";
    }
}

function createFilter(name, index) {
    const filter = document.createElement("div");
    const filterText = document.createElement("p");
    filterText.textContent = name;
    filter.appendChild(filterText);
    filter.addEventListener('click', () => changeFilter(index));
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
