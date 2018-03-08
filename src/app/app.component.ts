import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const DOGS_KEY = makeStateKey('dogs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  dogs: any;

  constructor(
    private http: HttpClient,
    private state: TransferState
  ) { }

  ngOnInit() {

  this.dogs = this.state.get(DOGS_KEY, null as any);
  
    this.http
      .get('https://dog.ceo/api/breeds/list/all')
      .subscribe(data => {
        this.dogs = data;
          this.state.set(DOGS_KEY, data as any);
      });
  }
}
