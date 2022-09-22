import { btn } from './js/theme-lite-dark.js';

//Импортируем API
import EventsAPI from './js/eventsAPI';

//Создаем класс на основании класса импорта(имя произвольное)
const allEvents = new EventsAPI('PL');

import symbolDefs from '../src/images/symbol-defs.svg';

///////////////імпорт туй пагінейшен
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
////////////////////////////////////
/**
 *

//Получить список всех меропрятий для заглавной страницы
console.log(allEvents.getAllEvents());

//Меняя страницу - получим другой результат
allEvents.page = 3;
console.log(allEvents.getAllEvents());

//Можем ввести код страны и получить по ней данные
//коды стран - https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#supported-country-codes
console.log(allEvents.getAllEvents('CA'));

//Можем ввести название мероприятия и получить все похожие
console.log(allEvents.getSearchEvents('Raptors'));

console.log(allEvents.getSearchEvents('CA', 'Raptors'));

//Можем ввести ID мероприятия и получить по нему данные
console.log(allEvents.getEventById('vvG18Z96SmndKH'));
 */

//============================================================

const refs = {
  bodyEl: document.querySelector('body'),
  listEl: document.querySelector('.gallery__list'),
};

refs.bodyEl.addEventListener('load', getEvents(), { once: true });

async function getEvents() {
  const eventsArr = await allEvents.getAllEvents();
  await console.log(eventsArr);
  const appendMarkup = await listMarkup(eventsArr);
  await refs.listEl.insertAdjacentHTML('beforeend', appendMarkup);
  //   await console.log(appendMarkup);
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
      }) => `<li class="gallery__item-card"><a href="#"  data-id="${id}">
        <img src="${images[7].url}" alt="${name}" class="gallery__img">
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

/**
 * 
<picture>
        <source srcset="/src/images/feedback/girl_1_1x.webp 1x, /src/images/feedback/girl_1_2x.webp 2x"
                type="image/webp">
        <source srcset="/src/images/feedback/girl_1_1x.png 1x, /src/images/feedback/girl_1_2x.png 2x"
                type="image/png">
        <img class="swiper__face" src="/src/images/feedback/girl_1_1x.png"
                alt="girl one" loading="lazy" aria-label="First Girl">
</picture>
 */

allEvents.getEventById('vvG18Z96SmndKH');

////////////////////////////////////////////////////////////////////////////////////////tui-pagination

const container = document.getElementById('pagination');
// const pagination = new Pagination(container);

const options = {
  totalItems: 250,
  itemsPerPage: 16,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
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

const pagination = new Pagination('pagination', options);
console.log(pagination);
console.log(EventsAPI);
