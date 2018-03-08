import { Component, OnInit } from '@angular/core';
import { GlobalconfigService } from '../../services/globalconfig.service';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offerData:any;

  constructor(private globals: GlobalconfigService, private http: HttpClient) {

  let url ='../../../assets/json/offer.json';

    this.http.get(url).subscribe(
      responseData => {
        this.offerData = responseData;
        console.log(this.offerData);
      }
    );
  }

  ngOnInit() {
  }

}
