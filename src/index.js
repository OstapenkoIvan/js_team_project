//Импортируем API
import EventsAPI from './js/eventsAPI';

//Создаем класс на основании класса импорта(имя произвольное)
const allEvents = new EventsAPI('PL');

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

//Можем ввести ID мероприятия и получить по нему данные
console.log(allEvents.getEventById('vvG18Z96SmndKH'));

import './js/footer';
import './js/go_top';