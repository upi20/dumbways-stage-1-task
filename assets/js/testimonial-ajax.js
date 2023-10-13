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
        results += '<i class="fas fa-star text-gold"></i>';
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
            const collection = document.getElementsByClassName("rating-btn");
            for (const ele of collection) ele.classList.remove("active");

            // add active to btn click
            element.classList.add("active");
        }

        let htmlBuilder = "";
        if (dataFilter.length == 0) {
            htmlBuilder = `<h3>Data not found !</h3>`;
        } else {
            dataFilter.forEach((e) => {
                htmlBuilder += `<div class="m-0 box-shadow border-radius project-item">
                <img src="${e.image}" alt="${e.name}" style="width: 100%" />
                <div>
                    <br />
                    ${ratingGenerator(e.rating)}
                    <p class="fs-italic">"${e.comment}"</p>
                </div>
                <br />
                <p class="fw-bold text-right">-${e.name}</p>
            </div>`;
            });
        }
        document.getElementById("projects-list").innerHTML = htmlBuilder;
    } catch (err) {
        console.log(err);
    }
}

renderTestimonial();
