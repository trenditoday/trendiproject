import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from '../models/category';
 
@Injectable()
 
// Service for categories data.
export class CategoryService {
 	
 	private apiURL = 'http://localhost:8090/projects/trendiproject/src/api/'; 

    // We need Http to talk to a remote server.
    constructor(private _http: HttpClient) { }
 
    // Get list of categories from database via api.
    readCategories(){
        return this._http
            .get(this.apiURL + "category/read.php");
    }

    // Send product data to remote server to create it.
    createCategory(category){

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
         }
     
        return this._http.post(
            this.apiURL + "category/create.php",
            category,
            httpOptions
        );
    }

    // Send category ID to remote server to delete it.
	deleteCategory(category_id){
	 
	    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
         }
     	 
	    return this._http.post(
	        this.apiURL + "category/delete.php",
	        { id: category_id },
	        httpOptions
	    );
	}

	// Send product data to remote server to update it.
	updateCategory(category){
	 
	    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
         }
     
	 	    return this._http.post(
	        this.apiURL + "category/update.php",
	        category,
	        httpOptions
	    );
	}
 
}