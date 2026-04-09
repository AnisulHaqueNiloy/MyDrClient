import { createBrowserRouter } from "react-router-dom";
import ParenLayout from "../layout/ParenLayout";
import HomePage from "../PublicPage/Home/HomePage";
import LoginPage from "../PublicPage/auth/LoginPage";
import RegisterPage from "../PublicPage/auth/RegisterPage";
import PatientLayout from "../layout/PatientLayout";
import PatientDashboard from "../patientpage/PatientDashboard";
import BookingPage from "../PublicPage/booking/BookingPage";
import ProfilePage from "../PublicPage/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParenLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },

      // Clinic Routes
      //   { path: "clinic-dashboard", element: <ClinicDashboard /> },
    ],
  },

  {
    path: "patient",
    element: <PatientLayout />,
    children: [
      { index: true, element: <PatientDashboard /> }, // এটি /patient
      { path: "profile", element: <ProfilePage /> }, // এটি /patient/profile (স্ল্যাশ সরানো হয়েছে)
    ],
  },
]);
