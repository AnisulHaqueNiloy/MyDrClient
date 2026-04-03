import { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'HOW IT WORKS', href: '/how-it-works' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'MOBILE APP', href: '/mobile-app' },
    { name: 'CLINIC ZONE', href: '/clinic-zone' },
  ];

  // Login হ্যান্ডলার ফাংশন
  const handleLoginRedirect = (userType: 'patient' | 'clinic') => {
    setIsSignInOpen(false);
    setMobileMenuOpen(false);
    navigate(`/login?role=${userType}`);
  };

  return (
    <nav className="bg-[#3B82F6] px-4 py-3 md:px-10 relative z-50">
      <div className="flex items-center justify-between">
        
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
             </svg>
          </div>
          <span className="text-white font-bold text-xl italic tracking-tight uppercase">MyDr</span>
        </NavLink>

        {/* Desktop Menu using NavLink */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => 
                `text-white text-xs font-bold transition-colors hover:text-blue-100 ${
                  isActive ? 'border-b-2 border-white pb-1' : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side: Sign In Dropdown */}
        <div className="hidden lg:flex items-center gap-4 relative">
          <div className="relative">
            <button 
              onMouseEnter={() => setIsSignInOpen(true)}
              onClick={() => setIsSignInOpen(!isSignInOpen)}
              className="bg-white text-[#3B82F6] px-8 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-all shadow-md flex items-center gap-2"
            >
              SIGN IN
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${isSignInOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isSignInOpen && (
              <div 
                onMouseLeave={() => setIsSignInOpen(false)}
                className="absolute top-10 left-0 w-full bg-white rounded-xl shadow-2xl py-2 text-[#3B82F6] overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200 mt-2"
              >
                <button 
                  onClick={() => handleLoginRedirect('patient')}
                  className="w-full text-left px-6 py-2.5 hover:bg-blue-50 font-bold text-xs transition-colors"
                >
                  PATIENT
                </button>
                <button 
                  onClick={() => handleLoginRedirect('clinic')}
                  className="w-full text-left px-6 py-2.5 hover:bg-blue-50 font-bold text-xs transition-colors border-t border-gray-50"
                >
                  CLINIC
                </button>
              </div>
            )}
          </div>
          
          <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-white shadow-sm">
             <img src="https://flagcdn.com/gb.svg" alt="UK" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu using NavLink */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block font-bold text-sm py-2 ${isActive ? 'text-blue-200' : 'text-white'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-blue-400 flex flex-col gap-3">
            <button onClick={() => handleLoginRedirect('patient')} className="bg-white text-[#3B82F6] w-full py-3 rounded-full font-bold text-xs">
              SIGN IN AS PATIENT
            </button>
            <button onClick={() => handleLoginRedirect('clinic')} className="bg-blue-600 text-white border border-white w-full py-3 rounded-full font-bold text-xs">
              SIGN IN AS CLINIC
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;