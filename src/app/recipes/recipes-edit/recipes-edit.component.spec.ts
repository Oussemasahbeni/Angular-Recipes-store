import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesEditComponent } from './recipes-edit.component';

describe('RecipesEditComponent', () => {
  let component: RecipesEditComponent;
  let fixture: ComponentFixture<RecipesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
