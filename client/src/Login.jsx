import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

export default function Login() {
  const { setUser } = useContext(AuthContext);   // ← grab setUser
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // 1) log in and receive the cookie
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',            // ← very important
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }

    // 2) fetch current user immediately—and update context
    const meRes = await fetch('/api/auth/me', {
      credentials: 'include',            // ← send the cookie
    });
    if (meRes.ok) {
      const meData = await meRes.json();
      setUser(meData);                   // ← triggers Header re-render
    }

    // 3) navigate away
    navigate('/home');
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded mb-12">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Log In
        </button>
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
      </form>
    </div>
  );
}
