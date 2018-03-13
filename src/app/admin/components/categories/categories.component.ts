import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../../models/category';
import { CategoryService } from './../../../services/category.service';
import { SlicePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  @ViewChild('categoryModalclose') categoryModalclose: ElementRef;
  @ViewChild('categoryModalopen') categoryModalopen: ElementRef;


  // list of categories
  categories: Category[];

  current_date = Date.now();
  cdate:any;
  mdate:any;

  add_category_form: FormGroup;
  updateFlag: boolean = false;
  category_id: any;
  pagingLength:any;
  contentArray:any;

  constructor(
  	private categoryService: CategoryService,
    formBuilder: FormBuilder,
    private datePipe: DatePipe, 
    private router: Router) { 
  	this.add_category_form = new FormGroup({
        'name': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  	this.readCategory();

  }

  setFlag() {
  	this.updateFlag = false;
  	this.add_category_form.reset();
  }

  readCategory() {
  	// read categories from database
        this.categoryService.readCategories()
            .subscribe(categories => {
              this.categories=categories['records'];
              this.contentArray = this.categories;
              this.returnedArray = this.categories.slice(0, 5);
        });

        this.pagingLength = this.categories.length;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  addCategory(){ 
  	this.updateFlag = false;
  	this.cdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 
  	this.mdate = this.datePipe.transform(this.current_date,"yyyy-MM-dd"); 

    // send data to server
    let dataToAPI = {
    	name: this.add_category_form.get('name').value,
    	description:this.add_category_form.get('description').value,
    	created: this.cdate,
    	modified: this.mdate
    };

    this.categoryService.createCategory(dataToAPI)
        .subscribe(
             category => {
                // show an alert to tell the user if product was created or not
                this.categoryModalclose.nativeElement.click();
                this.readCategory();
                this.router.navigate(['/categories']);
             },
             error => console.log(error)
         );
    }

    openUpdateModal(cat, category_id) {
    	this.updateFlag = true;
    	
    	this.category_id = category_id;
    	this.categoryModalopen.nativeElement.click();
    	this.add_category_form.setValue({
		    name: cat.name,
		    description: cat.description
		});
    }

    updateCategory() {   	
    	
       // add product_id in the object so it can be updated
       this.add_category_form.value.id = this.category_id;
       console.log(this.add_category_form.value);

		// send data to server
        this.categoryService.updateCategory(this.add_category_form.value)
            .subscribe(
                 category => {
                    // go back to list of products
                    this.readCategory();
                    this.updateFlag = false;
                    this.add_category_form.reset();
                    this.categoryModalclose.nativeElement.click();
                 },
                 error => console.log(error)
             );
    }

    // user clicks 'yes' button
    deleteCategory(category_id){

    	swal({
			  title: 'Are you sure to delete?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Delete',
			  cancelButtonText: 'Cancel'
			}).then((result) => {
			  if (result.value) {
			    // delete data from database
		        this.categoryService.deleteCategory(category_id)
		            .subscribe(
		                 category => {
		 
		                    // show an alert to tell the user if product was created or not
		                    console.log(category);
		 
		                    // go back to list of products
                        this.router.navigate(['/categories']);
		                    this.readCategory();

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
