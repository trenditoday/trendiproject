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
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { ToastrService } from 'ngx-toastr';

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

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  blogTags:any = [];

  public editorValue: string = '';
  // list of categories
    categories: Category[];

  // our angular form
  add_blog_form: FormGroup;

  ckeditorContent: string = '<p>Some html</p>';
  itemList = [];
  selectedItems = [];
  settings = {};

  constructor(private blogService: BlogService, private categoryService: CategoryService, formBuilder: FormBuilder, private datePipe: DatePipe, private router: Router, private actRoute: ActivatedRoute, private toastr: ToastrService) {

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

// read categories from database
    this.categoryService.readCategories()
        .subscribe(categories => {
          this.categories=categories['records'];
    });

	this.add_blog_form = new FormGroup({
        'id': new FormControl({value: null, disabled:true}),
        'title': new FormControl('', Validators.required),
        'content': new FormControl('', Validators.required),
        'status':new FormControl('1', Validators.required),
        'selectedItems': new FormControl([], Validators.required),
        'meta_keyword': new FormControl('', Validators.required),
        'meta_description': new FormControl('', Validators.required),
        'tags': new FormControl('default')
    });
    
  }

  ngOnInit() {

        this.settings = {
            text: "Select Category",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: "myclass custom-class"
        };    

    // Get blog id to edit / update
    this.blogID = this.actRoute.snapshot.params['id'];

    if(this.blogID) {
      // read categories from database
        this.blogService.readOneBlog(this.blogID)
        .subscribe(response => {

        this.blogItem = response;

        for(let cat of this.blogItem.category) {
         let filterCat = this.categories.find(item => item.id === cat);
         this.itemList.push(filterCat);
        }

        // this.itemList = [
        //   { id: "59", itemName: "Admin", description: "Amin desc" },​
        //   { id: "61", itemName: "Furniture", description: "Furniture Description" }
        // ];
          
        this.add_blog_form.patchValue({
          id: this.blogItem.id,
          title: this.blogItem.title,
          content: this.blogItem.content,
          status:this.blogItem.status,
          selectedItems: this.itemList,
          meta_keyword: this.blogItem.meta_keyword,
          meta_description: this.blogItem.meta_description,
          tags: this.blogItem.tags
        });

        // Convert comma separated string into array
        this.blogTags = this.blogItem.tags.split(",");

      });
    }
  };

  addTag(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.blogTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  };

  removeTag(tag: any): void {
    let index = this.blogTags.indexOf(tag);

    if (index >= 0) {
      this.blogTags.splice(index, 1);
    }
  };

  onItemSelect(item: any) {
    //console.log(item);
    this.selectedItems.push(item);
    //console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        //console.log(item);
        let index = this.selectedItems.indexOf(item);

        if (index >= 0) {
          this.selectedItems.splice(index, 1);
        }
        //console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        //console.log(items);
    }
    onDeSelectAll(items: any) {
        //console.log(items);
    }

  submitBlog() {

    let id = this.add_blog_form.get('id').value;
    if(id == null) {
      this.addBlog();
    } else {
      this.updateBlog();
    }
  };

  addBlog(){ 

  	this.cdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 
  	this.mdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 
    // send data to server
    let dataToAPI = {
    	title: this.add_blog_form.get('title').value,
    	content:this.add_blog_form.get('content').value,
    	status:this.add_blog_form.get('status').value,
    	selectedItems:this.itemList,
    	tags:this.blogTags,
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
                // show an alert to tell the user if blog was created or not
                console.log(blog);
                this.router.navigate(['/blogs']);
                this.toastr.success('Blog Created', 'Success', {
                  timeOut: 3000,
                  positionClass: "toast-top-center"
                });
             },
             error => console.log(error)
         );
    }

    updateBlog(){ 

    this.mdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 
    // send data to server
    let dataToAPI = {
      id: this.add_blog_form.get('id').value,
      title: this.add_blog_form.get('title').value,
      content:this.add_blog_form.get('content').value,
      status:this.add_blog_form.get('status').value,
      selectedItems:this.itemList,
      tags:this.blogTags,
      meta_keyword:this.add_blog_form.get('meta_keyword').value,
      meta_description:this.add_blog_form.get('meta_description').value,
      visits:"0",
      created_date: this.blogItem.created_date,
      modified_date: this.mdate,
      created_by: 'admin'
    };

    console.log(dataToAPI);

    this.blogService.updateBlog(dataToAPI)
        .subscribe(
             blog => {
                // show an alert to tell the user if blog was updated or not
                console.log(blog);
                this.router.navigate(['/blogs']);
                this.toastr.success('Blog updated', 'Success', {
                  timeOut: 3000,
                });
             },
             error => console.log(error)
         );
    }
    
}
