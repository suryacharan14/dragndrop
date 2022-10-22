import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudFieldComponent } from './cloud-field.component';

describe('CloudFieldComponent', () => {
  let component: CloudFieldComponent;
  let fixture: ComponentFixture<CloudFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
