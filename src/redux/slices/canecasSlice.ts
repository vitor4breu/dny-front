import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import canecasService from '../../services/canecaService';

interface Caneca {
  id: number;
  name: string;
  status: string;
}

interface CanecasState {
  items: Caneca[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CanecasState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCanecas = createAsyncThunk('canecas/fetchCanecas', async () => {
  const response = await canecasService.getItems();
  return response.data;
});

const canecasSlice = createSlice({
  name: 'canecas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCanecas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCanecas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCanecas.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default canecasSlice.reducer;
