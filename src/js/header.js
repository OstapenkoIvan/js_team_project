import { loadSearchedData } from '../index';

const refs = {
  bodyEl: document.querySelector('body'),
  countryChosenEl: document.querySelector('#country-search'),
  listEl: document.querySelector('.gallery__list'),
};

refs.countryChosenEl.addEventListener('blur', loadSearchedData);
