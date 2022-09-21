import axios from 'axios';

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

  async fetchEvents({ countryCode = null, keyword = null, id = '' }) {
    const { perPage, page } = this;
    const { URL, KEY } = EventsAPI.DATA;
    try {
      const response = await axios.get(`events${id}.json`, {
        baseURL: URL,
        params: {
          apikey: KEY,
          size: perPage,
          page: page,
          countryCode,
          keyword,
        },
        headers: { 'Content-Type': 'application/json' },
      });
      const data = (await response.data._embedded.events)
        ? response.data._embedded.events
        : response.data;
      return data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
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
