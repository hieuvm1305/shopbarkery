import { configureStore } from '@reduxjs/toolkit';
import unitSlice from '../features/actions/UnitSlice';
import ingredientSlice from '../features/actions/IngredientSlice';
import productTypeSlice from '../features/actions/ProductTypeSlice';
import ProductSlice from '../features/actions/ProductSlice';
export const store = configureStore({
  reducer: {
    unit: unitSlice,
    ingredient: ingredientSlice,
    productType: productTypeSlice,
    product: ProductSlice,
  },
});
