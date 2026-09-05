export const dateStringComparator = (
  dateStrA: string | undefined | null,
  dateStrB: string | undefined | null,
): number => {
  const timeA = dateStrA ? Date.parse(dateStrA) : 0;
  const timeB = dateStrB ? Date.parse(dateStrB) : 0;

  return timeA - timeB;
};
