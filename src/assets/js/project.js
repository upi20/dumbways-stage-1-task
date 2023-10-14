// get all element technologies
const technologies = document.getElementsByClassName("technologies");
const imageDefault = document.getElementById("image-default").value;
let previewImage = document.getElementById("preview-image");

function changeImage() {
    let image = document.getElementById("image");
    if (image.value) {
        image = URL.createObjectURL(image.files[0]);
        previewImage.src = image;
        previewImage.classList.remove("d-none");
        previewImage.classList.add("d-block");
    } else {
        previewImage.classList.add("d-none");
        previewImage.classList.remove("d-block");
        checkImageDefault();
    }
}

function checkImageDefault() {
    if (imageDefault !== "") {
        previewImage.src = imageDefault;
        previewImage.classList.remove("d-none");
        previewImage.classList.add("d-block");
    }
}

function refreshTechnologies() {
    const tecChecked = [];
    for (tech of technologies) {
        if (tech.checked) tecChecked.push(Number(tech.dataset.id));
    }

    document.getElementById("technologies").value = JSON.stringify(tecChecked);
}

for (tech of technologies) tech.addEventListener("change", refreshTechnologies);

refreshTechnologies();
checkImageDefault();
