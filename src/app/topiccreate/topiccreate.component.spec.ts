import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopiccreateComponent } from './topiccreate.component';

describe('TopiccreateComponent', () => {
  let component: TopiccreateComponent;
  let fixture: ComponentFixture<TopiccreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopiccreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopiccreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
