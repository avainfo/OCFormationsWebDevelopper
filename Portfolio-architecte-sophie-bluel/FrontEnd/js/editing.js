function checkMode() {
    if(document.cookie.startsWith("token")) {
        document.getElementsByClassName("edition")[0].style.display = "flex";
        document.getElementsByClassName("edit")[0].style.display = "flex";
        document.getElementsByClassName("spacer")[0].style.flex = "1";
        document.getElementById("filters").style.display = "none";
    } else {
        document.getElementsByClassName("spacer")[0].style.flex = "0";
    }
}

async function closeEditing() {
    sessionStorage.clear();
    document.getElementsByClassName("edition")[0].style.display = "none";
    document.getElementsByClassName("edit")[0].style.display = "none";
    document.getElementsByClassName("spacer")[0].style.flex = "0";
    document.getElementById("filters").style.display = "flex";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    await loadFilters();
}
