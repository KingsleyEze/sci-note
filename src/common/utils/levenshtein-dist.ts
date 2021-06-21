/**
 * Levenshtein distance utility for comparing words
 * @param a - Note entry word
 * @param b - Search entru word
 * @returns -  Distance between the two word match
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j;
  }
  for (let j = 1; j <= b.length; j += 1) {
    for (let k = 1; k <= a.length; k += 1) {
      const indicator = a[k - 1] === b[j - 1] ? 0 : 1;
      matrix[j][k] = Math.min(
        matrix[j][k - 1] + 1,
        matrix[j - 1][k] + 1,
        matrix[j - 1][k - 1] + indicator
      );
    }
  }
  return matrix[b.length][a.length];
}
