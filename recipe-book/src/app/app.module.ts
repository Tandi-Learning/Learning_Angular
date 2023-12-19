import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeService, RecipesComponent } from './recipes';
import { RecipeListComponent,  RecipeItemComponent } from './recipes/recipe-list';
import { RecipeDetailComponent } from './recipes/recipe-detail';
import { DropdownDirective } from './dropdown.directive';
import { ShoppingListComponent, ShoppingListAddComponent, ShoppingListService } from './shopping-list';
import { AppRoutingModule } from './app.routes';
import { RecipeStartComponent } from './recipes/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    RecipeBookComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListAddComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [RecipeBookComponent]
})
export class AppModule { }
