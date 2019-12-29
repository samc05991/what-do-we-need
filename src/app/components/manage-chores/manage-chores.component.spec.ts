import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChoresComponent } from './manage-chores.component';

describe('ManageChoresComponent', () => {
  let component: ManageChoresComponent;
  let fixture: ComponentFixture<ManageChoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
