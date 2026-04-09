import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import { setCredentials } from "../../redux/feature/auth/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // URL থেকে রোল বের করা (যেমন: ?role=clinic)
  const queryParams = new URLSearchParams(location.search);
  const role = (queryParams.get("role") as "patient" | "clinic") || "patient";
  const currentQuery = location.search;

  const handleLogin = () => {
    // স্ট্যাটিক লগইন সিমুলেশন (পরে এখানে API কল হবে)
    const mockUser = {
      name: "Anisul Haque Niloy",
      email: "niloy2931@gmail.com",
    };
    const mockToken = "static-token-123456789";

    // রেডুক্স স্টেট আপডেট
    dispatch(
      setCredentials({
        user: mockUser,
        token: mockToken,
        role: role,
      }),
    );

    // রোল অনুযায়ী ড্যাশবোর্ডে নেভিগেট করা
    if (role === "clinic") {
      navigate("/clinic-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1e3a8a] px-4">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-10 text-white">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-24 h-24 mb-2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <path d="M12 5v4m-3 7h6" strokeOpacity="0.5" />
          </svg>
          <span className="absolute top-16 -right-2 text-xs font-bold">®</span>
        </div>
        <h1 className="text-6xl font-serif italic font-light tracking-tight">
          MyDr
        </h1>
        <p className="mt-2 uppercase tracking-[0.3em] text-sm opacity-80">
          Login as {role}
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-[450px] space-y-4">
        {/* Login or E-mail Input */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full text-gray-500 bg-white shadow-sm">
            <User size={18} />
          </div>
          <input
            type="text"
            placeholder="Login or e-mail"
            className="w-full py-4 pl-16 pr-12 rounded-full border-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 text-lg shadow-inner placeholder-gray-400"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <Mail size={18} className="text-teal-600" />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full text-gray-500 bg-white shadow-sm">
            <Lock size={18} />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full py-4 pl-16 pr-4 rounded-full border-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 text-lg shadow-inner placeholder-gray-400"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right text-sm pr-4">
          <span className="text-white opacity-90">Forgot password? </span>
          <NavLink
            to={`/recover-password${currentQuery}`}
            className="text-white underline font-medium hover:opacity-80"
          >
            Recover password
          </NavLink>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 space-y-3 flex flex-col items-center">
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 uppercase tracking-wide text-lg"
          >
            Log In
          </button>

          <NavLink
            to={`/register${currentQuery}`}
            className="w-full py-4 bg-[#ec4899] hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 uppercase tracking-wide text-center text-lg"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
