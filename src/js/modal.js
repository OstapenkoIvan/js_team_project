import modal from '../hbs/modal.hbs';
import sprite from '../images/sprite.svg';
import EventsAPI from './eventsAPI';
import modalEvtPrice from '../hbs/modalEvtPrice.hbs';

//* екземпляр класу
const allEvents = new EventsAPI();

const modalRefs = {
  backdropEl: document.querySelector('.js-backdrop'),
  closeModalEl: document.querySelector('.js-close-modal'),
  modalContentEl: document.querySelector('.js-modal-content'),
  itemList: document.querySelector('.gallery__list'),
  moreInfoBtn: document.querySelector('.--moreInfoBtn'),
  bodyEl: document.body,
};
let {
  backdropEl,
  closeModalEl,
  modalContentEl,
  itemList,
  bodyEl,
  moreInfoBtn,
} = modalRefs;

// console.log(modalRefs);

itemList.addEventListener('click', event => {
  event.preventDefault();
  let { target } = event;
  if (target.nodeName === 'UL') {
    // console.log('UL');
    return;
  }
  const objId = target.closest('a').getAttribute('data-id');
  // console.log(objId);
  getEventByIdForModal(objId);
});
async function getEventByIdForModal(cardId) {
  if (cardId === undefined) {
    return;
  }
  function toFindImgLink(arr, width, ratio) {
    return arr.find(el => {
      el.ratio === ratio && el.width === width;
    });
    // return imageObj.url
  }
  let eventObj = await allEvents.getEventById(cardId);

  let {
    id,
    name,
    images,
    info = 'Not available info yet.',
    classifications,
    priceRanges = [],
    dates,
    url,
    _embedded: { venues },
  } = eventObj;

  let [priceRanges1 = {}, priceRanges2 = {}] = priceRanges;

  // console.log(eventObj);

  let forModalObj = {
    id: id,
    name: name,
    imageLogo: images.find(el => el.ratio === '3_2' && el.width === 640).url,
    image: images.find(el => el.ratio === '16_9' && el.width === 2048).url,
    description: info,
    country: venues[0].country.name,
    city: venues[0].city.name,
    location: venues[0].name,
    date: dates.start.localDate,
    time: dates.start.localTime.slice(0, 5),
    timeZone: dates.timezone.replaceAll('_', ' '),
    genre: classifications[0].genre.name,
    toBuyUrl: url,
    priceStandart: {
      type: 'Standart',
      min: priceRanges1.min,
      max: priceRanges1.max,
      currency: priceRanges1.currency,
    },
    priceVIP: {
      type: 'VIP',
      min: priceRanges2.min,
      max: priceRanges2.max,
      currency: priceRanges2.currency,
    },
    sprite,
  };
  // console.log(forModalObj);
  createModalContent(forModalObj);
}

function toOpenModal() {
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('--notScrolled');

  toCloseModal();
}
function toCloseModal() {
  backdropEl.addEventListener('click', closeModalByClick);
  window.addEventListener('keydown', closeModalByEsc);
  moreInfoBtn.addEventListener('click', onGetMoreInfoBtnClick);
  function closeModal() {
    backdropEl.classList.add('is-hidden');
    modalContentEl.innerHTML = '';
    bodyEl.classList.toggle('--notScrolled');
    backdropEl.removeEventListener('click', closeModalByClick);
    window.removeEventListener('keydown', closeModalByEsc);
    moreInfoBtn.removeEventListener('click', onGetMoreInfoBtnClick);
  }
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
  function onGetMoreInfoBtnClick(evt) {
    let { target } = evt;
    let keyWord = target.dataset.keyWord;
    // console.log(keyWord);
    closeModal();
  }
}
function createModalContent(obj) {
  modalContentEl.innerHTML = modal(obj);
  moreInfoBtn.dataset.keyWord = obj.genre;
  toOpenModal();

  toCheckStandartPrice(obj);
  toCheckVipPrice(obj);
}
function toCheckStandartPrice(obj) {
  let elPriceStandart = modalContentEl.querySelector('.toBuy.--Standart');
  let elPriceStandartLink = elPriceStandart.querySelector('.js-link-standart');
  if (
    Object.values(obj.priceStandart)[1] &&
    Object.values(obj.priceStandart)[2]
  ) {
    return;
  }
  elPriceStandartLink.classList.add('--notActiveLink');
}
function toCheckVipPrice(obj) {
  let elPriceVip = modalContentEl.querySelector('.toBuy.--Vip');
  let elPriceVipLink = elPriceVip.querySelector('.js-link-vip');
  if (Object.values(obj.priceVIP)[1] && Object.values(obj.priceVIP)[2]) {
    return;
  }
  elPriceVipLink.classList.add('--notActiveLink');
  console.log(obj.priceVIP);
}
