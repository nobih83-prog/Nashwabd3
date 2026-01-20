
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Facebook, Smartphone } from 'lucide-react';
import { CONTACT_INFO, LOGO_URL } from '../constants';

interface LoginProps {
  onLogin: (status: boolean, role?: string) => void;
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      setLoading(false);
      // If email is admin@nashwa.com, login as admin
      const role = formData.email.toLowerCase() === 'admin@nashwa.com' ? 'admin' : 'customer';
      onLogin(true, role);
      navigate(role === 'admin' ? '/admin' : '/');
    }, 1500);
  };

  const handleLogout = () => {
    onLogin(false, 'customer');
    localStorage.removeItem('nashwa_role');
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <img src={LOGO_URL} alt="Nashwa" className="h-24 w-24 mx-auto mb-8 rounded-full border-4 border-amber-400 p-1 bg-white shadow-2xl" />
        <h2 className="text-4xl font-bold mb-4 brand-font uppercase tracking-widest">{isAdmin ? 'Admin Portal' : 'Welcome back!'}</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          {isAdmin ? 'Manage Nashwa collections, customers and orders from this secure dashboard.' : 'Manage your luxury collection and orders seamlessly.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
           {isAdmin ? (
             <button onClick={() => navigate('/admin')} className="bg-[#065F46] text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg">Enter Dashboard</button>
           ) : (
             <button onClick={() => navigate('/')} className="bg-[#065F46] text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg">Start Shopping</button>
           )}
           <button onClick={handleLogout} className="bg-white text-red-500 border border-red-100 px-10 py-4 rounded-xl font-bold hover:bg-red-50 transition-all">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <img 
            src={LOGO_URL} 
            alt={CONTACT_INFO.name} 
            className="h-24 w-24 mx-auto mb-6 rounded-full border-4 border-amber-400 bg-white p-1 shadow-2xl" 
          />
          <h2 className="brand-font text-3xl font-bold text-gray-900 tracking-widest uppercase">Nashwa</h2>
          <p className="text-gray-400 mt-2 text-xs uppercase tracking-[0.3em] font-black">Elegance Defined</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="flex mb-10 bg-gray-50 p-1 rounded-2xl">
            <button 
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${!isRegistering ? 'bg-[#065F46] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isRegistering ? 'bg-[#065F46] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Join
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required={isRegistering}
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#065F46] outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email or Phone</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="admin@nashwa.com for admin access"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#065F46] outline-none transition-all font-medium"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#065F46] outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#065F46] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isRegistering ? 'Create Account' : 'Secure Login'} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
          
          {!isRegistering && (
             <p className="mt-8 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
               Administrator? Use admin project email
             </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
