import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Blog } from '../models/blog';
 
@Injectable()
 
// Service for Blog data.
export class BlogService {
 
 	private apiURL = 'http://localhost/projects/trendiproject/src/api/'; 

    // We need Http to talk to a remote server.
    constructor(private http : HttpClient){ }
 
    // Get list of blogs from remote server.
    readBlog(){
        return this.http
            .get(this.apiURL + "blog/read.php");
    }

    // Send blog data to remote server to create it.
    createBlog(blog){

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
         }
         console.log(blog);
        return this.http.post(
            this.apiURL + "blog/create.php",
            blog,
            httpOptions
        );
    }

    // Get a blog details from remote server.
    readOneBlog(blog_id){
        return this.http
            .get(this.apiURL + "blog/read_one.php?id="+blog_id);
    }

    // Send blog data to remote server to update it.
    updateBlog(blog){
     
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
         }
     
        return this.http.post(
            this.apiURL + "blog/update.php",
            blog,
            httpOptions
        );
    }

    // Send blog ID to remote server to delete it.
    deleteBlog(blog_id){
     
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
         }
     
        return this.http.post(
            this.apiURL + "blog/delete.php",
            { id: blog_id },
            httpOptions
        );
    }
 
}