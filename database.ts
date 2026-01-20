
import { Product, Order, CustomerDetails } from '../types';
import { MOCK_PRODUCTS } from '../constants';

const DB_KEYS = {
  PRODUCTS: 'retailpro_products',
  ORDERS: 'retailpro_orders',
  CUSTOMERS: 'retailpro_customers'
};

// Initialize DB with mock data if empty
const initDB = () => {
  if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
    const productsWithStock = MOCK_PRODUCTS.map(p => ({
      ...p,
      stock: Math.floor(Math.random() * 50) + 5,
      sku: `NSW-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    }));
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(productsWithStock));
  }
};

initDB();

export const RetailProDB = {
  // Products
  getProducts: (): Product[] => {
    return JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || '[]');
  },
  
  updateProductStock: (productId: string, quantity: number) => {
    const products = RetailProDB.getProducts();
    const updated = products.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantity) } : p
    );
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updated));
  },

  // Orders
  getOrders: (): Order[] => {
    return JSON.parse(localStorage.getItem(DB_KEYS.ORDERS) || '[]');
  },

  createOrder: (order: Order) => {
    const orders = RetailProDB.getOrders();
    const newOrders = [order, ...orders];
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(newOrders));
    
    // Update inventory for each item
    order.items.forEach(item => {
      RetailProDB.updateProductStock(item.id, item.quantity);
    });
    
    return order;
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const orders = RetailProDB.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(updated));
  },

  // Analytics
  getAnalytics: () => {
    const orders = RetailProDB.getOrders();
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const customers = new Set(orders.map(o => o.customer.phone)).size;
    
    return {
      revenue,
      orderCount: orders.length,
      customerCount: customers,
      stockAlerts: RetailProDB.getProducts().filter(p => p.stock < 10).length
    };
  }
};
