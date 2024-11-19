import { createSlice } from '@reduxjs/toolkit';

interface LayoutState {
  isSidebarCompressed: boolean;
  sidebarWidth: null | number;
  // Outros estados de layout podem ser adicionados aqui
}

const initialState: LayoutState = {
  isSidebarCompressed: false,
  sidebarWidth: null
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarCompressed = !state.isSidebarCompressed;
    },
    setWidth(state, {payload}) {
      console.log("SLICE ATIVO: " + payload);
      state.sidebarWidth = payload;
    }

    // Outros reducers de layout podem ser adicionados aqui
  },
});

export const { toggleSidebar, setWidth } = layoutSlice.actions;
export default layoutSlice.reducer;