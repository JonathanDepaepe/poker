window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#ham-icon").addEventListener("click", loadnav)
});

function loadnav() {
    let main = document.querySelector("main");
    let sideNav = document.querySelector("#sidebar-wrapper");
    if (sideNav.style.display !== "block") {
        sideNav.setAttribute('style', 'display:block !important');
        main.setAttribute('style', 'padding-top:3rem !important');

    } else {
        sideNav.setAttribute('style', 'display:none !important');
    }
    console.log("toggle")
}
