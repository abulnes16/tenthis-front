import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPageFormComponent } from './new-page-form.component';

describe('NewPageFormComponent', () => {
  let component: NewPageFormComponent;
  let fixture: ComponentFixture<NewPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
