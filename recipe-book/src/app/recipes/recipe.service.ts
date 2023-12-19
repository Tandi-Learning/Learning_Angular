import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../../app/recipes/recipe';
import { Ingridient } from '../../app/shared';
// import { Http, Headers, Response } from '@angular/http';
// import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe('Schnitzel', 'Very Tasty', 'https://bigoven-res.cloudinary.com/image/upload/main---wiener-schnitzel-8f03d26e1f0f2601215a7029.jpg',
    // [
    //   new Ingridient('French Fries', 2),
    //   new Ingridient('Pork', 1),
    // ]),
    // new Recipe('Summer Salad', 'Okayish', 'http://cdn.iowagirleats.com/wp-content/uploads/2013/05/Triple-Berry-Summer-Salad-03_mini.jpg',
    // [
    //   new Ingridient('Lettuce', 1),
    //   new Ingridient('Avocado', 1),
    //   new Ingridient('Tomato', 1),
    //   new Ingridient('Dressing', 1),
    // ]),
  ];

  constructor(private http: HttpClient) { }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe, 1));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    // return this.http.put('https://recipebook-2da00.firebaseio.com/recipes.json',
    //   body, {headers: headers});
  }

  fetchData() {
    // return this.http.get('https://recipebook-2da00.firebaseio.com/recipes.json')
    //   .map((response: Response) => response.json())
    //   .subscribe(
    //     (data: Recipe[]) => {
    //       this.recipes = data;
    //       this.recipesChanged.emit(this.recipes);
    //       console.log('fetch:' + this.recipes[0].description)
    //     }
    //   );
  }
}
