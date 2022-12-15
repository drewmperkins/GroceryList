import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListModalComponent } from './grocery-list-modal.component';

describe('GroceryListModalComponent', () => {
  let component: GroceryListModalComponent;
  let fixture: ComponentFixture<GroceryListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
