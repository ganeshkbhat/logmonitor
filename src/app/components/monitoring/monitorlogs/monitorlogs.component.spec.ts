import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorlogsComponent } from './monitorlogs.component';

describe('MonitorlogsComponent', () => {
  let component: MonitorlogsComponent;
  let fixture: ComponentFixture<MonitorlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
