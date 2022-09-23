// import { btn } from './js/theme-lite-dark.js';

// //Импортируем API
// import EventsAPI from './js/eventsAPI';
// import headerJS from './js/header';

// //Создаем класс на основании класса импорта(имя произвольное)
// const allEvents = new EventsAPI();

// import symbolDefs from '../src/images/symbol-defs.svg';

// ///////////////імпорт туй пагінейшен
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
// ////////////////////////////////////
// /**
//  *

// //Получить список всех меропрятий для заглавной страницы
// console.log(allEvents.getAllEvents());

// //Меняя страницу - получим другой результат
// allEvents.page = 3;
// console.log(allEvents.getAllEvents());

// //Можем ввести код страны и получить по ней данные
// //коды стран - https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#supported-country-codes
// console.log(allEvents.getAllEvents('CA'));

// //Можем ввести название мероприятия и получить все похожие
// console.log(allEvents.getSearchEvents('Raptors'));

// console.log(allEvents.getSearchEvents('CA', 'Raptors'));

// //Можем ввести ID мероприятия и получить по нему данные
// console.log(allEvents.getEventById('vvG18Z96SmndKH'));

// import './js/footer';
// import './js/go_top';

//  */

// //============================================================

// const refs = {
//   bodyEl: document.querySelector('body'),
//   listEl: document.querySelector('.gallery__list'),
// };

// refs.bodyEl.addEventListener('load', getEvents(), { once: true });

// async function getEvents() {
//   const eventsArr = await allEvents.getAllEvents();
//   await console.log(eventsArr);
//   const appendMarkup = await listMarkup(eventsArr);
//   // await refs.listEl.insertAdjacentHTML('beforeend', appendMarkup);
//   //   await console.log(appendMarkup);
// }

// async function listMarkup(data) {
//   refs.listEl.innerHTML = data
//     .map(
//       ({
//         id,
//         images,
//         name,
//         dates: {
//           start: { localDate },
//         },
//         _embedded: { venues },
//       }) => `<li class="gallery__item-card"><a href="#" data-id="${id}">
//       <div class="gallery__img-wrapper">
//       <picture>
//       <source srcset="
//         ${images.find(img => img.width === 305 && img.ratio === '3_2').url} 1x,
//         ${
//           images.find(img => img.width === 640 && img.ratio === '3_2').url
//         } 2x, ${
//         images.find(img => img.width === 1024 && img.ratio === '3_2').url
//       } 3x">
//       <img src="${
//         images.find(img => img.width === 305 && img.ratio === '3_2').url
//       }"
//               alt="${name}" loading="lazy" aria-label="${name}" class="gallery__img">
//       </picture>
//       </div>
//           <h3 class="gallery__card-title">${name}</h3>
//           <p class="gallery__date">${localDate}</p>
//           <p class="gallery__kontsert-location">
//           <svg class="gallery__card-icon" width="6" height="9">
//           <use href="${symbolDefs}#location-desc"></use>
//           </svg>${venues[0].name}
//           </p>
//           </a>
//           </li>`
//     )
//     .join('');
// }

// /**
//  *
// <picture>
//         <source srcset="/src/images/feedback/girl_1_1x.webp 1x, /src/images/feedback/girl_1_2x.webp 2x"
//                 type="image/webp">
//         <source srcset="/src/images/feedback/girl_1_1x.png 1x, /src/images/feedback/girl_1_2x.png 2x"
//                 type="image/png">
//         <img class="swiper__face" src="/src/images/feedback/girl_1_1x.png"
//                 alt="girl one" loading="lazy" aria-label="First Girl">
// </picture>
//  */

// ////////////////////////////////////////////////////////////////////////////////////////tui-pagination
// // const pagination = new Pagination('pagination');

// const container = document.getElementById('pagination');
// // const pagination = new Pagination(container);

// // const cont = document.querySelector('tui-pagination');

// const options = {
//   totalItems: 250,
//   itemsPerPage: 16,
//   visiblePages: 5,
//   page: 1,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage:
//       '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };

// const pagination = new Pagination('pagination', options);

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

let pagination = null;
let { textInput, countryInput, page } = allEvents;

//Подключаем пагинатор
const container = document.getElementById('pagination');

refs.formEl.addEventListener('submit', loadSearchedData);
refs.listEl.addEventListener('click', openModal);

loadFirstData();

async function loadFirstData() {
  page = 0;
  // countryInput = 'US';

  // fetchData(textInput, countryInput, page);

  await getEvents(textInput, countryInput, page);

  let { totalElements, perPage } = allEvents;

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
  pagination = new Pagination(container, options);
  pagination.on('beforeMove', function (eventData) {
    page = eventData.page - 1;
    console.log(page);

    return getEvents(textInput, countryInput, page);
  });
  return;
}

async function loadSearchedData(evt) {
  evt.preventDefault();
  const { text, country } = evt.target.elements;

  textInput = text.value;
  countryInput = country.value;

  // fetchData(textInput, countryInput, page);

  await getEvents(textInput, countryInput, page);
  let { totalElements, perPage } = allEvents;

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
  pagination = new Pagination(container, options);
  pagination.on('beforeMove', function (eventData) {
    page = eventData.page - 1;
    console.log(page);

    return getEvents(textInput, countryInput, page);
  });
  clearFields(evt);
  return;
}

async function fetchData(textInput, countryInput, page) {
  // await getEvents(textInput, countryInput, page);
  let { totalElements, perPage } = await getEvents(
    textInput,
    countryInput,
    page
  );
  console.log('textInput', textInput);
  console.log('countryInput', countryInput);
  console.log('page', page);
  console.log('totalElements', totalElements);
  console.log('perPage', perPage);

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
  (await eventsArr) && listMarkup(eventsArr);
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
  evt.target.elements.text.value = '';
  // evt.target.elements.country.value = '';
  return;
}

////////////////////////////////////////////////////////////////////////////////////////tui-pagination

// const pagination = new Pagination(container, options);
// pagination.on('beforeMove', function (eventData) {
//   page = eventData.page - 1;
//   console.log(page);

//   return getEvents(textInput, countryInput, page);
// });

// pagination.on('afterMove', function (eventData) {
//   console.log('The current page is ' + eventData.page);
// });
