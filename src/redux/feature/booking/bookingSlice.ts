import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: number;
  doctorName: string;
  specialty: string;
  city: string;
  date: string;
  time: string;
  visitType: string;
  visitKind: string;
  status: string;
}

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
