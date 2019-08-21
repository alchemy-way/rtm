import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { Location } from '@angular/common';
import { PathListeningComponentComponent } from './path-listening-component.component';
import {RouterTestingModule} from '@angular/router/testing';

import {routes} from '../app-routing.module';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {ReplaySubject} from 'rxjs';


class ActivatedRouteStub {
  private urlSubject = new ReplaySubject<UrlSegment[]>();
  readonly url = this.urlSubject.asObservable();

  constructor() {
    this.setUrl([]);
  }

  setUrl(segments: string[]) {
    this.urlSubject.next(segments.map((s) => {
      return new UrlSegment(s, {});
    }));
  }
}

describe('PathListeningComponentComponent', () => {
  let router: Router;
  let location: Location;
  let component: PathListeningComponentComponent;
  let fixture: ComponentFixture<PathListeningComponentComponent>;

  describe('with RouterTestingModule', () => {
    console.log('--- with RouterTestingModule tests ----');

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PathListeningComponentComponent ],
        imports: [
          RouterTestingModule.withRoutes(routes)
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      router.initialNavigation();
      console.log('after initial navigation');
      fixture = TestBed.createComponent(PathListeningComponentComponent);
      component = fixture.componentInstance;
      console.log('after create component test bed', component.id);
      fixture.detectChanges();
    });

    it('should change path when navigating', fakeAsync(() => {
      router.navigateByUrl('/one');
      console.log('navigate to one');
      tick();
      expect(location.path()).toBe('/one');
      expect(component.path).toBe('one');

      console.log('navigate to two');
      router.navigateByUrl('/two');
      tick();
      expect(location.path()).toBe('/two');
      expect(component.path).toBe('two');

      console.log('navigate to three');
      router.navigateByUrl('/three');
      tick();
      expect(location.path()).toBe('/three');
      expect(component.path).toBe('three');
    }));
  });

  describe('with ActivatedRouteStub', () => {
    console.log('--- with ActivatedRouteStub tests ----');

    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(async(() => {
      activatedRouteStub = new ActivatedRouteStub();

      TestBed.configureTestingModule({
        declarations: [ PathListeningComponentComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PathListeningComponentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should change path when navigating', () => {
      activatedRouteStub.setUrl(['one']);
      expect(component.path).toBe('one');
      activatedRouteStub.setUrl(['two']);
      expect(component.path).toBe('two');
      activatedRouteStub.setUrl(['three']);
      expect(component.path).toBe('three');
    });
  });
});
