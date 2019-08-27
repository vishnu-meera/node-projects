import wiki from 'wikijs';
//const wiki = require('wikijs').default;
 
// wiki().page('Demographics of Germany')
//     .then(page => page.info('Population'))
//     .then(console.log); // Bruce Wayne

// let Population;
// let Gdp;
// function Do(){
//     let page = wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' }).page('Brazil');
//     console.log(page)
// }
// Do();
// console.log(Population,Gdp);

wiki({ apiUrl: 'https://en.wikipedia.org/wiki' })
    .page('List_of_countries_by_GDP_(PPP)_per_capita')
    .then(page => page.info('')) //gdpPpp
    .then(console.log);

//1210854977

//const wdk = require('wikidata-sdk')
