import { createSlice } from "@reduxjs/toolkit";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type HomeState = {
  appointmentDate: Value;
  appointmentSlot: string | null;
};

const initialState: HomeState = {
  appointmentDate: new Date(),
  appointmentSlot: "",
};

export const homeSlice = createSlice({
  name: "AUTH_MODULE",
  initialState,
  reducers: {
    setAppointmentDate: (
      state: HomeState,
      { payload: { appointmentDate } }
    ) => {
      state.appointmentDate = appointmentDate;
    },
    setAppointmentSlot: (
      state: HomeState,
      { payload: { appointmentSlot } }
    ) => {
      state.appointmentSlot = appointmentSlot;
    },
  },
});

export default homeSlice.reducer;

export const { setAppointmentDate, setAppointmentSlot } = homeSlice.actions;
