import EventsAPI from "./eventsAPI";
import symbolDefs from '/src/images/symbol-defs.svg';

const allEvents = new EventsAPI();

const refs = {
  bodyEl: document.querySelector('body'),
  countryChosenEl: document.querySelector('#country-searching'),
  listEl: document.querySelector('.gallery__list'),
};
console.log(refs.countryChosenEl)

refs.countryChosenEl.addEventListener('blur', getEventsByCountry);

async function getEventsByCountry(event) {
  event.preventDefault();
  const countryChosenElValue = event.target.value
  console.log(countryChosenElValue)
  const eventsArr = await allEvents.getAllEvents(countryChosenElValue);
  console.log(eventsArr);  
  const appendMarkup = await listMarkup(eventsArr);
  refs.listEl.insertAdjacentHTML('beforeend', appendMarkup)
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

export default headerJS;
