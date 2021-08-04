import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductApiActions, ProductPageActions } from './actions';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  currentProductId: number | null;
  products: Product[];
  error: string;
};

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: null,
  products: [],
  error: ''
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, props): ProductState => {
    return {
      ...state,
      currentProductId: props.currentProductId
    }
  }),
  on(ProductPageActions.clearCurrentProduct, (state, props): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductPageActions.initializeCurrentProduct, (state, props): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductApiActions.loadProductsSuccess, (state, props): ProductState => {
    return {
      ...state,
      products: props.products,
      error: ''
    }
  }),
  on(ProductApiActions.loadProductsFailure, (state, props): ProductState => {
    return {
      ...state,
      products: [],
      error: props.error
    }
  }),
  on(ProductApiActions.updateProductSuccess, (state, props): ProductState => {
    const updatedProducts = state.products.map(product =>
      product.id === props.product.id ? props.product : product
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: props.product.id,
      error: ''
    }
  }),
  on(ProductApiActions.updateProductFailure, (state, props): ProductState => {
    return {
      ...state,
      error: props.error
    }
  }),
  on(ProductApiActions.createProductSuccess, (state, props): ProductState => {
    return {
      ...state,
      products: [...state.products, props.product],
      error: ''
    }
  }),
  on(ProductApiActions.createProductFailure, (state, props): ProductState => {
    return {
      ...state,
      error: props.error
    }
  }),
  on(ProductApiActions.deleteProductSuccess, (state, props): ProductState => {
    const updatedProducts = state.products.filter(product => product.id != props.productId);
    return {
      ...state,
      products: updatedProducts,
      error: ''
    }
  }),
  on(ProductApiActions.deleteProductFailure, (state, props): ProductState => {
    return {
      ...state,
      error: props.error
    }
  }),
);
