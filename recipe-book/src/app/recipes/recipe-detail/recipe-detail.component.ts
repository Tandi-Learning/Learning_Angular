import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../app/recipes/recipe';
import { ShoppingListService } from '../../../app/shopping-list';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../../app/recipes';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private selectedRecipe: Recipe;
  private recipeIndex: number;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList() {
    this.shoppingListService.addItems(this.selectedRecipe.ingridients);
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }
}
