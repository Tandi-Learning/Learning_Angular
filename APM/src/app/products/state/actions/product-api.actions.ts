import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const loadProductsSuccess = createAction(
  '[Product Api] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product Api] Load Fail',
  props<{ error: string }>()
);

export const updateProductSuccess = createAction(
  '[Product Api] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product Api] Update Product Failure',
  props<{ error: string }>()
);

export const createProductSuccess = createAction(
  '[Product Api] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product Api] Create Product Failure',
  props<{ error: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product Api] delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductFailure = createAction(
  '[Product Api] Delete Product Failure',
  props<{ error: string }>()
);
