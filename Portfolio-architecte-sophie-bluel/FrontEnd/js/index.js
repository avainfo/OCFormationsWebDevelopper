async function load() {
    await loadFilters();
    await loadWorks();
    checkMode();
}
