import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneOfGreenGablesComponent } from './anne-of-green-gables.component';

describe('AnneOfGreenGablesComponent', () => {
  let component: AnneOfGreenGablesComponent;
  let fixture: ComponentFixture<AnneOfGreenGablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnneOfGreenGablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnneOfGreenGablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  