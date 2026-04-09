import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  User as UserIcon,
  Calendar as CalendarIcon,
  X,
  Clock,
} from "lucide-react";
import { addBooking } from "../../redux/feature/booking/bookingSlice";

const DOCTORS_DATA = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Alergolog",
    city: "Abisynia Górska",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Dr. James Smith",
    specialty: "Cardiologist",
    city: "Dhaka",
    rating: 4.7,
  },
];

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visitType, setVisitType] = useState(
    searchParams.get("visitType") || "stationary",
  );
  const [visitKind, setVisitKind] = useState("private");
  const [selectedSpecialist, setSelectedSpecialist] = useState("Alergolog");
  const [selectedCity, setSelectedCity] = useState(
    "Abisynia Górska (Pomorskie)",
  );
  const [selectedDate, setSelectedDate] = useState("2026-04-10");
  const [isSearched, setIsSearched] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const handleSearch = () => setIsSearched(true);

  const confirmBooking = (time: string) => {
    const bookingDetails = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      city: selectedCity,
      date: selectedDate,
      time: time,
      visitType: visitType,
      visitKind: visitKind,
      status: "Confirmed",
    };

    // Redux store এ ডেটা সেভ করা হচ্ছে
    dispatch(addBooking(bookingDetails));

    navigate("/patient");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-semibold text-blue-600 tracking-tight">
          Make new visit
        </h1>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
              Visit Type
            </p>
            <div className="bg-gray-200 p-1 rounded-full flex text-xs font-bold">
              <button
                onClick={() => setVisitType("stationary")}
                className={`px-4 py-1.5 rounded-full transition-all ${visitType === "stationary" ? "bg-blue-600 text-white shadow-md" : "text-gray-500"}`}
              >
                Stationary
              </button>
              <button
                onClick={() => setVisitType("evisit")}
                className={`px-4 py-1.5 rounded-full transition-all ${visitType === "evisit" ? "bg-blue-600 text-white shadow-md" : "text-gray-500"}`}
              >
                e-Visit
              </button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
              Visit Kind
            </p>
            <div className="bg-gray-200 p-1 rounded-full flex text-xs font-bold">
              <button
                onClick={() => setVisitKind("private")}
                className={`px-4 py-1.5 rounded-full transition-all ${visitKind === "private" ? "bg-blue-600 text-white shadow-md" : "text-gray-500"}`}
              >
                Private
              </button>
              <button
                onClick={() => setVisitKind("nfz")}
                className={`px-4 py-1.5 rounded-full transition-all ${visitKind === "nfz" ? "bg-blue-600 text-white shadow-md" : "text-gray-500"}`}
              >
                NFZ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-blue-500 rounded-3xl p-8 shadow-2xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-white text-xs font-bold flex items-center gap-2 ml-1">
              <UserIcon size={14} /> Specialist
            </label>
            <select
              value={selectedSpecialist}
              onChange={(e) => setSelectedSpecialist(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white text-gray-700 outline-none border-none focus:ring-4 focus:ring-pink-300/30 transition-all"
            >
              <option>Alergolog</option>
              <option>Cardiologist</option>
              <option>Dentist</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-white text-xs font-bold flex items-center gap-2 ml-1">
              <MapPin size={14} /> City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white text-gray-700 outline-none border-none focus:ring-4 focus:ring-pink-300/30"
            >
              <option>Abisynia Górska (Pomorskie)</option>
              <option>Dhaka, Bangladesh</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-white text-xs font-bold flex items-center gap-2 ml-1">
              <CalendarIcon size={14} /> Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white text-gray-700 outline-none border-none focus:ring-4 focus:ring-pink-300/30"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Search
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {!isSearched ? (
          <div className="py-20 text-center bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-lg">
              Select filters and search for doctors
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {DOCTORS_DATA.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-center border border-transparent hover:border-blue-400 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <UserIcon size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {doc.name}
                    </h3>
                    <p className="text-gray-500 font-medium">
                      {doc.specialty} • {doc.city}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1 font-bold">
                      <span>★</span>
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="mt-4 md:mt-0 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold uppercase shadow-lg hover:bg-blue-700 transition-all"
                >
                  Book Visit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>
            <h2 className="text-3xl font-black text-gray-800 mb-8">
              Confirm Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border rounded-3xl p-6 bg-gray-50/50">
                <p className="text-blue-600 font-black text-center mb-4">
                  April 2026
                </p>
                <div className="grid grid-cols-7 gap-2 text-[10px] font-bold text-gray-300 text-center mb-4 uppercase">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`p-2.5 text-xs text-center rounded-xl ${i === 9 ? "bg-blue-600 text-white font-bold shadow-lg" : "text-gray-500"}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-400 text-[10px] font-black uppercase mb-3 block">
                    Available Slots
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["09:00", "10:30", "13:00", "15:45"].map((time) => (
                      <button
                        key={time}
                        onClick={() => confirmBooking(time)}
                        className="py-4 border-2 border-blue-50 text-blue-600 font-black rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-90 shadow-sm"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    You are booking a <b>{visitType}</b> {visitKind} appointment
                    with <b>{selectedDoctor.name}</b>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
