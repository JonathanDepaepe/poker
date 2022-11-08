window.addEventListener('DOMContentLoaded', (event) => {
    loginRegisterSwitch();
});

function loginRegisterSwitch() {
    let loginForm = document.querySelector("#login-form");
    let registerForm = document.querySelector("#register-form");
    let loginTab = document.querySelector("#tab-login");
    let registerTab = document.querySelector("#tab-register")

    loginTab.addEventListener("click", function () {
        loginTab.classList.add("active")
        registerTab.classList.remove("active")
        loginForm.classList.add("active", "show");
        registerForm.classList.remove("active", "show");
    })

    registerTab.addEventListener("click", function () {
        loginTab.classList.remove("active")
        registerTab.classList.add("active")
        registerForm.classList.add("active", "show");
        loginForm.classList.remove("active", "show");
    })
}