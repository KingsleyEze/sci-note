import { inject } from 'aurelia-framework';
import { Note } from "common/models/note";
import { SearchResult } from "common/models/search-result";
import { EventAggregator } from 'aurelia-event-aggregator';
import { NOTE_CREATED } from 'common/constants/event-type';
import { levenshteinDistance } from 'common/utils/levenshtein-dist';

// Service class for Note
@inject(EventAggregator)
export class NoteService {

  private ea: EventAggregator;

  private noteList: Note[];

  constructor(eventAggregator: EventAggregator) {
    this.ea = eventAggregator;
    this.noteList = [];
  }

  /**
   *  Creates a new note entry
   * @param note  - The note to create
   */
  create(note: string): void {
    this.noteList.push(new Note(note));
    this.ea.publish(NOTE_CREATED);
  }

  /**
   * Fetch all notes created
   * @returns a list of notes
   */
  fetchAll(): Note[] {
    return (this.noteList)
  }

  /**
   * Searches selected note entry for mating word
   * @param noteId - ID of the note selected
   * @param word - The word to search
   * @returns - Result of matching and similar words
   */
  search(noteId: string, word: string): SearchResult {
    const similar: Array<string> = [];
    const note = this.noteList.filter(data => data.id === noteId)[0];
    note.content.split(' ').forEach(data => {
      const distance = levenshteinDistance(
        data,
        word
      );
      if (distance === 1) similar.push(data);
    })
    const frequency = note.content.split(" ")
      .reduce((acc: number, data) => (data === word ? acc + 1 : acc), 0);

    return new SearchResult(similar, frequency);
  }
}
