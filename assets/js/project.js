const projects = [
    {
        id: 1,
        name: "Dumbsway Mobile App - 2021",
        image: "./assets/img/projects/1.png",
        technologies: [
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
        ],
        startDate: "2023-01-01",
        endDate: "2023-05-01",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magnam repellendus magni beatae! Aspernatur nisi facilis illum 
        inventore consequatur neque minus est.`,
    },
    {
        id: 2,
        name: "Dumbsway Mobile App - 2021",
        image: "./assets/img/projects/2.png",
        technologies: [
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
                id: 4,
                name: "TypeScript",
                icon: `<i class="fa-solid fa-code"></i>`,
            },
        ],
        startDate: "2023-01-01",
        endDate: "2023-05-01",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magnam repellendus magni beatae! Aspernatur nisi facilis illum 
        inventore consequatur neque minus est.`,
    },
    {
        id: 3,
        name: "Dumbsway Mobile App - 2021",
        image: "./assets/img/projects/3.png",
        technologies: [
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
        ],
        startDate: "2023-01-01",
        endDate: "2023-05-01",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magnam repellendus magni beatae! Aspernatur nisi facilis illum 
        inventore consequatur neque minus est.`,
    },
    {
        id: 4,
        name: "Dumbsway Mobile App - 2021",
        image: "./assets/img/projects/4.png",
        technologies: [
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
                id: 4,
                name: "TypeScript",
                icon: `<i class="fa-solid fa-code"></i>`,
            },
        ],
        startDate: "2023-01-01",
        endDate: "2023-05-01",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magnam repellendus magni beatae! Aspernatur nisi facilis illum 
        inventore consequatur neque minus est.`,
    },
    {
        id: 5,
        name: "Dumbsway Mobile App - 2021",
        image: "./assets/img/projects/5.png",
        technologies: [
            {
                id: 1,
                name: "Node Js",
                icon: `<i class="fa-brands fa-node-js"></i>`,
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
        ],
        startDate: "2023-01-01",
        endDate: "2023-05-01",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magnam repellendus magni beatae! Aspernatur nisi facilis illum 
        inventore consequatur neque minus est.`,
    },
];

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

function rendeProjects() {
    let htmlBuilder = "";
    const container = document.getElementById("projects-list");
    const technologiesBuilder = (technologies) => {
        return technologies.reduce((a, b) => {
            return a + b.icon;
        }, "");
    };

    projects.forEach((e) => {
        htmlBuilder += `
        <div class="m-0 ml-24 box-shadow border-radius project-item">
            <img src="${e.image}" alt="${e.name}" style="width: 100%" />
            <div>
                <h1>${e.name}</h1>
                <p>${e.startDate} - ${e.endDate}</p>
                <br />
                <p>${e.description}</p>
            </div>
            <div class="technologies">
                ${technologiesBuilder(e.technologies)}
            </div>
            <div class="project-btn">
                <a href="#" class="btn btn-black border-radius text-center">Edit</a>
                <a href="#" class="btn btn-black border-radius text-center">Delete</a>
            </div>
        </div>
        `;
    });

    container.innerHTML = htmlBuilder;
}

// technologies
function renderTechnologies() {
    const container = document.getElementById("technologies-container");
    let htmlBuilder = "";
    technologies.forEach((e) => {
        htmlBuilder += `
            <div class="d-inline mr-8">
                <input type="checkbox" id="technologies-${e.id}" name="technologies[${e.id}]"/>
                <label for="technologies-${e.id}">${e.name}</label>
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
rendeProjects();
