import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 2rem',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <h2>
                <Link to="/" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.05em', fontSize: '1.5rem' }}>
                    StackedScribe<span style={{ color: '#2563eb' }}>.</span>
                </Link>
            </h2>
            <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500' }}>Home</Link>
                {user ? (
                    <>
                        <Link to="/create" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '600' }}>
                            + Write
                        </Link>
                        <span style={{ color: '#64748b', fontSize: '0.95rem' }}>{user.username}</span>
                        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', fontSize: '0.9rem' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500' }}>Login</Link>
                        <Link to="/register" style={{ textDecoration: 'none', backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600' }}>
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;