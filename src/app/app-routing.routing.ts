import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { ResolverService, recipeResolver } from './recipes/resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesEditComponent },
      { path: ':id', component: RecipeDetailComponent,resolve: [recipeResolver] },
      { path: ':id/edit', component: RecipesEditComponent, resolve: [recipeResolver] },

    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
];

export const AppRoutingRoutes = RouterModule.forRoot(routes);
