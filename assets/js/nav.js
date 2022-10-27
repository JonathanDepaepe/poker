window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#ham-icon").addEventListener("click", loadnav)
});

function loadnav() {
    let sideNav = document.querySelector("#sidebar-wrapper");
    if (sideNav.style.display !== "block") {
        sideNav.setAttribute('style', 'display:block !important');
    } else {
        sideNav.setAttribute('style', 'display:none !important');
    }
    console.log("toggle")
}
