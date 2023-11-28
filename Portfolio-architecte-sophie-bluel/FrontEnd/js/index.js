async function load() {
    checkMode();
    await loadFilters();
    await loadWorks();
}
