import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import { setCredentials } from "../../redux/feature/auth/authSlice";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // URL থেকে রোল বের করা (যেমন: ?role=clinic)
  const queryParams = new URLSearchParams(location.search);
  const role = (queryParams.get("role") as "patient" | "clinic") || "patient";
  const currentQuery = location.search;

  const handleRegister = () => {
    // স্ট্যাটিক রেজিস্ট্রেশন সিমুলেশন (পরে এখানে API কল হবে)
    const mockUser = {
      name: "New User",
      email: "user@example.com",
    };
    const mockToken = "new-registration-token-987654";

    // রেডুক্স স্টেট আপডেট
    dispatch(
      setCredentials({
        user: mockUser,
        token: mockToken,
        role: role,
      }),
    );

    // রেজিস্ট্রেশন শেষে রোল অনুযায়ী ড্যাশবোর্ডে পাঠানো
    if (role === "clinic") {
      navigate("/clinic-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1e3a8a] px-4 py-10">
      {/* Logo & Title Section */}
      <div className="flex flex-col items-center mb-8 text-white text-center">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-5xl font-serif italic font-light">MyDr</h1>
          <div className="border-2 border-white rounded-full p-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-10 h-10"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-light tracking-[0.2em] uppercase mt-2">
          Registration
        </h2>
        <p className="mt-2 text-sm opacity-80 uppercase tracking-widest">
          As a {role}
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-[480px] space-y-4">
        {/* E-mail address Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full text-gray-500 bg-white">
            <User size={18} />
          </div>
          <input
            type="email"
            placeholder="E-mail address"
            className="w-full py-4 pl-16 pr-12 rounded-full border-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 text-lg shadow-inner"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <Mail size={16} className="text-teal-600 opacity-70" />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full text-gray-500 bg-white">
            <Lock size={18} />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full py-4 pl-16 pr-4 rounded-full border-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 text-lg shadow-inner"
          />
        </div>

        {/* Password Confirmation Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full text-gray-500 bg-white">
            <Lock size={18} />
          </div>
          <input
            type="password"
            placeholder="Password confirmation"
            className="w-full py-4 pl-16 pr-4 rounded-full border-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 text-lg shadow-inner"
          />
        </div>

        {/* Terms & Privacy Section */}
        <div className="px-2 space-y-3 pt-2">
          <div className="flex items-start gap-3 text-white">
            <input
              type="checkbox"
              className="mt-1.5 w-5 h-5 rounded cursor-pointer accent-pink-500"
              id="terms"
            />
            <label
              htmlFor="terms"
              className="text-[15px] leading-tight cursor-pointer"
            >
              I accept the terms of the{" "}
              <a href="#" className="underline">
                regulations
              </a>
            </label>
          </div>
          <p className="text-white text-[14px] leading-tight opacity-90">
            MyDr processes personal data in accordance with{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 space-y-4">
          <button
            onClick={handleRegister}
            className="w-full py-4 bg-[#ec4899] hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 uppercase tracking-widest text-lg"
          >
            Register
          </button>

          <NavLink
            to={`/login${currentQuery}`}
            className="w-full py-4 bg-white hover:bg-gray-100 text-gray-600 font-bold rounded-full shadow-lg transition-all active:scale-95 uppercase tracking-widest text-lg text-center block"
          >
            Go back to login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
