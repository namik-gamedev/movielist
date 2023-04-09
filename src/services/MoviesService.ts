import axios from 'axios';

interface IConfig {
   params?: object;
   headers?: object;
}

export default class MoviesService {
   static async get(path: string, config?: IConfig) {
      const APIToken: string = 'H97WTT5-KP5462M-GQDTTDS-X4GECPJ';
      const URL: string = `https://api.kinopoisk.dev/v1${path}?token=${APIToken}`;

      const response = await axios.get(URL, config);
      return response.data;
   }
}
