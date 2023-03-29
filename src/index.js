import './css/styles.css';
// import cardsCountryTpl from '../src/templates/countries-card.hbs';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const countryInputEL = document.querySelector('#search-box');
const countryListEL = document.querySelector('.country-list');

countryInputEL.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);

function fetchCountries(name) {
  if (!countryInputEL.value.trim()) {
    countryListEL.innerHTML = '';
    return;
  }
  console.log('countryInputEL.value: ', countryInputEL.value);

  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const FIELDS = '?fields=name,capital,population,flags,languages';

  fetch(`${BASE_URL}${countryInputEL.value.trim()}${FIELDS}`)
    .then(response => {
      if (!response.ok) {
        countryListEL.innerHTML = '';
        Notiflix.Notify.failure(`Oops, there is no country with that name'`);
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
      console.log('data: ', data);

      if (data.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.'`
        );
        return;
      } else if (data.length > 2) {
        countryListEL.innerHTML = '';
        const createMarkup = data
          .map(
            ({ name, flags }) =>
              `
      <div class='cards__item'>
        <div class="cards__wraper">
          <img class='cards__flag' src=${flags.svg} alt="${flags.alt}" height="20">
          <h2 class='cards__official'>${name.common}</h2>
        </div>
      </div>`
          )
          .join('');

        countryListEL.insertAdjacentHTML('afterbegin', createMarkup);
      } else {
        countryListEL.innerHTML = '';
        const createMarkup = data
          .map(
            ({ name, capital, population, flags, languages }) =>
              `
      <div class='cards__item'>
        <div class="cards__wraper">
          <img class='cards__flag' src=${flags.svg} alt="${
                flags.alt
              }" height="20">
          <h2 class='cards__official'>${name.official}</h2>
        </div>
        <p class='cards__capital'><span class="cards__bold">Capital: </span>${capital}</p>
        <p class='cards__population'><span class="cards__bold">Population: </span>${population}</p>
        <p class='cards__languages'><span class="cards__bold">Languages: </span>${createLanguagesList(
          languages
        )}</p>
      </div>`
          )
          .join('');

        countryListEL.insertAdjacentHTML('afterbegin', createMarkup);
      }

      function createLanguagesList(language) {
        let languagesValue = '';
        for (const key in language) {
          languagesValue += `${language[key]}, `;
        }
        return languagesValue.slice(0, -2);
      }
    })
    .catch(error => {
      console.warn(error);
    });
}
