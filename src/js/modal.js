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

// getEventByIdForModal();
async function getEventByIdForModal() {
  // let event = await allEvents.getEventById('vvG18Z96SmndKH');
  // if (id !== undefined) {
  //   // let event = await allEvents.getEventById(`${id}`);
  //   return
  // }

  console.log(event);
  let { id, name, images, info, classifications, priceRanges, dates } = event;
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

  console.log(eventObj);
  createModalContent(eventObj);
}

// toOpenModal()
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

function onEventCardClick(evt, arr) {
  let { target } = evt;
  let eventCardId = target.dataset.id;
  let foundedEventCard = {};
  let transferData = {
    name: foundedEventCard.name,
  };
  if (eventCardId === undefined) {
    return;
  }

  foundedEventCard = arr.find(el => el.id === eventCardId);
  createModalContent(foundedEventCard);
}
// createModalContent({});
function createModalContent(obj) {
  let modalObj = {
    sprite: sprite,
    eventObj: obj,
  };

  modalContentEl.innerHTML = modal(modalObj);
  toOpenModal();
}
