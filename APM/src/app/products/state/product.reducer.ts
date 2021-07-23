import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';

import * as AppState from '../../state/app.state';

import * as ProductActions from './product.actions';

export interface State extends AppState.State {
  products: ProductState
};

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  currentProductId: number;
  products: Product[];
  error: string;
};

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: 0,
  products: [],
  error: ''
};

const getProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureSelector,
  productState => productState.showProductCode
);

export const getCurrentProduct =  createSelector(
  getProductFeatureSelector,
  productState => productState.currentProduct
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

export const getCurrentProductById = createSelector(
  getProducts,
  getCurrentProductId,
  (products, productId) => products.filter(p => p.id === productId)
);

export const getError = createSelector(
  getProductFeatureSelector,
  productState => productState.error
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    }
  }),
  on(ProductActions.clearCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: null
    }
  }),
  on(ProductActions.initializeCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productCode: 'New',
        productName: '',
        description: '',
        starRating: 0
      }
    }
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  })
);
