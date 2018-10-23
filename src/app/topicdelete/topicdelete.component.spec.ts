import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicdeleteComponent } from './topicdelete.component';

describe('TopicdeleteComponent', () => {
  let component: TopicdeleteComponent;
  let fixture: ComponentFixture<TopicdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
