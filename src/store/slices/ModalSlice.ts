import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  currentModalId: string | null; // Store the ID of the currently open modal
  editId: number | null;
}

const initialState: ModalState = {
  currentModalId: null,
  editId: null,
};

const modalControllerSlice = createSlice({
  name: "modalController",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.currentModalId = action.payload.modalId;
      state.editId = action.payload.editId;
    },
    closeModal: (state) => {
      state.currentModalId = null;
      state.editId = null;
    },
  },
});

export const { openModal, closeModal } = modalControllerSlice.actions;

export const openModalAction = (modalId: string, editId?: number) => ({
  type: openModal.type,
  payload: { modalId, editId },
});

export const closeModalAction = () => ({
  type: closeModal.type,
});

export default modalControllerSlice.reducer;
