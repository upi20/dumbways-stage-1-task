module.exports = (startDate, endDate) => {
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
};
