import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsettingsComponent } from './monitorsettings.component';

describe('MonitorsettingsComponent', () => {
  let component: MonitorsettingsComponent;
  let fixture: ComponentFixture<MonitorsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
