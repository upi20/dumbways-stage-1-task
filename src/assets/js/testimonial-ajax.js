const dataTestiomonials = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/d9394854f516f8c83369", true); // http method, url addres, status async.

    xhr.onload = function () {
        if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
        } else {
            reject("Error Loading Data");
        }
    };

    xhr.onerror = function () {
        reject("Network error");
    };

    xhr.send();
});

const ratingGenerator = (rating = 5) => {
    let counter = 1;
    let results = "";
    // gold star
    while (counter <= rating && counter <= 5) {
        results += '<i class="fas fa-star text-warning"></i>';
        counter++;
    }

    // light star
    while (counter <= 5) {
        results += '<i class="fas fa-star text-light"></i>';
        counter++;
    }

    return results;
};

async function renderTestimonial(element = null) {
    try {
        const response = await dataTestiomonials;
        let dataFilter = response;

        // if data filter
        if (element != null) {
            const rating = element.dataset.rating;
            if (rating != "") dataFilter = response.filter((e) => e.rating == rating);

            // remove all active
            const collection = document.getElementById("btn-ratings").children;
            for (const ele of collection) {
                if (ele != element) {
                    ele.classList.remove("btn-primary");
                    ele.classList.add("btn-secondary");
                } else {
                    ele.classList.add("btn-primary");
                    ele.classList.remove("btn-secondary");
                }
            }
        }

        let htmlBuilder = "";
        if (dataFilter.length == 0) {
            htmlBuilder = `<h3 class="text-center">Data not found !</h3>`;
        } else {
            dataFilter.forEach((e) => {
                htmlBuilder += `
                    <div class="col-xl-3 col-lg-4 col-md-6">
                        <div class="card border-0 shadow-sm mb-4 card-hover">
                            <div class="card-body">
                                <img src="${e.image}" alt="${e.name}" class="w-100 rounded" />
                                <div class="mt-2"> ${ratingGenerator(e.rating)} </div>
                                <p class="fst-italic mt-2">${e.comment}</p>
                                <p class="fw-bold text-end">-${e.name}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        document.getElementById("projects-list").innerHTML = htmlBuilder;
    } catch (err) {
        console.log(err);
    }
}

renderTestimonial();
