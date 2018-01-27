import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInputMapComponent } from './tag-input-map.component';

describe('TagInputMapComponent', () => {
  let component: TagInputMapComponent;
  let fixture: ComponentFixture<TagInputMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagInputMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagInputMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
