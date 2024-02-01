import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, exhaustMap, map, take, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipeChanged = new Subject<Recipe[]>();

  url = 'https://recipe-book-ce086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'

  constructor(private shoppingService: ShoppingListService, private http: HttpClient, private authService: AuthService) { }
  private recipes: Recipe[] = []

  getRecipes() {
    return this.http.get<Recipe[]>(this.url)
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  storeRecipes() {
    console
    this.http.post<Recipe[]>(this.url, this.recipes).subscribe((response) => {
      // console.log(response)
    })
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>(this.url)
      .pipe(
        map(items => {
          // console.log(items)
          return items.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        }),
        tap(recipe => {
          // console.log(recipe)
          this.recipes = recipe;
        }));


  }
  addRecipe(recipe: Recipe) {
    // console.log(recipe)
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())

    this.http.put<Recipe[]>(this.url, this.recipes).subscribe((response) => {
      // console.log(response)
    })


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




}
