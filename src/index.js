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
  inputEl: document.querySelector('.header-form__input'),
  textEl: document.querySelector('.header-form__input'),
  formEl: document.querySelector('.header-form'),
};

refs.bodyEl.addEventListener('load', getEvents(), { once: true });
refs.formEl.addEventListener('submit', getInputData);
refs.listEl.addEventListener('click', openModal);

async function getInputData(evt) {
  evt.preventDefault();

  const inputText = evt.target.elements.text.value;
  const inputCountry = evt.target.elements.country.value;

  const eventsArr = await allEvents.getTextAndCountry(inputText, inputCountry);
  const appendMarkup = (await eventsArr) && listMarkup(eventsArr);

  clearFields(evt);
}

async function getEvents() {
  const eventsArr = await allEvents.getAllEvents();
  const appendMarkup = await listMarkup(eventsArr);
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

function openModal(evt) {
  //add h3 check
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
  evt.target.elements.country.value = '';
}
