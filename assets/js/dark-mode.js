let darkMode = true;
function switchMode() {
    document.body.dataset.bsTheme = darkMode ? "light" : "dark";
    for (const switchElement of document.getElementsByClassName("switch-mode")) {
        switchElement.innerHTML = darkMode ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>';
    }

    darkMode = !darkMode;
}
for (const switchElement of document.getElementsByClassName("switch-mode")) {
    switchElement.addEventListener("click", switchMode);
}
switchMode();
