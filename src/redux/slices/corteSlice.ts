import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import corteService from '../../services/corteService';

interface CorteItem {
  id: number;
  name: string;
  status: string;
}

interface CorteState {
  items: CorteItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CorteState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCorteItems = createAsyncThunk('corte/fetchCorteItems', async () => {
  const response = await corteService.getItems();
  return response.data;
});

const corteSlice = createSlice({
  name: 'corte',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorteItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCorteItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCorteItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default corteSlice.reducer;
