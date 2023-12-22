import { Injectable, inject } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(private recipeService: RecipesService) { }

  fetchRecipes() {
    return this.recipeService.fetchRecipes();

  }

  getRecipes() {
    return this.recipeService.getRecipes();

  }



}


export const recipeResolver: ResolveFn<Recipe[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    if (inject(ResolverService).getRecipes.length === 0) {
      return inject(ResolverService).fetchRecipes();

    } else {
      return inject(ResolverService).getRecipes();
    }

  };