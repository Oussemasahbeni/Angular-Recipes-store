import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipeChanged = new Subject<Recipe[]>();

  url = 'https://recipe-book-ce086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'

  // private recipes: Recipe[] = [new Recipe('A Test Recipe',
  //   'This is simply a test',
  //   'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-2-1200.jpg',
  //   [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  // ),
  // new Recipe('Another Test Recipe', 'This is simply a test', 'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-2-1200.jpg',
  //   [new Ingredient('Buns', 4), new Ingredient('Meat', 22)]
  // ),];

  private recipes: Recipe[] = []

  getRecipes() {
    return this.http.get<Recipe[]>(this.url)
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }




  storeRecipes() {
    this.http.post<Recipe[]>(this.url, this.recipes).subscribe((response) => {
      // console.log(response)
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url)
      .pipe(map(items => {
        // console.log(items)
        return items.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
        tap(recipe => {
          // console.log(recipe)
          this.recipes = recipe;
        })
      )
    // .subscribe((response) => {
    //   this.recipes = response;
    //   this.recipeChanged.next(this.recipes.slice())
    // })
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())

    // this.http.put<Recipe[]>(this.url, this.recipes).subscribe((response) => {
    //   console.log(response)
    // })


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


  constructor(private shoppingService: ShoppingListService, private http: HttpClient) { }

}
