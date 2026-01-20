
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, TrendingUp, Phone, MapPin, 
  Mail, Clock, Search, ChevronRight, Lock, Box, ShoppingBag,
  AlertCircle, DollarSign, ArrowUpRight, Filter, Download
} from 'lucide-react';
import { Order, Product } from '../types';
import { RetailProDB } from '../services/database';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

type Tab = 'dashboard' | 'inventory' | 'orders' | 'customers';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('nashwa_role');
    if (role !== 'admin') {
      navigate('/login');
    } else {
      setIsAuthorized(true);
      refreshData();
    }
  }, [navigate]);

  const refreshData = () => {
    setOrders(RetailProDB.getOrders());
    setProducts(RetailProDB.getProducts());
  };

  if (!isAuthorized) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#065F46] border-t-transparent"></div>
    </div>
  );

  const stats = RetailProDB.getAnalytics();

  const chartData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const handleStatusUpdate = (orderId: string, status: Order['status']) => {
    RetailProDB.updateOrderStatus(orderId, status);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#021410] text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-[#021410] font-black">R</div>
            <span className="font-black tracking-tighter text-xl italic">RetailPro</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Management System</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#065F46] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-sm font-bold">Insights</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-[#065F46] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Box size={20} />
            <span className="text-sm font-bold">Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-[#065F46] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <ShoppingBag size={20} />
            <span className="text-sm font-bold">Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'customers' ? 'bg-[#065F46] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Users size={20} />
            <span className="text-sm font-bold">Customers</span>
          </button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-[#021410] font-black">A</div>
            <div>
              <p className="text-xs font-black">Admin User</p>
              <p className="text-[10px] text-gray-500">Superuser Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 brand-font uppercase tracking-widest flex items-center gap-3">
              {activeTab === 'dashboard' && 'Business Intelligence'}
              {activeTab === 'inventory' && 'Stock Management'}
              {activeTab === 'orders' && 'Order Fulfilment'}
              {activeTab === 'customers' && 'Client Database'}
            </h1>
            <p className="text-gray-400 text-sm font-medium">Nashwa Premium Fashion &bull; RetailPro v2.1</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-grow md:flex-grow-0 relative">
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none font-bold text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="p-2.5 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
              <Download size={20} className="text-gray-400" />
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-50 text-[#065F46] rounded-2xl"><DollarSign size={24} /></div>
                  <span className="text-[10px] font-black text-green-500 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                    <ArrowUpRight size={12} /> +12%
                  </span>
                </div>
                <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">Gross Revenue</h3>
                <p className="text-3xl font-black text-gray-900 mt-1">৳ {stats.revenue.toLocaleString()}</p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ShoppingBag size={24} /></div>
                  <span className="text-[10px] font-black text-blue-500 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                    <ArrowUpRight size={12} /> +5%
                  </span>
                </div>
                <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">Total Orders</h3>
                <p className="text-3xl font-black text-gray-900 mt-1">{stats.orderCount}</p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Users size={24} /></div>
                  <span className="text-[10px] font-black text-amber-500 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    Active
                  </span>
                </div>
                <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">Customer Base</h3>
                <p className="text-3xl font-black text-gray-900 mt-1">{stats.customerCount}</p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><AlertCircle size={24} /></div>
                  {stats.stockAlerts > 0 && (
                    <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">Stock Alerts</h3>
                <p className="text-3xl font-black text-gray-900 mt-1">{stats.stockAlerts}</p>
              </div>
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-black brand-font uppercase">Sales Performance</h3>
                  <div className="flex gap-2">
                    <button className="text-[10px] font-black px-3 py-1 bg-gray-100 rounded-lg">7 Days</button>
                    <button className="text-[10px] font-black px-3 py-1 text-gray-400">30 Days</button>
                  </div>
                </div>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#065F46" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#065F46" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                      <YAxis axisLine={false} tickLine={false} fontSize={10} />
                      <Tooltip 
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                      />
                      <Area type="monotone" dataKey="sales" stroke="#065F46" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
                 <h3 className="text-lg font-black brand-font uppercase mb-8">Recent Activity</h3>
                 <div className="space-y-6 flex-grow">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex gap-4 group">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#065F46] group-hover:text-white transition-colors">
                          <ShoppingBag size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-gray-900 truncate">৳ {order.total.toLocaleString()} by {order.customer.fullName}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{new Date(order.date).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setActiveTab('orders')} className="w-full py-4 mt-8 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#065F46] hover:bg-gray-100 transition-colors">
                   View All Transactions
                 </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-lg font-black brand-font uppercase">SKU Inventory List</h3>
               <button className="bg-[#065F46] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-900/10">Add New Product</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Level</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="w-10 h-12 object-cover rounded-lg border border-gray-100" />
                          <span className="text-sm font-black text-gray-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs font-mono text-gray-400">{p.sku || 'N/A'}</td>
                      <td className="px-8 py-6 text-xs font-bold text-gray-500">{p.category}</td>
                      <td className="px-8 py-6 text-sm font-black text-[#065F46]">৳ {p.price.toLocaleString()}</td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                           <div className={`h-2 w-16 bg-gray-100 rounded-full overflow-hidden`}>
                             <div 
                               className={`h-full rounded-full ${p.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} 
                               style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}
                             />
                           </div>
                           <span className="text-xs font-black">{p.stock}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${p.stock > 10 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-transparent hover:border-[#065F46] transition-all group overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-6 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-100 text-gray-700 text-[10px] font-black uppercase px-3 py-1 rounded-lg border">{order.id}</span>
                      <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                        <Clock size={14} /> {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#065F46] font-black text-xl border border-green-100">
                        {order.customer.fullName.charAt(0)}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-xl text-gray-900">{order.customer.fullName}</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <a href={`tel:${order.customer.phone}`} className="flex items-center gap-2 font-bold text-[#065F46] hover:underline">
                            <Phone size={14} /> {order.customer.phone}
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-2">
                          <MapPin size={16} className="shrink-0 mt-0.5 text-amber-600" />
                          <span className="font-medium">{order.customer.address}, {order.customer.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-6 text-right md:min-w-[180px]">
                    <div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Total</div>
                      <div className="text-3xl font-black text-[#065F46] brand-font">৳ {order.total.toLocaleString()}</div>
                    </div>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value as any)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border-0 focus:ring-2 focus:ring-[#065F46] ${
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'customers' && (
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-100">
                <h3 className="text-lg font-black brand-font uppercase">Customer Relationship Management</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-gray-50">
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Transaction</th>
                     <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Lifetime Value</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {Array.from(new Set(orders.map(o => o.customer.phone))).map(phone => {
                      const customerOrders = orders.filter(o => o.customer.phone === phone);
                      const latest = customerOrders[0];
                      const ltv = customerOrders.reduce((sum, o) => sum + o.total, 0);
                      return (
                        <tr key={phone} className="hover:bg-gray-50 transition-colors">
                           <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-green-50 text-[#065F46] flex items-center justify-center font-black text-xs">
                                 {latest.customer.fullName.charAt(0)}
                               </div>
                               <span className="text-sm font-black text-gray-900">{latest.customer.fullName}</span>
                             </div>
                           </td>
                           <td className="px-8 py-6 text-xs font-bold text-gray-500">{phone}</td>
                           <td className="px-8 py-6 text-xs font-medium text-gray-400">{latest.customer.city}</td>
                           <td className="px-8 py-6 text-xs font-bold text-gray-500">{new Date(latest.date).toLocaleDateString()}</td>
                           <td className="px-8 py-6 text-sm font-black text-[#065F46]">৳ {ltv.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                 </tbody>
               </table>
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
