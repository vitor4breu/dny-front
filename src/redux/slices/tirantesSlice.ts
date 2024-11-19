import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tirantesService from '../../services/tirantesService';

interface Tirante {
  id: number;
  name: string;
  status: string;
}

interface TirantesState {
  items: Tirante[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TirantesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTirantes = createAsyncThunk('tirantes/fetchTirantes', async () => {
  const response = await tirantesService.getItems();
  return response.data;
});

const tirantesSlice = createSlice({
  name: 'tirantes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTirantes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTirantes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTirantes.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default tirantesSlice.reducer;
