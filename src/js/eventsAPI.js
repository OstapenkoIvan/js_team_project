import axios from 'axios';

const KEY = 'c8d7rEVcp3PFJdChpDvpL2XvzRixmmGJ';
const URL = 'https://app.ticketmaster.com/discovery/v2/';
const coutryCode = {
  poland: 'PL',
  usa: 'US',
  netherlands: 'NL',
  spain: 'ES',
  belgium: 'BE',
  italy: 'IT',
  austria: 'AT',
  canada: 'CA',
  denmark: 'DK',
  belgium: 'BE',
};

/**
 * 1. Event search - https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=c8d7rEVcp3PFJdChpDvpL2XvzRixmmGJ&countryCode=DK
 * 2. Event details - https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=c8d7rEVcp3PFJdChpDvpL2XvzRixmmGJ
 */

class EventsAPI {
  static DATA = {
    KEY: 'c8d7rEVcp3PFJdChpDvpL2XvzRixmmGJ',
    URL: 'https://app.ticketmaster.com/discovery/v2/',
  };

  #page;

  constructor({ code }) {
    this.coutryCode = code;
    this.perPage = 20;
    this.#page = 0;
  }

  set page(num) {
    this.#page = num;
  }

  get page() {
    return this.#page;
  }

  async fetchEvents({ countryCode = '', keyword = '', id = '' }) {
    const { perPage, page } = this;
    const { URL, KEY } = EventsAPI.DATA;
    try {
      const response = await axios.get(`${URL}events${id}.json`, {
        params: {
          apikey: KEY,
          size: perPage,
          page: page,
          countryCode,
          keyword,
        },
      });
      const data = await response.data._embedded.events;
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

  //enter coutry code(as "string") to get this country events, or leave empty to get all data
  getAllEvents(countryCode) {
    return this.fetchEvents({ countryCode });
  }

  //enter search parameter(as "string") to get events.
  getSearchEvents(keyword) {
    return this.fetchEvents({ keyword });
  }

  //enter id parameter(as "string") to get event details
  getEventById(id) {
    return this.fetchEvents({ id: `/${id}` });
  }
}

export default EventsAPI;
