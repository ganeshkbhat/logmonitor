import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticlogsComponent } from './staticlogs.component';

describe('StaticlogsComponent', () => {
  let component: StaticlogsComponent;
  let fixture: ComponentFixture<StaticlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
