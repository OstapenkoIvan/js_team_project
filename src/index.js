//Импортируем API
import EventsAPI from './js/eventsAPI';

//Создаем класс на основании класса импорта(имя произвольное)
const allEvents = new EventsAPI('PL');

import symbolDefs from '../src/images/symbol-defs.svg';

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
  // ! Масив із подіями
  const eventsArr = await allEvents.getAllEvents();
  //* виведення у консоль масиву із подіями
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
      }) => `
      <li class="gallery__item-card">
        <a href="#"  data-id="${id}">
          <img src="${images[7].url}" alt="${name}" class="gallery__img">
          <h3 class="gallery__card-title">${name}</h3>
          <p class="gallery__date">${localDate}</p>
          <p class="gallery__kontsert-location">
            <svg class="gallery__card-icon" width="6" height="9">
              <use href="${symbolDefs}#location-desc"></use>
            </svg>${venues[0].name}
          </p>
        </a>
      </li>
      `
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

