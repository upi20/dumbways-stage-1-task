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
        startDate: "2023-01-10",
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

function durationCalculate(startDate, endDate) {
    let diff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000; // - 1000 to second
    if (diff < 0) return "Date not valid";
    let results = "";
    const times = [
        { max: 31104000, name: "Year" },
        { max: 2592000, name: "Month" },
        { max: 604800, name: "Week" },
        { max: 86400, name: "Day" },
        { max: 3600, name: "Hour" },
        { max: 60, name: "Minute" },
        { max: 1, name: "Second" },
    ];
    times.forEach((time) => {
        if (diff >= time.max) {
            results += `${Math.floor(diff / time.max)} ${time.name} `;
            diff %= time.max;
        }
    });
    return results;
}

function rendeProjects() {
    let htmlBuilder = "";
    const container = document.getElementById("projects-list");
    const technologiesBuilder = (technologies) => {
        return technologies.reduce((a, b) => {
            return a + `<span class="fs-2 me-3">${b.icon}</span>`;
        }, "");
    };

    projects.forEach((e) => {
        htmlBuilder += `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="card border-0 shadow-sm mb-4 card-hover">
                <div class="card-body">
                    <img src="${e.image}" alt="${e.name}" class="w-100 rounded" />
                    <div class="mt-2">
                        <a class="h5 fw-bold text-decoration-none" href="/project-detail.html" class="project-link">
                        ${e.name}
                        </a>
                        <p>${durationCalculate(e.startDate, e.endDate)}</p>
                        <p>${e.description}</p>
                    </div>
                    <div class="py-2">
                        ${technologiesBuilder(e.technologies)}
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <a href="#" class="btn btn-primary rounded w-100">Edit</a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-danger rounded w-100">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = htmlBuilder;
}

rendeProjects();
