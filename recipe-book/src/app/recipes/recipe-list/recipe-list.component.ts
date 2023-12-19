import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe, RecipeService } from '../../../app/recipes';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] ;

  constructor( private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    )
  }
}
