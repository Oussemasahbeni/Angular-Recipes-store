import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { ResolverService, recipeResolver } from './recipes/resolver.service';
import { AuthComponent } from './auth/auth.component';
import { UserGuardService } from './auth/guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, canActivate: [UserGuardService], children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver] },
      { path: ':id/edit', component: RecipesEditComponent, resolve: [recipeResolver] },

    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

export const AppRoutingRoutes = RouterModule.forRoot(routes);
