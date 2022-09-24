import { btn } from './js/theme-lite-dark.js';

//Импортируем API
import EventsAPI from './js/eventsAPI';
let allEvents = new EventsAPI();
//Импортируем иконки
import symbolDefs from '../src/images/symbol-defs.svg';
//Импортируем пагинатор
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getEventByIdForModal } from '../src/js/modal';

//============================================================

const refs = {
  listEl: document.querySelector('.gallery__list'),
  formEl: document.querySelector('.header-form'),
  countryChosenEl: document.querySelector('#country-search'),
};

let pagination = null;
let eventsArr = null;
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

  const countryChosenElValue = evt.currentTarget.value;
  textInput = evt.target.elements?.text.value;
  countryInput = evt.target.elements?.country.value;

  fetchData(textInput, countryInput || countryChosenElValue, page);

  clearFields(evt);
  return;
}

export async function fetchData(textInput, countryInput, page) {
  let data = await getEvents(textInput, countryInput, page);

  let lastPage = Math.round(data.totalElements / data.perPage).toString();
  // console.log(lastPage);

  const options = {
    // below default value of options
    total: 5,
    totalItems: data.totalElements,
    itemsPerPage: data.perPage,
    visiblePages: 5,
    page: data.page + 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',

      moveButton:
        '<div class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-last-page" data-num="20"></span>' +
        '</div>',
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

  // document.querySelector('.tui-last-page').setAttribute('data-num', lastPage);
  pagination.on('beforeMove', function (eventData) {
    page = eventData.page - 1;

    return getEvents(textInput, countryInput, page);
  });
}

async function getEvents(input, country, pageNumber) {
  eventsArr = await allEvents.getTextAndCountry(input, country, pageNumber);

  eventsArr && listMarkup(eventsArr.data);
  return eventsArr;
}

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
  const modal = eventsArr.dataArr.find(obj => obj.id === objId);
  getEventByIdForModal(modal);
}

function clearFields(evt) {
  const { elements } = evt.target;
  if (elements) {
    elements.text.value = '';
  }
  return;
}
