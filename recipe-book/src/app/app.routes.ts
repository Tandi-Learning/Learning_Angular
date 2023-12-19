// import { RecipesComponent } from '../app/recipes';
// import { ShoppingListComponent } from '../app/shopping-list';
// import { NgModule } from '@angular/core';
// import { RECIPES_ROUTES } from '../app/recipes/recipes.routes';
// import { RouterModule, Routes } from '@angular/router';

// export const APP_ROUTES: Routes = [
//   { path: '', redirectTo: '/recipes', pathMatch: 'full' },
//   { path: 'recipes', component: RecipesComponent, children: RECIPES_ROUTES },
//   { path: 'shopping-list', component: ShoppingListComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(APP_ROUTES)],
//   exports: [RouterModule]
// })
// export class AppRoutesModule {
// }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
