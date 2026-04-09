import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../redux/feature/booking/bookingSlice"; // আপনার ফাইল পাথ অনুযায়ী ইমপোর্ট করুন
import authReducer from "../redux/feature/auth/authSlice"; // আপনার ফাইল পাথ অনুযায়ী ইমপোর্ট করুন
export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
  },
});

// স্টোর থেকে RootState এবং AppDispatch টাইপ ইনফার করা হচ্ছে
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
