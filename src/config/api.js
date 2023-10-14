const Request = require("request");

module.exports = () => {
    return new Promise((resolve, reject) => {
        const api = "https://api.npoint.io/d9394854f516f8c83369";
        Request.get(api, (error, response, body) => {
            if (error) {
                reject("Error Loading Data");
                return console.dir(error);
            }
            if (response.statusCode === 200) {
                resolve(JSON.parse(body));
            } else {
                reject("Error Loading Data");
            }
        });
    });
};
