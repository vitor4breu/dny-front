import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import contractReducer from './slices/contratoSlice';
import productionReducer from './slices/productionSlice';
import additionalReducer from './slices/additionalSlice';
import canecasReducer from './slices/canecasSlice';
import tirantesReducer from './slices/tirantesSlice';
import corteReducer from './slices/corteSlice';
import finalizacaoArteReducer from './slices/finalizacaoArteSlice';
import bordadoReducer from './slices/bordadoSlice';
import separacaoReducer from './slices/separacaoSlice';
import serigrafiaReducer from './slices/serigrafiaSlice';
import revisaoReducer from './slices/revisaoSlice';
import costuraReducer from './slices/costuraSlice';
import finalizacaoReducer from './slices/finalizacaoSlice';
import layoutReducer from './slices/layoutSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    contract: contractReducer,
    production: productionReducer,
    additional: additionalReducer,
    canecas: canecasReducer,
    tirantes: tirantesReducer,
    corte: corteReducer,
    finalizacaoArte: finalizacaoArteReducer,
    bordado: bordadoReducer,
    separacao: separacaoReducer,
    serigrafia: serigrafiaReducer,
    revisao: revisaoReducer,
    costura: costuraReducer,
    finalizacao: finalizacaoReducer,
    layout: layoutReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;