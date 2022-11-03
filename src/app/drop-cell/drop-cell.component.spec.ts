import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropCellComponent } from './drop-cell.component';

describe('DropCellComponent', () => {
  let component: DropCellComponent;
  let fixture: ComponentFixture<DropCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
