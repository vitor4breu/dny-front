import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import additionalService from '../../services/additionalService';

interface AdditionalItem {
  id: number;
  name: string;
  description: string;
}

interface AdditionalState {
  items: AdditionalItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdditionalState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchAdditionalItems = createAsyncThunk('additional/fetchAdditionalItems', async () => {
  const response = await additionalService.getItems();
  return response.data;
});

const additionalSlice = createSlice({
  name: 'additional',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdditionalItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdditionalItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAdditionalItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default additionalSlice.reducer;
