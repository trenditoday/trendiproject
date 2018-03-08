import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(meta: Meta, title: Title) {

      // Sets the <title></title>
      title.setTitle('TrendiToday - Real Time Trending Now');

      // Sets the <meta> tag for the page
      meta.addTags([
        { name: 'keyword', content: 'TrendiToday, Realtime, trending now, Ecommerce Information, Online Shopping' },
        { name: 'description', content: 'TrendiToday - Real Time Trending Now, All Realtime information for giant ecommerce websites' },
      ]);
  }

  ngOnInit() {
  }

}
