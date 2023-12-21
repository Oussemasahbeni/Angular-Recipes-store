import { Component, } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  recipe: any;
  id: number = 0;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  onAddToShoppingList() {
    console.log(this.recipe.ingredients)
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDeleteButton() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }

  onEdit() {
    this.router.navigate(['edit',], { relativeTo: this.route })
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route })

  }


}
