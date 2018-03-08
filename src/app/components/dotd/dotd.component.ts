import { Component, OnInit } from '@angular/core';
import { GlobalconfigService } from '../../services/globalconfig.service';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dotd',
  templateUrl: './dotd.component.html',
  styleUrls: ['./dotd.component.css']
})
export class DotdComponent implements OnInit {

  flipkartTID: string;
  flipkartToken: string;
  dotdData:any;

  constructor(private globals: GlobalconfigService, private http: HttpClient) { 

  //Fuction to get Flipkart deals of the day
  	// let url = this.globals.fKDOTDUrl;
  	// this.flipkartTID = this.globals.flipkartTID;
  	// this.flipkartToken = this.globals.flipkartToken;

  	// let httpHeaders = new HttpHeaders()
   //                       .set('Access-Control-Allow-Origin', '*')
   //                      .append('Fk-Affiliate-Id', this.flipkartTID)
	  //               .append('Fk-Affiliate-Token', this.flipkartToken);
   // let httpParams = new HttpParams();

	  //               this.http.get(url, {
		 //        headers: httpHeaders,
		 //        params: httpParams}).subscribe(
   //    success => {
   //      console.log("Successfully Completed");
   //      console.log(success);
   //    }
   //  );

   let url ='../../../assets/json/dotd.json';

    this.http.get(url).subscribe(
      dotdData => {
        this.dotdData = dotdData;
      }
    );


 //  	let headers = new HttpHeaders();
	// headers = headers.set('h1', 'v1');
	// headers.set('Fk-Affiliate-Id', this.flipkartTID);
	// headers.set('Fk-Affiliate-Token', this.flipkartToken);
	

 //    const httpOptions = {
	// 	  headers: new HttpHeaders({
	// 	    'Fk-Affiliate-Id': this.flipkartTID,
	// 	    'Fk-Affiliate-Token' : this.flipkartToken
	// 	  })
	// 	};

	// this.http.get(url, httpOptions).subscribe(
 //      success => {
 //        console.log("Successfully Completed");
 //        console.log(success);
 //      }
 //    );


//     var flipkartAffiliate = require("flipkart-affiliate");
//     var affiliate = require('flipkart-affiliate-client');

//     var client = affiliate.createClient({
//   FkAffId: 'trenditoday',
//   FkAffToken: '3d15505b7a02439592413e30e7d35e87',
//   responseType: 'json'
// });
//     client.getAllOffers(null,function(err, resp){
//   if(!err){
//     console.log(resp);
//   }else{
//     console.log(err);
//   }
// });


//     var fkc = flipkartAffiliate.createClient({
//   FkAffId: 'trenditoday', 
//   FkAffToken: '3d15505b7a02439592413e30e7d35e87',
//   responseType: 'json'
// });

//     fkc.getDealsOfDay(null,function(err, resp){ //DOD 
//   if(!err){
//     console.log(resp);
//   }else{
//     console.log(err);
//   }
// });

	// this.http
 //        .get("http://localhost/projects/affiliate/src/api/objects/http-request.php")
 //        .map(res => res.json());
 //  }

  }
  ngOnInit() {

  	}

}
