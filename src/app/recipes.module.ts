import { NgModule } from "@angular/core";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeRoutingRoutes } from "./recipes.routing";
import { SharedModule } from "./shared/shared.module";
@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipesStartComponent,
        RecipesEditComponent,],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        RecipeRoutingRoutes
    ]

})

export class RecipesModule { };