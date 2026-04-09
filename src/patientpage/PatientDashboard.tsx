import React, { useState } from "react";
import {
  Plus,
  UserCircle,
  Monitor,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const PatientDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Redux store থেকে বুকিং ডেটা গেট করা হচ্ছে
  const bookings = useSelector((state: RootState) => state.booking.bookings);

  const handleVisitSelect = (type: string) => {
    navigate(`/booking?visitType=${type}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl text-gray-400 font-light">My visits</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-8 py-2.5 rounded-full flex items-center gap-2 font-bold shadow-lg hover:shadow-pink-200/50 transition-all uppercase text-sm tracking-wider active:scale-95"
        >
          New Visit <Plus size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto">
        {bookings.length === 0 ? (
          <div className="text-center mt-32">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Calendar className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-400 text-lg italic">
              There are no visits to display
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {booking.visitType === "evisit" ? (
                      <Monitor size={24} />
                    ) : (
                      <UserCircle size={24} />
                    )}
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {booking.doctorName}
                </h3>
                <p className="text-blue-600 text-sm font-semibold mb-4">
                  {booking.specialty}
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Calendar size={16} className="text-pink-400" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Clock size={16} className="text-pink-400" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <MapPin size={16} className="text-pink-400" />
                    <span className="truncate">{booking.city}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <span className="text-[10px] font-bold py-1 px-3 bg-gray-100 rounded-lg text-gray-400 uppercase">
                    {booking.visitType}
                  </span>
                  <span className="text-[10px] font-bold py-1 px-3 bg-gray-100 rounded-lg text-gray-400 uppercase">
                    {booking.visitKind}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Visit Type Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <h3 className="text-center text-gray-500 mb-10 text-xl font-light">
              Select visit type
            </h3>

            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => handleVisitSelect("stationary")}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="p-8 bg-gray-50 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-blue-200 group-hover:-translate-y-1">
                  <UserCircle
                    size={56}
                    className="text-blue-500 group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-gray-600 font-bold group-hover:text-blue-600 transition-colors">
                  Stationary
                </span>
              </button>

              <div className="w-[1px] h-32 bg-gray-100 border-dashed border-l"></div>

              <button
                onClick={() => handleVisitSelect("evisit")}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="p-8 bg-gray-50 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-blue-200 group-hover:-translate-y-1">
                  <Monitor
                    size={56}
                    className="text-blue-500 group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-gray-600 font-bold group-hover:text-blue-600 transition-colors">
                  e-Visit
                </span>
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <Plus size={24} className="rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
