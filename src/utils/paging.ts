import { Paging } from '@/types';

export const computeFromTo = ({ limit, page, offset = 0 }: Paging) => {
  const from = (page - 1) * limit + offset;
  const to = from + limit;

  return { from, to };
};
