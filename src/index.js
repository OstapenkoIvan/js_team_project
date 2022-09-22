import { btn } from './js/theme-lite-dark.js';

//Импортируем API
import EventsAPI from './js/eventsAPI';
const allEvents = new EventsAPI();
//Импортируем иконки
import symbolDefs from '../src/images/symbol-defs.svg';
//Импортируем пагинатор
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

//============================================================

const refs = {
  listEl: document.querySelector('.gallery__list'),
  formEl: document.querySelector('.header-form'),
};

let { textInput, countryInput, page, totalElements, perPage } = allEvents;

//Подключаем пагинатор
const container = document.getElementById('pagination');
const options = {
  // below default value of options
  totalItems: totalElements,
  itemsPerPage: perPage,
  visiblePages: 5,
  page: page + 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(container, options);
//======================

document.addEventListener('DOMContentLoaded', loadFirstData(), { once: true });
refs.formEl.addEventListener('submit', loadSearchedData);
refs.listEl.addEventListener('click', openModal);

async function loadFirstData() {
  page = 0;
  await getEvents(textInput, countryInput, page);
  console.log(allEvents.totalElements);
  pagination.setTotalItems(allEvents.totalElements);
  return;
}

// function getInputData(evt) {
// let { textInput, countryInput } = allEvents;
// const { text, country } = evt.target.elements;
// evt.preventDefault();

// allEvents.textInput = text.value;
// allEvents.countryInput = country.value;

// console.log(allEvents.textInput);
// console.log(allEvents.countryInput);

// const eventsArr = await allEvents.getTextAndCountry(textInput, countryInput);
// const appendMarkup = (await eventsArr) && listMarkup(eventsArr);

// clearFields(evt);
// }

// let input = '';
// let select = '';
// let pageNum = '';

function loadSearchedData(evt) {
  const { text, country } = evt.target.elements;
  evt.preventDefault();
  pagination.movePageTo(1);

  textInput = text.value;
  countryInput = country.value;

  getEvents(textInput, countryInput, page);
  clearFields(evt);
  return;
}

async function getEvents(input, country, pageNumber) {
  const eventsArr = await allEvents.getTextAndCountry(
    input,
    country,
    pageNumber
  );
  (await eventsArr) && listMarkup(eventsArr);
  return eventsArr;
}

async function listMarkup(data) {
  refs.listEl.innerHTML = data
    .map(
      ({
        id,
        images,
        name,
        dates: {
          start: { localDate },
        },
        _embedded: { venues },
      }) => `<li class="gallery__item-card">
      <a href="#"  data-id="${id}"><div class="gallery__img-wrapper">
              <picture><source srcset="
          ${
            images.find(({ width, ratio }) => width === 305 && ratio === '3_2')
              .url
          } 1x, 
          ${
            images.find(({ width, ratio }) => width === 640 && ratio === '3_2')
              .url
          } 2x, 
          ${
            images.find(({ width, ratio }) => width === 1024 && ratio === '3_2')
              .url
          } 3x">
        <img src="${
          images.find(({ width, ratio }) => width === 305 && ratio === '3_2')
            .url
        }"
        alt="${name}" loading="lazy" aria-label="${name}" class="gallery__img"/>
              </picture>
            </div>
                <h3 class="gallery__card-title">${name}</h3>
                <p class="gallery__date">${localDate}</p>
                <p class="gallery__kontsert-location">
                <svg class="gallery__card-icon" width="6" height="9">
                <use href="${symbolDefs}#location-desc"></use>
                </svg>${venues[0].name}
                </p>
                </a>
          </li>`
    )
    .join('');
}

function openModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName === 'UL') {
    return;
  }

  const objId = evt.target.closest('a').getAttribute('data-id');
  const modal = allEvents.dataArr.find(obj => obj.id === objId);
  console.log(modal);
}

function clearFields(evt) {
  evt.target.elements.text.value = '';
  // evt.target.elements.country.value = '';
}

////////////////////////////////////////////////////////////////////////////////////////tui-pagination

pagination.on('beforeMove', function (eventData) {
  page = eventData.page - 1;
  console.log(page);

  return getEvents(textInput, countryInput, page);
});

// pagination.on('afterMove', function (eventData) {
//   console.log('The current page is ' + eventData.page);
// });
