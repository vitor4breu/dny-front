import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serigrafiaService from '../../services/serigrafiaService';

interface SerigrafiaItem {
  id: number;
  name: string;
  status: string;
}

interface SerigrafiaState {
  items: SerigrafiaItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SerigrafiaState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSerigrafiaItems = createAsyncThunk('serigrafia/fetchSerigrafiaItems', async () => {
  const response = await serigrafiaService.getItems();
  return response.data;
});

const serigrafiaSlice = createSlice({
  name: 'serigrafia',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSerigrafiaItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSerigrafiaItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSerigrafiaItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default serigrafiaSlice.reducer;
