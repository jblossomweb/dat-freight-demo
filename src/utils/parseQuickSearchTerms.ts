const parseQuickSearchTerms = (search: string): string[] => {
  const terms: string[] = [];
  let term = '';
  let inQuotes = false;

  const addTerm = () => {
    const normalizedTerm = term.trim().toLowerCase();

    if (normalizedTerm) {
      terms.push(normalizedTerm);
    }

    term = '';
  };

  for (let index = 0; index < search.length; index += 1) {
    const character = search[index];
    const nextCharacter = search[index + 1];

    if (inQuotes && character === '\\' && nextCharacter === '"') {
      term += '"';
      index += 1;
    } else if (character === '"') {
      addTerm();
      inQuotes = !inQuotes;
    } else if (!inQuotes && /\s/.test(character)) {
      addTerm();
    } else {
      term += character;
    }
  }

  addTerm();

  return terms;
};

export default parseQuickSearchTerms;