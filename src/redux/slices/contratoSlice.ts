import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ContratoModel } from "models/contrato/Contrato";
import ContratosService, { ObterContratosQuery } from 'services/contratoService';

interface ContratoState {
  contratos: ContratoModel[];
  totalContratos: number;
  loading: boolean;
  error: string | null;
}

const initialState: ContratoState = {
  contratos: [],
  totalContratos: 0,
  loading: false,
  error: null
};


export const buscarContratos = createAsyncThunk(
  'contratos',
  async (query: ObterContratosQuery) => {
    const response = await ContratosService.ObterContratos(query);
    return response;
  }
);

const contratoSlice = createSlice({
  name: 'contrato',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buscarContratos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buscarContratos.fulfilled, (state, action) => {
        state.loading = false;
        state.contratos = action.payload.data;
        state.totalContratos = action.payload.total;
      })
      .addCase(buscarContratos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar contratos';
      })
  }
});

export default contratoSlice.reducer;