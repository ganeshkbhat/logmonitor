import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsettingsComponent } from './staticsettings.component';

describe('StaticsettingsComponent', () => {
  let component: StaticsettingsComponent;
  let fixture: ComponentFixture<StaticsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
