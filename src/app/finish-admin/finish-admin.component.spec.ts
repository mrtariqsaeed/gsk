import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAdminComponent } from './finish-admin.component';

describe('FinishAdminComponent', () => {
  let component: FinishAdminComponent;
  let fixture: ComponentFixture<FinishAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
