import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTasklistComponent } from './edit-tasklist.component';

describe('EditTasklistComponent', () => {
  let component: EditTasklistComponent;
  let fixture: ComponentFixture<EditTasklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTasklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
