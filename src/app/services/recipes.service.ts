import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [new Recipe('A Test Recipe',
    'This is simply a test',
    'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-2-1200.jpg',
    [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  ),
  new Recipe('Another Test Recipe', 'This is simply a test', 'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-2-1200.jpg',
    [new Ingredient('Buns', 4), new Ingredient('Meat', 22)]
  ),];


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())


  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    console.log(ingredients)
    this.shoppingService.addIngredients(ingredients)
  }


  constructor(private shoppingService: ShoppingListService) { }

}
