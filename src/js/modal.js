import modal from '../hbs/modal.hbs';
import sprite from '../images/sprite.svg';
import { fetchData } from '../index';

//* Необхідні нам елементи сторінки
const modalRefs = {
  backdropEl: document.querySelector('.js-backdrop'),
  modalContentEl: document.querySelector('.js-modal-content'),
  moreInfoBtn: document.querySelector('.--moreInfoBtn'),
  bodyEl: document.body,
};

//* деструктуризація для зручності
let { backdropEl, modalContentEl, bodyEl, moreInfoBtn } = modalRefs;

//* Створення запиту
export async function getEventByIdForModal(cardId) {
  if (cardId === undefined) {
    return;
  }

  //* зберігання даних із сервера у змінній
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
  } = cardId;
  //* Деструктуризація змінниої із масивом цін
  let [priceRanges1 = {}, priceRanges2 = {}] = priceRanges;

  //* Створений новий обєкт
  let forModalObj = {
    id,
    name,
    imageLogo: images.find(el => el.ratio === '3_2' && el.width === 640).url,
    image: images.find(el => el.ratio === '16_9' && el.width === 2048).url,
    description: info,
    country: venues[0]?.country?.name,
    city: venues[0]?.city?.name,
    location: venues[0]?.name,
    date: dates?.start?.localDate,
    time: dates?.start?.localTime?.slice(0, 5),
    timeZone: dates?.timezone?.replaceAll('_', ' '),
    genre: classifications[0]?.genre?.name,
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

  createModalContent(forModalObj);
}

//* Функція яка створює модалку
function createModalContent(obj) {
  modalContentEl.innerHTML = modal(obj);
  moreInfoBtn.dataset.keyWord = obj.genre;
  toOpenModal();

  toCheckStandartPrice(obj);
  toCheckVipPrice(obj);
}

function toOpenModal() {
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('--notScrolled');

  toCloseModal();
}

//* функція яка закриває модалку
function toCloseModal() {
  //* Слухачі подій на модалці
  backdropEl.addEventListener('click', closeModalByClick);
  window.addEventListener('keydown', closeModalByEsc);
  moreInfoBtn.addEventListener('click', onGetMoreInfoBtnClick);

  //* Закриття функції по кліку на кнопку ESC
  function closeModalByEsc(evt) {
    let { key } = evt;
    if (key === 'Escape') {
      closeModal();
      return;
    }
  }

  //* Закриття модалки по кліку по хрестику
  function closeModalByClick(evt) {
    let { target } = evt;
    if (!target.classList.contains('js-mdl')) {
      return;
    }
    closeModal();
  }

  //* Функція яка закриває модалку, чистить контент і чистить слухачів
  function closeModal() {
    backdropEl.classList.add('is-hidden');
    modalContentEl.innerHTML = '';
    bodyEl.classList.toggle('--notScrolled');
    backdropEl.removeEventListener('click', closeModalByClick);
    window.removeEventListener('keydown', closeModalByEsc);
    moreInfoBtn.removeEventListener('click', onGetMoreInfoBtnClick);
  }

  //* Дія яка відбувається після натискання GetMoreInfoBtn
  function onGetMoreInfoBtnClick(evt) {
    let { keyWord } = evt.target.dataset;
    // console.log(keyWord);
    closeModal();
    fetchData(keyWord);
  }
}

//* Функція яка перевіряє ціни на СТАНДАРТНІ квитки
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
//* Функція яка перевіряє ціни на ВІП квитки
function toCheckVipPrice(obj) {
  let elPriceVip = modalContentEl.querySelector('.toBuy.--Vip');
  let elPriceVipLink = elPriceVip.querySelector('.js-link-vip');
  if (Object.values(obj.priceVIP)[1] && Object.values(obj.priceVIP)[2]) {
    return;
  }
  elPriceVipLink.classList.add('--notActiveLink');
}
