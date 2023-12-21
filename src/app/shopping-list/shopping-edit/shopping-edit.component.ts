import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingForm: FormGroup = new FormGroup({});
  editMode: boolean = false
  editItemIndex: number = 0;
  editedItem: Ingredient = new Ingredient('', 0);

  Subscription: Subscription = new Subscription();
  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])

    })
    this.Subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true
      this.editItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  onAdd() {
    const newIngredient = new Ingredient(this.shoppingForm.value.name, this.shoppingForm.value.amount);

    this.editMode ? this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient) :
      this.shoppingListService.onIngredientAdded(newIngredient)

    this.clear()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex)
    this.clear()
  }

  clear() {
    this.editMode = false
    this.shoppingForm.reset()
  }
}
