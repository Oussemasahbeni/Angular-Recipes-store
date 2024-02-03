import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { UserGuardService } from './auth/guards/auth-guard.guard';
import { recipeResolver } from './recipes/resolver.service';

const routes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [UserGuardService], children: [
            { path: '', component: RecipesStartComponent },
            { path: 'new', component: RecipesEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver] },
            { path: ':id/edit', component: RecipesEditComponent, resolve: [recipeResolver] },
        ]
    },
];
export const RecipeRoutingRoutes = RouterModule.forChild(routes);
