import { createSlice } from "@reduxjs/toolkit";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type HomeState = {
  activeStartDate: ValuePiece;
  appointmentDate: Value;
  appointmentSlot: string | null;
};

const initialState: HomeState = {
  activeStartDate: new Date(),
  appointmentDate: new Date(),
  appointmentSlot: "",
};

export const homeSlice = createSlice({
  name: "HOME_MODULE",
  initialState,
  reducers: {
    setActiveStartDate: (
      state: HomeState,
      { payload: { activeStartDate } }
    ) => {
      state.activeStartDate = activeStartDate;
    },
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

export const { setActiveStartDate, setAppointmentDate, setAppointmentSlot } =
  homeSlice.actions;
