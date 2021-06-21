// Search model class
export class SearchResult {
  public result: string[];
  public matchCount: number;
  constructor(result: string[], matchCount: number) {
    this.result = result;
    this.matchCount = matchCount;
  }
}
