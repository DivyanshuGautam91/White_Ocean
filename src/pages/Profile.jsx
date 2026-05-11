import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Edit2,
  Save,
  X,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Package,
  Truck,
  Star
} from 'lucide-react';
import Button from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  
  const { user, logout, updateProfile } = useAuthStore();
  
  // Initialize edit data when user changes
  React.useEffect(() => {
    if (user) {
      setEditData({
        ...user,
        preferences: user.preferences || {
          newsletter: true,
          smsNotifications: false,
          promotionalEmails: true
        }
      });
    }
  }, [user]);

  // Mock order data
  const recentOrders = [
    { id: '#ORD-001', date: '2024-05-10', total: 45.99, status: 'Delivered', items: 3 },
    { id: '#ORD-002', date: '2024-05-08', total: 89.00, status: 'Shipped', items: 5 },
    { id: '#ORD-003', date: '2024-05-05', total: 24.99, status: 'Processing', items: 2 }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        ...user,
        preferences: user.preferences || {
          newsletter: true,
          smsNotifications: false,
          promotionalEmails: true
        }
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    const result = await updateProfile(editData);
    
    if (result.success) {
      setIsEditing(false);
    } else {
      console.error('Failed to update profile:', result.error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePreferenceChange = (key, value) => {
    setEditData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'Shipped': return 'warning';
      case 'Processing': return 'info';
      default: return 'default';
    }
  };

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="profile-overview"
    >
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user?.profileImage || 'https://ui-avatars.com/api/?name=User&background=random'} alt="Profile" />
          <div className="avatar-badge">
            <Star size={16} />
          </div>
        </div>
        <div className="profile-info">
          <h2>{user?.firstName} {user?.lastName}</h2>
          <p className="profile-email">{user?.email}</p>
          <div className="profile-badges">
            <span className="badge membership">{user?.membershipLevel || 'Silver'} Member</span>
            <span className="badge member-since">Since {user?.memberSince || '2024'}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="edit-profile-btn"
        >
          <Edit2 size={16} /> Edit Profile
        </Button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <h3>24</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Heart size={24} />
          </div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Favorites</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <h3>3</h3>
            <p>Active Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <h3>4.8</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <div className="orders-list">
          {recentOrders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <h4>{order.id}</h4>
                <p>{order.date} • {order.items} items</p>
              </div>
              <div className="order-total">
                <span className="amount">${order.total.toFixed(2)}</span>
                <span className={`status ${getStatusColor(order.status)}`}>{order.status}</span>
              </div>
              <ChevronRight size={20} className="order-arrow" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="personal-info"
    >
      <div className="section-header">
        <h3>Personal Information</h3>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit2 size={16} /> Edit
          </Button>
        ) : (
          <div className="edit-actions">
            <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isLoading}>
              <X size={16} /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <div className="spinner-small"></div>
              ) : (
                <><Save size={16} /> Save</>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="info-grid">
        <div className="form-group">
          <label>First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.firstName || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
              className="form-input"
            />
          ) : (
            <span>{user?.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.lastName || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
              className="form-input"
            />
          ) : (
            <span>{user?.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              value={editData.email || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
              className="form-input"
            />
          ) : (
            <span>{user?.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={editData.phone || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
              className="form-input"
            />
          ) : (
            <span>{user?.phone}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label>Delivery Address</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.address || ''}
              onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
              className="form-input"
            />
          ) : (
            <span>{user?.address}</span>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderOrders = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="orders-section"
    >
      <h3>Order History</h3>
      <div className="orders-table">
        <div className="table-header">
          <span>Order ID</span>
          <span>Date</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {recentOrders.map(order => (
          <div key={order.id} className="table-row">
            <span className="order-id">{order.id}</span>
            <span>{order.date}</span>
            <span>{order.items} items</span>
            <span className="amount">${order.total.toFixed(2)}</span>
            <span className={`status ${getStatusColor(order.status)}`}>{order.status}</span>
            <Button variant="ghost" size="sm">View Details</Button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderPreferences = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="preferences-section"
    >
      <h3>Preferences</h3>
      
      <div className="preference-group">
        <h4>Notifications</h4>
        <div className="preference-item">
          <div className="preference-info">
            <Bell size={20} />
            <div>
              <h5>Email Notifications</h5>
              <p>Receive order updates and promotions via email</p>
            </div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={editData.preferences?.newsletter || false}
              onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <Phone size={20} />
            <div>
              <h5>SMS Notifications</h5>
              <p>Get text messages for order status updates</p>
            </div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={editData.preferences?.smsNotifications || false}
              onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <CreditCard size={20} />
            <div>
              <h5>Promotional Offers</h5>
              <p>Receive special deals and discount codes</p>
            </div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={editData.preferences?.promotionalEmails || false}
              onChange={(e) => handlePreferenceChange('promotionalEmails', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="preference-group">
        <h4>Security</h4>
        <div className="security-actions">
          <Button variant="outline" className="security-btn">
            <Lock size={16} /> Change Password
          </Button>
          <Button variant="outline" className="security-btn">
            <Shield size={16} /> Two-Factor Authentication
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar Navigation */}
          <div className="profile-sidebar">
            <div className="sidebar-header">
              <h2>My Account</h2>
            </div>
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <User size={20} />
                <span>Overview</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <Settings size={20} />
                <span>Personal Info</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={20} />
                <span>Orders</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <Bell size={20} />
                <span>Preferences</span>
              </button>
            </nav>
            
            <div className="sidebar-footer">
              <Button variant="ghost" className="logout-btn" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'preferences' && renderPreferences()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
