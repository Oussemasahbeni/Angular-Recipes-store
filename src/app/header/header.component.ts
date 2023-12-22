import { Component, } from '@angular/core';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private recipeService: RecipesService) {

  }

  onSaveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    this.recipeService.fetchRecipes().subscribe();
  }

}
