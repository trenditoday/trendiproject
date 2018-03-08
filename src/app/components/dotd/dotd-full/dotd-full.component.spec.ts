import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotdFullComponent } from './dotd-full.component';

describe('DotdFullComponent', () => {
  let component: DotdFullComponent;
  let fixture: ComponentFixture<DotdFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotdFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotdFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
