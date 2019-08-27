const { getCode,getData } = require('country-list');
const   countriesStatusList = {
        "Brazil": 3,
        "Germany": 1,
        "India": 2,
        "South Africa": 4,
        "United States": 1,
        "United Kingdom": 1
    };

const keys = Object.keys(countriesStatusList);

keys.forEach(element => {
    console.log(getCode(element))
});
