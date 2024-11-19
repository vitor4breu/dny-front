import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import finalizacaoService from '../../services/finalizacaoService';

interface FinalizacaoItem {
  id: number;
  name: string;
  status: string;
}

interface FinalizacaoState {
  items: FinalizacaoItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FinalizacaoState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFinalizacaoItems = createAsyncThunk('finalizacao/fetchFinalizacaoItems', async () => {
  const response = await finalizacaoService.getItems();
  return response.data;
});

const finalizacaoSlice = createSlice({
  name: 'finalizacao',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinalizacaoItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFinalizacaoItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFinalizacaoItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default finalizacaoSlice.reducer;
