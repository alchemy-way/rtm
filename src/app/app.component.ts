import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rtm';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.url.subscribe((value) => {
      console.log('AppComponent.subscribe');
      },
      (error) => {
      console.log('AppComponent.error');
      },
      () => {
        console.log('App Component Complete');
    });
  }

  ngOnInit(): void {
    console.log('on init');
  }
}
