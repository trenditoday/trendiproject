import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Product } from '../models/product';
 
@Injectable()
 
// Service for products data.
export class ProductService {
 
 	private apiURL = 'http://localhost/projects/affiliate/src/api/'; 

    // We need Http to talk to a remote server.
    constructor(private _http : Http){ }
 
    // Get list of products from remote server.
    readProducts(): Observable<Product[]>{
        return this._http
            .get(this.apiURL + "product/read.php")
            .map(res => res.json());
    }

    // Send product data to remote server to create it.
createProduct(product): Observable<Product>{
 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(
        this.apiURL + "product/create.php",
        product,
        options
    ).map(res => res.json());
}

// Get a product details from remote server.
readOneProduct(product_id): Observable<Product>{
    return this._http
        .get(this.apiURL + "product/read_one.php?id="+product_id)
        .map(res => res.json());
}

// Send product data to remote server to update it.
updateProduct(product): Observable<Product>{
 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(
        this.apiURL + "product/update.php",
        product,
        options
    ).map(res => res.json());
}

// Send product ID to remote server to delete it.
deleteProduct(product_id){
 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(
        this.apiURL + "product/delete.php",
        { id: product_id },
        options
    ).map(res => res.json());
}
 
}