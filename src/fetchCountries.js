import Notiflix from 'notiflix';

const countryListEL = document.querySelector('.country-list');
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = '?fields=name,capital,population,flags,languages';

export const fetchCountries = searchCountry => {
  if (!searchCountry) {
    removeAddedMarkup();
    return;
  }

  fetch(`${BASE_URL}${searchCountry}${FIELDS}`)
    .then(response => {
      if (!response.ok) {
        removeAddedMarkup();
        Notiflix.Notify.failure(`Oops, there is no country with that name'`);
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        removeAddedMarkup();
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.'`
        );
        return;
      } else if (data.length > 2) {
        removeAddedMarkup();
        createMarkupFoundCountries(data);
      } else {
        removeAddedMarkup();
        createMarkupFoundCountry(data);
      }
    })
    .catch(error => {
      console.warn(error);
    });
};

function createLanguagesList(language) {
  let languagesValue = '';
  for (const key in language) {
    languagesValue += `${language[key]}, `;
  }
  return languagesValue.slice(0, -2);
}

function createMarkupFoundCountries(data) {
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
}

function createMarkupFoundCountry(data) {
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

function removeAddedMarkup() {
  countryListEL.innerHTML = '';
}
