let menuIsOpen = false;
function expandMenu(btn) {
    const navMobile = document.getElementById("nav-mobile");
    if (!menuIsOpen) {
        navMobile.classList.remove("d-none");
        btn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        navMobile.classList.add("d-none");
        btn.innerHTML = '<i class="fas fa-bars"></i>';
    }

    menuIsOpen = !menuIsOpen;
}
