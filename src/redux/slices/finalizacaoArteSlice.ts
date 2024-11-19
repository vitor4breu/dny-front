import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import finalizacaoArteService from '../../services/finalizacaoArteService';

interface FinalizacaoArteItem {
  id: number;
  name: string;
  status: string;
}

interface FinalizacaoArteState {
  items: FinalizacaoArteItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FinalizacaoArteState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFinalizacaoArteItems = createAsyncThunk('finalizacaoArte/fetchFinalizacaoArteItems', async () => {
  const response = await finalizacaoArteService.getItems();
  return response.data;
});

const finalizacaoArteSlice = createSlice({
  name: 'finalizacaoArte',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinalizacaoArteItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFinalizacaoArteItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFinalizacaoArteItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default finalizacaoArteSlice.reducer;
