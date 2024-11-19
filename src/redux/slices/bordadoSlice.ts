import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bordadoService from '../../services/bordadoService';

interface BordadoItem {
  id: number;
  name: string;
  status: string;
}

interface BordadoState {
  items: BordadoItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BordadoState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchBordadoItems = createAsyncThunk('bordado/fetchBordadoItems', async () => {
  const response = await bordadoService.getItems();
  return response.data;
});

const bordadoSlice = createSlice({
  name: 'bordado',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBordadoItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBordadoItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBordadoItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default bordadoSlice.reducer;
