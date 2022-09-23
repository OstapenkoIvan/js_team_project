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
    time: dates.start.localTime,
    timeZone: dates.timezone,
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
  console.log(forModalObj);
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
    console.log(keyWord);
    closeModal();
  }
}

function createModalContent(obj) {
  modalContentEl.innerHTML = modal(obj);
  moreInfoBtn.dataset.keyWord = obj.genre;
  toOpenModal();

  toNotActiveLink(obj);
}
function toNotActiveLink(obj) {
  
  let tuBuyLinksInfo = modalContentEl.querySelectorAll('.event.--price');
  tuBuyLinksInfo.forEach(el => {
    let elPriceList = el.querySelector('.js-price');
    let elPriceMIN = elPriceList.querySelector('.js-price-min');
    let elPriceMAX = elPriceList.querySelector('.js-price-max');
    console.log(elPriceList);
  });
}

function createToBuyZoneComp(obj) {
  let {} = obj;

  return `
  <div class='zone-toBuy'>
      <span
        class='event --price --standart'
        data-price-min=''
        data-price-max=''
      >
        <svg class='btn-icon' width='29' height='19'>
          <use href='#icon-ticket'></use>
        </svg>
        Standart
        <span class='js-price'><span class='js-price'>
          <span class="js-price-min"></span>
           -
          <span class="js-price-max"></span>
          <span></span>
        </span>
        </span>
      </span>
      <a
        class='linkBtn --toBuyTicketLink'
        href=''
        target='_blank'
        rel='noopener noreferrer'
      >
        BUY TICKETS
      </a>
      <span
        class='event --price --vip'
        data-price-min=''
        data-price-max=''
      >
        <svg class='btn-icon' width='29' height='19'>
          <use href='#icon-ticket'></use>
        </svg>
        VIP
        <span class='js-price'>
          <span class="js-price-min"></span>
           -
          <span class="js-price-max"></span>
          <span></span>
        </span>

      </span>
      <a
        class='linkBtn --toBuyTicketLink'
        href=''
        target='_blank'
        rel='noopener noreferrer'
      >
        BUY TICKETS
      </a>
    </div>
    `;
}
