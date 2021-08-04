import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ProductState } from './product.reducer';

export interface State extends AppState.State {
  products: ProductState
};

const getProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureSelector,
  productState => productState.showProductCode
);

export const getProducts =  createSelector(
  getProductFeatureSelector,
  productState => productState.products
);

// selector composition (using multiple selectors)
export const getCurrentProductId = createSelector(
  getProductFeatureSelector,
  productState => productState.currentProductId
);

export const getCurrentProduct =  createSelector(
  getProductFeatureSelector,
  getCurrentProductId,
  (productState, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    } else {
      return currentProductId ? productState.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getCurrentProductById = createSelector(
  getProducts,
  getCurrentProductId,
  (products, productId) => products.filter(p => p.id === productId)
);

export const getError = createSelector(
  getProductFeatureSelector,
  productState => productState.error
);
