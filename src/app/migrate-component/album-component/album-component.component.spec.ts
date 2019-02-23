import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumComponentComponent } from './album-component.component';

describe('AlbumComponentComponent', () => {
  let component: AlbumComponentComponent;
  let fixture: ComponentFixture<AlbumComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
