export interface IMovie {
   id: number;
   name: string;
   alternativeName: string;
   enName: string;
   names: IName[];
   type: string;
   typeNumber: number;
   year: number;
   description: string;
   shortDescription: string;
   slogan: string;
   status: string;
   rating: IRating;
   ageRating: number;
   genres: IGenre[];
   countries: ICountry[];
   poster: IPoster;
   persons: IPerson[];
   videos: IVideos;
}

export interface IPoster {
   url: string;
   previewUrl: string;
}

export interface IRating {
   kp: number;
   imdb: number;
   tmdb: number;
   filmCritics: number;
   russianFilmCritics: number;
   await: number;
}

export interface IName {
   name: string;
   language: string;
   type: string;
}

export interface IVideos {
   trailers: ITrailer[];
   teasers: ITrailer[];
}

export interface ITrailer {
   url: string;
   name: string;
   site: string;
   type: string;
   size: number;
}

export interface IGenre {
   name: string;
   slug: string;
}

export interface ICountry {
   name: string;
}

export interface IPerson {
   id: number;
   photo: string;
   name: string;
   enName: string;
   profession: string;
   enProfession: string;
}

export interface IFavouriteMovie {
   id: number;
   name: string;
}

export interface IRegistrationFields extends IUser {
   confirmPassword?: string;
}

export interface IUser {
   name: string;
   email: string;
   password: string;
   favouriteMovies: IFavouriteMovie[];
   darkTheme: boolean;
}
