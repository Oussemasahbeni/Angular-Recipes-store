import { Component, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnDestroy {


  recipes: Recipe[] = [];
  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute) {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe((recipes) => {
      this.recipes = recipes
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })

  }

  ngOnDestroy(): void {
    this.recipeService.recipeChanged.unsubscribe()
  }





}
