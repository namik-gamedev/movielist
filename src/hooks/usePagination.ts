import { useMemo } from 'react';

interface UsePaginationProps {
   totalCount: number;
   pageSize: number;
   currentPage: number;
   siblingCount: number;
}

export const DOTS: number = -1;

const range = (start: number, end: number) => {
   const length: number = end - start + 1;
   return Array.from({ length }, (_, index: number) => start + index);
};

export const usePagination = ({
   totalCount,
   pageSize,
   currentPage,
   siblingCount,
}: UsePaginationProps): number[] => {
   const paginationRange: number[] = useMemo<number[]>((): number[] => {
      const totalPageCount: number = Math.ceil(totalCount / pageSize);

      const totalPageNumbers: number = siblingCount + 5; // 5 is firstPage + lastPage + currentPage + 2*dottedPage

      // case 1 -> if the number of pages is less than the the page numbers we want to show
      if (totalPageNumbers > totalPageCount) {
         return range(1, totalCount);
      }

      const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex: number = Math.min(currentPage + siblingCount, totalCount);

      const needToShowLeftDots: boolean = leftSiblingIndex > 2;
      const needToShowRightDots: boolean = rightSiblingIndex < totalCount - 2;

      // case 2 -> no left dots to show, but right dots to be showed
      if (!needToShowLeftDots && needToShowRightDots) {
         const leftItemCount: number = 3 + 2 * siblingCount;
         const leftRange: number[] = range(1, leftItemCount);
         return [...leftRange, DOTS, totalCount];
      }

      // case 3 -> no right dots to show, but left dots to be showed
      if (!needToShowRightDots && needToShowLeftDots) {
         const rightItemCount: number = 3 + 2 * siblingCount;
         const rightRange: number[] = range(totalCount - rightItemCount + 1, totalCount);
         return [1, DOTS, ...rightRange];
      }

      // case 4 -> both dots to be showed
      const middleRange: number[] = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalCount];
   }, [totalCount, pageSize, siblingCount, currentPage]);

   return paginationRange;
};
