let darkMode = true;

if (localStorage.getItem("dark-mode") != null) darkMode = localStorage.getItem("dark-mode") == "true";

function switchMode() {
    document.body.dataset.bsTheme = darkMode ? "light" : "dark";
    for (const switchElement of document.getElementsByClassName("switch-mode")) {
        switchElement.innerHTML = darkMode ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>';
    }
    localStorage.setItem("dark-mode", darkMode);
    darkMode = !darkMode;
}
for (const switchElement of document.getElementsByClassName("switch-mode")) {
    switchElement.addEventListener("click", switchMode);
}
switchMode();
