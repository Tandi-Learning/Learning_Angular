import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import { ProductApiActions, ProductPageActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService) {
  }

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(action => this.productService.getProducts().pipe(
        map(products => ProductApiActions.loadProductsSuccess( {products})),
        catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
      ))
    )
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap(action => {
        return this.productService.updateProduct(action.product).pipe(
          map(product => ProductApiActions.updateProductSuccess({ product })),
          catchError(error => of(ProductApiActions.updateProductFailure({ error })))
        )
      })
    )
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      concatMap(action => {
        return this.productService.createProduct(action.product).pipe(
          map(product => ProductApiActions.createProductSuccess({product})),
          catchError(error => of(ProductApiActions.createProductFailure({ error })))
        )
      })
    )
  })

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      mergeMap(action => {
        return this.productService.deleteProduct(action.productId).pipe(
          map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
          catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
        )
      })
    )
  })
}
