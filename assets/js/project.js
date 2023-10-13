const technologies = [
    {
        id: 1,
        name: "Node Js",
        icon: `<i class="fa-brands fa-node-js"></i>`,
    },
    {
        id: 2,
        name: "Next Js",
        icon: `<i class="fa-solid fa-n"></i>`,
    },
    {
        id: 3,
        name: "React Js",
        icon: `<i class="fa-brands fa-react"></i>`,
    },
    {
        id: 4,
        name: "TypeScript",
        icon: `<i class="fa-solid fa-code"></i>`,
    },
];

const getTechnologi = (id) => technologies.find((e) => e.id === id);

let projectIdIncrement = 6;

function submitData(event) {
    event.preventDefault();

    // validation
    const isInvalid = (e, title = "") => {
        if (!e.value) {
            alert(`The ${title} filed required`);
            e.focus();
            return true;
        }
        return false;
    };

    const name = document.getElementById("name");
    if (isInvalid(name, "Name")) return false;

    const startDate = document.getElementById("start-date");
    if (isInvalid(startDate, "Start Date")) return false;

    const endDate = document.getElementById("end-date");
    if (isInvalid(endDate, "Description")) return false;

    const description = document.getElementById("description");
    if (isInvalid(description, "End Date")) return false;

    let image = document.getElementById("image");
    if (isInvalid(image, "Upload Image")) return false;

    image = URL.createObjectURL(image.files[0]);
    const technologies = getValueTechnologies();
    if (technologies.length < 1) return alert("Technology must be selected");
    const id = projectIdIncrement++;

    projects.push({
        id: id,
        name: name.value,
        image: image,
        technologies: technologies,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
    });
    rendeProjects();
}

// technologies
function renderTechnologies() {
    const container = document.getElementById("technologies-container");
    let htmlBuilder = "";
    technologies.forEach((e) => {
        htmlBuilder += `
            <div class="d-inline me-3 text-nowrap">
                <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]"/ class="form-check-input">
                <label for="technologies-${e.id}" class="form-check-label">${e.name}</label>
            </div>
        `;
    });
    container.innerHTML = htmlBuilder;
}

function getValueTechnologies() {
    let results = [];
    technologies.forEach((e) => {
        if (document.getElementById(`technologies-${e.id}`).checked) results.push(e);
    });
    return results;
}

// initial page
renderTechnologies();
