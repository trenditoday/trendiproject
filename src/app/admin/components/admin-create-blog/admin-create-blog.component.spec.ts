import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateBlogComponent } from './admin-create-blog.component';

describe('AdminCreateBlogComponent', () => {
  let component: AdminCreateBlogComponent;
  let fixture: ComponentFixture<AdminCreateBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
