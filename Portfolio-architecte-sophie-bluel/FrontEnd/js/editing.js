function checkMode() {
    if(document.cookie.startsWith("token")) {
        document.querySelector(".edition").style.display = "flex";
        document.querySelector(".edit").style.display = "flex";
        document.querySelector(".spacer").style.flex = "1";
        document.querySelector("#filters").style.display = "none";
    } else {
        document.querySelector(".spacer").style.flex = "0";
    }
}

function closeEditing() {
    sessionStorage.clear();
    document.querySelector(".edition").style.display = "none";
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".spacer").style.flex = "0";
    document.querySelector("#filters").style.display = "flex";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    loadFilters();
}
