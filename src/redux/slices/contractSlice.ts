import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContratoModel } from '../../models/contrato/Contrato';
import ObterContratosQueryHandler from '../../models/contrato/queries/ObterContratosQueryHandler';


interface ContractState {
  contracts: ContratoModel[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContractState = {
  contracts: [],
  status: 'idle',
  error: null,
};

export const fetchContracts = createAsyncThunk('contratos/buscarContratos', async (filters? : any | null) => {
  console.log(filters);
  const response = await ObterContratosQueryHandler.handle(filters);
  return response;
});

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contracts = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.status = 'failed';
        if(action?.error?.message)
          state.error = action.error.message;
      });
  },
});

export default contractSlice.reducer;
