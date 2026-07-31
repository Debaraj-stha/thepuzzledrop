export function normalizeAnswer(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, '') // remove punctuation
    .replace(/\s+/g, ' '); // collapse spaces
}

export function isAnswerCorrect(userAnswer: string, validAnswers: string[]): boolean {
  const normUser = normalizeAnswer(userAnswer);
  if (!normUser) return false;

  // Strip leading articles for comparison
  const stripArticles = (str: string) => str.replace(/^(a|an|the)\s+/, '');
  const coreUser = stripArticles(normUser);

  for (const valid of validAnswers) {
    const normValid = normalizeAnswer(valid);
    const coreValid = stripArticles(normValid);

    if (normUser === normValid || coreUser === coreValid) {
      return true;
    }
  }

  return false;
}
