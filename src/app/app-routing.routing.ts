import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes.module').then(m => m.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => (import('./shopping-list.module').then(m => m.ShoppingListModule)) },
  { path: 'auth', component: AuthComponent }
];

export const AppRoutingRoutes = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
