const dataTestiomonials = [
    {
        name: "Handip Yusuf Kurniawan",
        comment: "Waduhh. awok awok awok",
        rating: 2,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        name: "Taufiq Hidayatulloh",
        comment: "Susah untuk di ungkapkan",
        rating: 4,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        name: "Kenanga Ayu Mentari",
        comment: "Aku sudah tak marah",
        rating: 5,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        name: "Adjie Abdul Aziz",
        comment: "Waduh santai santai santai.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
];

function renderTestimonial() {
    let htmlBuilder = "";
    const container = document.getElementById("projects-list");
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
    dataTestiomonials.forEach((e) => {
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

    container.innerHTML = htmlBuilder;
}

renderTestimonial();
