import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorgraphsComponent } from './monitorgraphs.component';

describe('MonitorgraphsComponent', () => {
  let component: MonitorgraphsComponent;
  let fixture: ComponentFixture<MonitorgraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorgraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorgraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
