import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePageFormComponent } from './manage-page-form.component';

describe('ManagePageFormComponent', () => {
  let component: ManagePageFormComponent;
  let fixture: ComponentFixture<ManagePageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
