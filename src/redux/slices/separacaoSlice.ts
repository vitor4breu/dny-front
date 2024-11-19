import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import separacaoService from '../../services/separacaoService';

interface SeparacaoItem {
  id: number;
  name: string;
  status: string;
}

interface SeparacaoState {
  items: SeparacaoItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SeparacaoState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSeparacaoItems = createAsyncThunk('separacao/fetchSeparacaoItems', async () => {
  const response = await separacaoService.getItems();
  return response.data;
});

const separacaoSlice = createSlice({
  name: 'separacao',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeparacaoItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeparacaoItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSeparacaoItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default separacaoSlice.reducer;
