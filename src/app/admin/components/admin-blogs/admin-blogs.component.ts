import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Observable } from 'rxjs/Observable';
import { Blog } from '../../../models/blog';
import { SlicePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
 
export class AdminBlogsComponent implements OnInit {

 	page: number = 1;
    // store list of products
    blogs: Blog[];

    current_date = Date.now();
    cdate:any;
    mdate:any;
 
    // initialize productService to retrieve list products in the ngOnInit()
    constructor(
    	private blogService: BlogService,
    	private datePipe: DatePipe, 
    	private router: Router
    ){
    }

     // Read blogs from API.
    ngOnInit(){
        this.readBlog();
    }

    readBlog() {
  	// read blog from database
        this.blogService.readBlog()
            .subscribe(blogs =>
                this.blogs=blogs['records']
            );
  }
 
 deleteBlog(blog_id){ 

   swal({
        title: 'Are you sure to delete?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {

    this.blogService.deleteBlog(blog_id)
        .subscribe(
             blog => {
                // show an alert to tell the user if blog was deleted or not
                console.log(blog);
                this.readBlog();
                this.router.navigate(['/blogs']);
             },
             error => console.log(error)
         );
   
 
       } else if (result.dismiss === swal.DismissReason.cancel) {
          swal(
            'Cancelled'
          )
        }
      });
       }
}