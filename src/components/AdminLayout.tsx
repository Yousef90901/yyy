import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/admin/dashboard', label: 'الرئيسية', icon: 'fas fa-tachometer-alt' },
  { to: '/admin/profile', label: 'الملف الشخصي', icon: 'fas fa-user' },
  { to: '/admin/skills', label: 'المهارات', icon: 'fas fa-code' },
  { to: '/admin/projects', label: 'المشاريع', icon: 'fas fa-rocket' },
  { to: '/admin/experience', label: 'الخبرات', icon: 'fas fa-briefcase' },
  { to: '/admin/testimonials', label: 'التوصيات', icon: 'fas fa-comments' },
  { to: '/admin/settings', label: 'الإعدادات', icon: 'fas fa-cog' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) return <Navigate to="/admin" replace />;

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="container">
          <h2>
            <i className="fas fa-leaf" style={{ color: 'var(--accent)' }}></i>
            يوسف<span>.</span>عويس <span style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.6 }}>| لوحة التحكم</span>
          </h2>
          <div className="admin-nav-links">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>
                <i className={item.icon}></i> {item.label}
              </NavLink>
            ))}
            <button onClick={handleLogout} style={{ color: '#ff6b6b' }}>
              <i className="fas fa-sign-out-alt"></i> خروج
            </button>
          </div>
        </div>
      </nav>

      <main className="admin-main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
