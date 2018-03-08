import { Component, OnInit } from '@angular/core';
import { GlobalconfigService } from '../../../services/globalconfig.service';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-dotd-full',
  templateUrl: './dotd-full.component.html',
  styleUrls: ['./dotd-full.component.css']
})
export class DotdFullComponent implements OnInit {

  constructor(private globals: GlobalconfigService, private http: HttpClient) { }

  ngOnInit() {
  }

}
