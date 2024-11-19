import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productionService from '../../services/productionService';

interface ProductionItem {
  id: number;
  name: string;
  status: string;
}

interface ProductionState {
  items: ProductionItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductionState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProductionItems = createAsyncThunk('production/fetchProductionItems', async () => {
  const response = await productionService.getItems();
  return response.data;
});

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductionItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductionItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default productionSlice.reducer;
