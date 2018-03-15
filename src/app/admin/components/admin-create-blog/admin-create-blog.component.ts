import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Observable } from 'rxjs/Observable';
import { Blog } from '../../../models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import 'rxjs/Rx';

@Component({
  selector: 'app-admin-create-blog',
  templateUrl: './admin-create-blog.component.html',
  styleUrls: ['./admin-create-blog.component.css'],
  providers: [CategoryService]
})
export class AdminCreateBlogComponent implements OnInit {

  current_date = Date.now();
  cdate:any;
  mdate:any;

  ckeObject:any;
  editorConfig:any;
  blogItem : any; 
  blogID: any;

  public editorValue: string = '';
  // list of categories
    categories: Category[];

  // our angular form
  add_blog_form: FormGroup;

  constructor(private blogService: BlogService, private categoryService: CategoryService, formBuilder: FormBuilder, private datePipe: DatePipe, private router: Router, private actRoute: ActivatedRoute) {

    this.editorConfig = {
    "editable": true,
    "spellcheck": true,
    "height": "500",
    "minHeight": "400",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"],
        ["code"]
    ]
}

	this.add_blog_form = new FormGroup({
        'title': new FormControl('', Validators.required),
        'content': new FormControl('', Validators.required),
        'status':new FormControl('true', Validators.required),
        'category': new FormControl('', Validators.required),
        'meta_keyword': new FormControl('', Validators.required),
        'meta_description': new FormControl('', Validators.required),
        'tags': new FormControl('default')
    });
    
  }

  ngOnInit() {
	      // read categories from database
        this.categoryService.readCategories()
            .subscribe(categories => this.categories=categories['records']);

    // Get blog id to edit / update
    this.blogID = this.actRoute.snapshot.params['id'];

    if(this.blogID) {
      // read categories from database
        this.blogService.readOneBlog(this.blogID)
        .subscribe(response => {

          this.blogItem = response;
          
        this.add_blog_form.patchValue({
          title: this.blogItem.title,
          content: this.blogItem.content,
          status:this.blogItem.status,
          category: this.blogItem.category,
          meta_keyword: this.blogItem.meta_keyword,
          meta_description: this.blogItem.meta_description,
          tags: this.blogItem.tags
      });
      });
    }
  }

  addBlog(){ 

  	this.cdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 
  	this.mdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 

    // send data to server
    let dataToAPI = {
    	title: this.add_blog_form.get('title').value,
    	content:this.add_blog_form.get('content').value,
    	status:this.add_blog_form.get('status').value,
    	category:this.add_blog_form.get('category').value,
    	tags:this.add_blog_form.get('tags').value,
    	meta_keyword:this.add_blog_form.get('meta_keyword').value,
    	meta_description:this.add_blog_form.get('meta_description').value,
    	visits:"0",
    	created_date: this.cdate,
    	modified_date: this.mdate,
    	created_by: 'admin'
    };

    this.blogService.createBlog(dataToAPI)
        .subscribe(
             blog => {
                // show an alert to tell the user if product was created or not
                console.log(blog);
                this.router.navigate(['/blogs']);
             },
             error => console.log(error)
         );
    }

    
}
