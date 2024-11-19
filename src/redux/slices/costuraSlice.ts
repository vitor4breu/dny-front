import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import costuraService from '../../services/costuraService';

interface CosturaItem {
  id: number;
  name: string;
  status: string;
}

interface CosturaState {
  items: CosturaItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CosturaState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCosturaItems = createAsyncThunk('costura/fetchCosturaItems', async () => {
  const response = await costuraService.getItems();
  return response.data;
});

const costuraSlice = createSlice({
  name: 'costura',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCosturaItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCosturaItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCosturaItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default costuraSlice.reducer;
