import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateComponentComponent } from './migrate-component.component';

describe('MigrateComponentComponent', () => {
  let component: MigrateComponentComponent;
  let fixture: ComponentFixture<MigrateComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrateComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
