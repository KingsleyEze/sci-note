import { EventAggregator } from 'aurelia-event-aggregator';
import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent } from 'aurelia-testing';
import { PLATFORM } from 'aurelia-pal';
import { NoteService } from 'common/services/note-service';

describe('Stage App Component', () => {
  let component;
  const ea = {} as EventAggregator;
  const service = new NoteService(ea);

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('app'))
      .inView('<app></app>');
    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(NoteService, service);
    });
  });

  afterEach(() => component.dispose());


  it('should show label for note mode', done => {
    component.create(bootstrap).then(() => {

      component.waitForElement('.note-mode').then((noteMode): void => {
        console.log('noteMode', noteMode.innerHTML);
        expect(noteMode.innerHTML.trim()).toBe('MODE');
        done();
      });
      done();
    }).catch(e => {
      fail(e);
    });
  });

  it('should show input field', done => {
    component.create(bootstrap).then(() => {
      component.waitForElement('.note-input').then((noteInput): void => {
        expect(noteInput.innerHTML.trim()).toBe('');
        done();
      });
      done();
    }).catch(e => {
      fail(e);
    });
  });

  it('should show button control', done => {
    component.create(bootstrap).then(() => {
      component.waitForElement('.note-button').then((noteButton): void => {
        expect(noteButton.innerHTML.trim()).toBe('Add Word');
        done();
      });
      done();
    }).catch(e => {
      fail(e);
    });
  });
});
