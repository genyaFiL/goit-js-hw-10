export class FetchCountriesAPI {
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #BASE_URL = 'https://api.unsplash.com';
}
const API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
const BASE_URL = 'https://api.unsplash.com';
fetchCountries(name);
function fetchCountries(name) {
  fetch('https://restcountries.com/v3.1/name/{name}')
    .then(response => {
      // Response handling
    })
    .then(data => {
      // Data handling
    })
    .catch(error => {
      // Error handling
    });
}
