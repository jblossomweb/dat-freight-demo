const validateSearchQueryString = (
  { q }: Record<string, unknown>,
): { q?: string } => ({
  q: typeof q === 'string' ? q : undefined,
});

export default validateSearchQueryString;