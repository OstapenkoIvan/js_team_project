import modal from '../hbs/modal.hbs';
import sprite from '../images/sprite.svg';
import EventsAPI from './eventsAPI';

//* екземпляр класу
const allEvents = new EventsAPI();

const modalRefs = {
  backdropEl: document.querySelector('.js-backdrop'),
  closeModalEl: document.querySelector('.js-close-modal'),
  modalContentEl: document.querySelector('.js-modal-content'),
  itemList: document.querySelector('.gallery__list'),
  bodyEl: document.body,
};
let { backdropEl, closeModalEl, modalContentEl, itemList, bodyEl } = modalRefs;

console.log(modalRefs);

itemList.addEventListener('click', event => {
  event.preventDefault();
  let { target } = event;
  if (target.dataset.action !== 'openModal') {
    return;
  }
  getEventByIdForModal(target.dataset.id);
});

async function getEventByIdForModal(cardId) {
  if (cardId === undefined) {
    return;
  }
  let eventObj = await allEvents.getEventById(`${cardId}`);
  let {
    id,
    name,
    images,
    info,
    classifications,
    priceRanges = [],
    dates,
  } = eventObj;

  let [priceRanges1, priceRanges2 = {}] = priceRanges;
  eventObj = {
    id: id,
    name: name,
    imageLogo: images[0].url,
    image: images[7].url,
    description: info,
    contry: '',
    city: '',
    date: dates.start.localDate,
    time: dates.start.localTime,
    timeZone: dates.timezone,
    genre: classifications[0].genre.name,
    priceStandart: {
      min: priceRanges1.min,
      max: priceRanges1.max,
      currency: priceRanges1.currency,
    },
    priceVIP: {
      min: priceRanges2.min,
      max: priceRanges2.max,
      currency: priceRanges2.currency,
    },
  };
  createModalContent(eventObj);
}

function toOpenModal() {
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('--notScrolled');

  toCloseModal();
}
function toCloseModal() {
  backdropEl.addEventListener('click', closeModalByClick);
  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(evt) {
    let { key } = evt;
    if (key === 'Escape') {
      closeModal();
      return;
    }
  }
  function closeModalByClick(evt) {
    let { target, currentTarget } = evt;
    if (!target.classList.contains('js-mdl')) {
      return;
    }
    closeModal();
  }
  function closeModal() {
    backdropEl.classList.add('is-hidden');
    modalContentEl.innerHTML = '';
    bodyEl.classList.toggle('--notScrolled');
    backdropEl.removeEventListener('click', closeModalByClick);
    window.removeEventListener('keydown', closeModalByEsc);
  }
}
function createModalContent(obj) {
  let modalObj = {
    sprite: sprite,
    eventObj: obj,
  };

  modalContentEl.innerHTML = modal(modalObj);
  toOpenModal();
}
function getMoreInfo() {
  let moreInfoBtn = document.querySelector('.--moreInfoBtn');
  moreInfoBtn.addEventListener('click', onGetMoreInfoBtnClick)

}

function onGetMoreInfoBtnClick(){
  
}
