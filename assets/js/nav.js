window.addEventListener('DOMContentLoaded', (event) => {
    loadNav();
    document.querySelector("#ham-icon").addEventListener("click", loadMobileNav)
});

function loadMobileNav() { //Mobile
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

function loadNav (){
    document.querySelector("nav").innerHTML = `
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" id="sidebar-wrapper" style="width: 280px; ">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img class="bi pe-none me-2" width="40" height="40" src="assets/images/logo.png" alt="HPTM logo">
            <span class="fs-4">Poker Manager</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="index.html" id="index-page" class="nav-link text-white" aria-current="page">
                    <img class="bi pe-none me-2" width="16" height="16" src="assets/images/icons/home-icon.svg"  alt="Home icon">
                    Home
                </a>
            </li>
            <li>
                <a href="#" id="club-page" class="nav-link text-white">

                    <img src="assets/images/icons/club-icon.svg" class="bi pe-none me-2" width="16" height="16" alt="club icon">
                    Club
                </a>
            </li>
            <li>
                <a href="#" id="leagues-page" class="nav-link text-white">
                    <img src="assets/images/icons/leagues-icon.svg" alt="Legues icon" class="bi pe-none me-2" width="16" height="16">
                    Leagues
                </a>
            </li>
            <li>
                <a href="#" id="tournaments-page" class="nav-link text-white">
                    <img class="bi pe-none me-2" width="16" height="16" src="assets/images/icons/tournaments-icon.svg" alt="Tournament icon">
                    Tournaments
                </a>
            </li>
        </ul>
        <hr>
        ${checkUser()}
    </div>
    <a id="ham-icon" href="#">
        <img src="assets/images/icons/hamburger.svg" alt="Hamburger icon">
    </a>
</nav>
`
    navSelect()
}

function navSelect(){
    const page = window.location.href
        .split("/")
        .slice(-1)[0]
        .replace(".html", "-page");

    document.querySelector(`#${page}`).classList += " active";
}

function checkUser(){
    const USERLOGGEDIN = false;
    if (USERLOGGEDIN){
        return `<div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="PROFILE PICTURE" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>mdo</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>`
    }else{
        return `<ul class="nav nav-pills flex-column">
            <li class="nav-item">
                <a href="login.html" id="login-page" class="nav-link text-white" aria-current="page">
                    <img src="assets/images/icons/profile-icon.svg" class="bi pe-none me-2" width="16" height="16" alt="Profile icon">
                    Login / Register
                </a>
            </li>
        </ul>`

    }
}


