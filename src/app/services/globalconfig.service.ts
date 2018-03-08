import { Injectable } from '@angular/core';

@Injectable()
export class GlobalconfigService {

  constructor() { }

  baseApiUrl: string = 'http://localhost/projects/affiliate/src/api/';

  //Flipkart Affiliate Configuration

  flipkartTID: string = 'trenditoday';
  flipkartToken: string = '3d15505b7a02439592413e30e7d35e87';

  fKDOTDUrl:string = 'https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json';


  // Amazon Associate Configuration
}
