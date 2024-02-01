import { Component, OnDestroy, OnInit, } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription = new Subscription();
  isAuthenticated = false;

  constructor(private recipeService: RecipesService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // if (user) {
      //   this.isAuthenticated = true
      // }
      //!! means if user is truthy, isAuthenticated is true, else false
      this.isAuthenticated = !!user
    })
  }

  onSaveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    this.recipeService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
