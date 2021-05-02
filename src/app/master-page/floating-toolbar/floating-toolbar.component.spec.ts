import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FloatingToolbarComponent } from './floating-toolbar.component';

describe('FloatingToolbarComponent', () => {
  let component: FloatingToolbarComponent;
  let fixture: ComponentFixture<FloatingToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
