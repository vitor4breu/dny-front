import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import revisaoService from '../../services/revisaoService';

interface RevisaoItem {
  id: number;
  name: string;
  status: string;
}

interface RevisaoState {
  items: RevisaoItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RevisaoState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchRevisaoItems = createAsyncThunk('revisao/fetchRevisaoItems', async () => {
  const response = await revisaoService.getItems();
  return response.data;
});

const revisaoSlice = createSlice({
  name: 'revisao',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevisaoItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRevisaoItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRevisaoItems.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default revisaoSlice.reducer;
