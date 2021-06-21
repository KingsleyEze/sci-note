import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Note } from 'common/models/note';
import { NoteService } from 'common/services/note-service';
import { NOTE_CREATED } from 'common/constants/event-type';
import { SearchResult } from 'common/models/search-result';
import { I18N } from 'aurelia-i18n';

// Main application class
@inject(EventAggregator, NoteService, I18N)
export class App {

  private ea: EventAggregator;
  public noteService: NoteService;

  public wordNote: string;
  public notes: Note[];
  public isSearch: boolean;
  public hasNotes: boolean;
  public selectedNoteId: string;
  public searchResult: SearchResult;
  public i18n: I18N;

  constructor(eventAggregator: EventAggregator, noteService: NoteService, i18n: I18N) {
    this.ea = eventAggregator;
    this.noteService = noteService;
    this.i18n = i18n;

    this.notes = [];
    this.isSearch = false;
    this.hasNotes = false;
    this.selectedNoteId = '';
  }

  attached(): void {
    this.ea.subscribe(NOTE_CREATED, () => {
      this.notes = this.noteService.fetchAll();
    })
  }

  /**
   * Handlers form create and search inputs
   */
  formHandler(): void {
    if (this.wordNote && !this.isSearch) {
      this.addNote();
    }
    else if (this.wordNote && this.isSearch) {
      this.searchNote();
    }
  }

  /**
   * Creates and add new note entry
   */
  addNote(): void {
    this.noteService.create(this.wordNote);
    this.wordNote = '';
    this.hasNotes = true;
  }

  /**
   * Searches the selected note entry for matching word
   */
  searchNote(): void {
    if (this.selectedNoteId) {
      this.searchResult = this.noteService.search(this.selectedNoteId, this.wordNote);
      console.log(this.searchResult);
    }
  }
}
