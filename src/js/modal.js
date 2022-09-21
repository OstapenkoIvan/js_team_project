import modal from '../hbs/modal.hbs';
import sprite from '../images/sprite.svg';
import EventsAPI from './eventsAPI';

//* екземпляр класу
const allEvents = new EventsAPI();

getEventByIdForModal();
async function getEventByIdForModal() {
  let event = await allEvents.getEventById('vvG18Z96SmndKH');

  console.log(event);
  let { id, name, info, classifications, priceRanges } = event;

  let [priceRanges1 , priceRanges2 = {min: 'NoTickets', max:'---', currency:'---'}] = priceRanges;
console.log(priceRanges1);
let priceRangesVIP = {};
if (priceRanges2) {

  console.log(priceRanges2);
    console.log('=============');
  }

  eventObj = {
    id: id,
    name: name,
    description: info,
    contry: '',
    date: '',
    time: '',
    priceStandart: {
      min: event.priceRanges[0].min,
      max: event.priceRanges[0].max,
      currency: event.priceRanges[0].currency,
    },
    priceVIP: {
      min: priceRangesVIP.min,
      max: priceRangesVIP.max,
      currency: priceRangesVIP.currency,
    },

    genreName: classifications[0].genre.name,
  };
  createModalContent(eventObj);
  console.log(eventObj);
}

const modalRefs = {
  backdropEl: document.querySelector('.js-backdrop'),
  closeModalEl: document.querySelector('.js-close-modal'),
  modalContentEl: document.querySelector('.js-modal-content'),
};
let { backdropEl, closeModalEl, modalContentEl } = modalRefs;

// console.log(modalRefs);

// toOpenModal()
function toOpenModal() {
  backdropEl.classList.toggle('is-hidden');
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
