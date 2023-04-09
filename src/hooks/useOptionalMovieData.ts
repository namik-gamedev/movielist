import { useMemo } from 'react';
import { IMovie } from '../types';

export interface IOptionalMovieData {
   name: string;
   alternativeName: string;
   rating: number;
   posterUrl: string;
}

export const useOptionalMovieData = (data?: IMovie): IOptionalMovieData => {
   const newData = useMemo(() => {
      if (!data) {
         return {} as IOptionalMovieData;
      }
      return {
         name: data.name || data.alternativeName,
         alternativeName: data.alternativeName || data.enName,
         posterUrl: data.poster?.previewUrl || data.poster?.url,
         rating: data.rating.kp || data.rating.imdb,
      };
   }, [data]);

   return newData;
};
