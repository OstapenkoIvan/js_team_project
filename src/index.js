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
  countryChosenEl: document.querySelector('#country-search'),
};

let pagination = null;
let { textInput, countryInput, page } = allEvents;

//Подключаем пагинатор
const container = document.getElementById('pagination');

refs.formEl.addEventListener('submit', loadSearchedData);
refs.countryChosenEl.addEventListener('blur', loadSearchedData);
refs.listEl.addEventListener('click', openModal);

loadFirstData();

async function loadFirstData() {
  page = 0;

  fetchData(textInput, countryInput, page);
  return;
}

export async function loadSearchedData(evt) {
  evt.preventDefault();
  // const { text = '', country } = evt.target.elements;

  console.log(evt.currentTarget.value);
  const countryChosenElValue = evt.currentTarget.value;
  textInput = evt.target.elements?.text.value;
  countryInput = evt.target.elements?.country.value;

  fetchData(textInput, countryInput || countryChosenElValue, page);

  clearFields(evt);
  return;
}

async function fetchData(textInput, countryInput, page) {
  let data = await getEvents(textInput, countryInput, page);

  let { perPage } = allEvents;

  const options = {
    // below default value of options
    totalItems: data.totalElements,
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
  pagination = new Pagination(container, options);
  pagination.on('beforeMove', function (eventData) {
    page = eventData.page - 1;
    console.log(page);

    return getEvents(textInput, countryInput, page);
  });
}

async function getEvents(input, country, pageNumber) {
  const eventsArr = await allEvents.getTextAndCountry(
    input,
    country,
    pageNumber
  );
  (await eventsArr) && listMarkup(eventsArr.data);
  return eventsArr;
}

// async function getEvents({
//   inputValue = '',
//   countryValue = '',
//   pageNumber,
//   keyword = '',
// }) {
//   console.log('inputValue', inputValue);
//   console.log('keyword', countryValue);
//   let eventsArr = null;
//   let similarEventsArr = null;
//   if (!keyword) {
//     console.log('inputValue', inputValue);
//     console.log('keyword', countryValue);
//     eventsArr = await allEvents.getTextAndCountry(
//       inputValue,
//       countryValue,
//       pageNumber
//     );
//   }
//   if (keyword) {
//     similarEventsArr = await allEvents.getSimilarEvents(keyword);
//   }

//   // similarEventsArr && listMarkup(similarEventsArr);

//   if (eventsArr) {
//     listMarkup(eventsArr);
//     return eventsArr;
//   }

//   //сделать разметку для похожих событий
//   if (similarEventsArr) {
//     console.log(similarEventsArr);
//     listMarkup(similarEventsArr);
//     return similarEventsArr;
//   }
// }

// getEvents({
//   keyword: 'NBA',
// });

async function listMarkup(data) {
  refs.listEl.innerHTML = data
    .map(
      ({
        id = '',
        images = '',
        name = '',
        dates: { start: { localDate = '' } = '' } = '',
        _embedded: { venues = '' } = '',
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
  const { elements } = evt.target;
  if (elements) {
    elements.text.value = '';
  }
  // evt.target.elements.country.value = '';
  return;
}
