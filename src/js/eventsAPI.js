// import axios from 'axios';
// import { Report } from 'notiflix/build/notiflix-report-aio';

// class EventsAPI {
//   static DATA = {
//     KEY: 'c8d7rEVcp3PFJdChpDvpL2XvzRixmmGJ',
//     URL: 'https://app.ticketmaster.com/discovery/v2/',
//   };

//   constructor() {
//     this.perPage = 16;
//     this.page = 0;
//     this.dataArr = [];
//     this.totalElements = '';
//     this.textInput = '';
//     this.countryInput = '';
//   }

//   async fetchEvents({
//     id = '',
//     keyword = null,
//     countryCode = null,
//     page = null,
//     type = 'events',
//   }) {
//     const { perPage } = this;
//     const { URL, KEY } = EventsAPI.DATA;
//     try {
//       const response = await axios.get(`${type}${id}.json`, {
//         baseURL: URL,
//         params: {
//           apikey: KEY,
//           size: perPage,
//           keyword,
//           countryCode,
//           page,
//         },
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const { page: fetchPage, _embedded: embedded } = response.data;

//       if (!fetchPage.totalElements) {
//         Report.info(
//           'Nothing was found',
//           'Please try to enter different country of keyword and search again',
//           'Okay'
//         );
//         throw new Error('Nothing found');
//       }

//       this.totalElements = fetchPage.totalElements;
//       this.dataArr = embedded.events;

//       const data = embedded.events ? embedded.events : response.data;

//       return data;
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log('Error', error.message);
//       }
//       console.log(error.config);
//     }
//   }

//   //enter coutry code(as "string") to get this country events, or leave empty to get all data
//   getAllEvents(countryCode) {
//     return this.fetchEvents({ countryCode });
//   }

//   //enter search parameter(as "string") to get events.
//   getSearchEvents(keyword) {
//     return this.fetchEvents({ keyword });
//   }

//   getTextAndCountry(keyword, countryCode, page) {
//     return this.fetchEvents({ keyword, countryCode, page });
//   }

//   //enter id parameter(as "string") to get event details
//   getEventById(id) {
//     return this.fetchEvents({ id: `/${id}` });
//   }

//   getSimilarEvents(keyword) {
//     const type = 'attractions';
//     return this.fetchEvents({ keyword, type });
//   }
// }

// export default EventsAPI;

import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';

class EventsAPI {
  static DATA = {
    KEY: 'c8d7rEVcp3PFJdChpDvpL2XvzRixmmGJ',
    URL: 'https://app.ticketmaster.com/discovery/v2/',
  };

  constructor() {
    this.perPage = 16;
    this.page = 0;
    this.dataArr = [];
    this.totalElements = '';
    this.textInput = '';
    this.countryInput = '';
  }

  async fetchEvents({
    id = '',
    keyword = null,
    countryCode = null,
    page = null,
    type = 'events',
  }) {
    let { perPage, totalElements, dataArr } = this;
    const { URL, KEY } = EventsAPI.DATA;
    try {
      const response = await axios.get(`${type}${id}.json`, {
        baseURL: URL,
        params: {
          apikey: KEY,
          size: perPage,
          keyword,
          countryCode,
          page,
        },
        headers: { 'Content-Type': 'application/json' },
      });
      const { page: fetchPage, _embedded: embedded } = response.data;

      if (!fetchPage.totalElements) {
        Report.info(
          'Nothing was found',
          'Please try to enter different country of keyword and search again',
          'Okay'
        );
        throw new Error('Nothing found');
      }

      totalElements = fetchPage.totalElements;
      dataArr = embedded.events;

      const data = embedded.events
        ? embedded.events
        : embedded.attractions
        ? embedded.attractions
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

  getTextAndCountry(keyword, countryCode, page) {
    return this.fetchEvents({ keyword, countryCode, page });
  }

  //enter id parameter(as "string") to get event details
  getEventById(id) {
    return this.fetchEvents({ id: `/${id}` });
  }

  getSimilarEvents(keyword) {
    const type = 'attractions';
    return this.fetchEvents({ keyword, type });
  }
}

export default EventsAPI;
