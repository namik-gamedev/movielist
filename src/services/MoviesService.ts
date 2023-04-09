import axios from 'axios';

interface IConfig {
   params?: object;
   headers?: object;
}

export default class MoviesService {
   static async get(path: string, config?: IConfig) {
      const APIToken: string = '9P4KD03-TCW4MPM-GXM9XKY-K9T6TZA';
      const URL: string = `https://api.kinopoisk.dev/v1${path}?token=${APIToken}`;

      const response = await axios.get(URL, config);
      return response.data;
   }
}
