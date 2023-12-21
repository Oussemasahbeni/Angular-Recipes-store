import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input() item: any;
  @Input() index: number | undefined;





}
