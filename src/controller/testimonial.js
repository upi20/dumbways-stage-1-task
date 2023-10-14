const testimonial = require("../config/api");

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

const ratingHtmlBuilder = (rating = null) => {
    let results = "";
    for (let i = 0; i <= 5; i++) {
        if (i == 0) {
            results += `<a href="/testimonial" class="btn btn-${
                rating == null ? "primary" : "secondary"
            } me-2 mt-2">All</a>`;
        } else {
            results += `<a href="/testimonial?rating=${i}" class="btn btn-${
                rating == i ? "primary" : "secondary"
            } me-2 mt-2"><i class="fa-solid fa-star"></i> ${i}</a>`;
        }
    }

    return results;
};

module.exports = async (req, res) => {
    let datas = (await testimonial().catch((error) => console.error(error))) ?? [];

    const rating = req.query.rating ?? null;
    if (rating) datas = datas.filter((e) => e.rating == rating);
    const testimonials = datas.map((e) => {
        e.ratingHtml = ratingGenerator(e.rating);
        return e;
    });
    const ratingHtml = ratingHtmlBuilder(rating);
    res.render("testimonials", { testimonials, ratingHtml, dataNotFound: testimonials.length == 0 });
};
