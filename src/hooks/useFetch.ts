import { UseQueryOptions, useQuery, UseQueryResult, QueryKey, QueryFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface UseFetchProps {
   queryKey: unknown[] | [string];
   queryFn: QueryFunction<unknown, QueryKey>;
   options?: Omit<UseQueryOptions<any, any, any, any>, 'queryKey' | 'queryFn' | 'initialData'> & {
      initialData?: () => undefined;
   };
}

export const useFetch = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
   queryKey: TQueryKey,
   queryFn: QueryFunction<TQueryFnData, TQueryKey>,
   options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
      initialData?: () => undefined;
   }
): UseQueryResult<TData, TError> => {
   const queryResult: UseQueryResult<TData, TError> = useQuery(queryKey, queryFn, {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 3,
      ...options,
   });
   return queryResult;
};
