import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-path-listening-component',
  templateUrl: './path-listening-component.component.html',
  styleUrls: ['./path-listening-component.component.css']
})
export class PathListeningComponentComponent implements OnInit, OnDestroy {

  @Output() path = 'Not yet set';

  public id: number = Math.random();

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
  console.log(`** PathListeningComponent.constructor, id=${this.id}`);
    this.activatedRoute.url.subscribe((segments) => {
      this.onRouteChanged(segments);
    });
  }

  ngOnDestroy(): void {
    console.log('<<< On Destroy');
  }

  onRouteChanged(segments: UrlSegment[]) {
    this.path = segments.join('/');
    console.log(`route changed '${this.path}'`);

  }
}
