// src/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [view, setView] = useState('enquiries');      // toggle state
  const [enquiries, setEnquiries] = useState([]);
  const [bookings, setBookings]     = useState([]);
  const [selected, setSelected]     = useState(null);
  const [reply, setReply]           = useState('');
  const navigate = useNavigate();

  // Fetch whenever `view` changes
  useEffect(() => {
    const url =
      view === 'enquiries'
        ? 'http://localhost:3500/api/admin/enquiries'
        : 'http://localhost:3500/api/admin/bookings';

    fetch(url, { credentials: 'include' })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return [];
        }
        return res.json();
      })
      .then(data => {
        view === 'enquiries' ? setEnquiries(data) : setBookings(data);
        setSelected(null);
      });
  }, [view, navigate]);

  // Delete enquiry
  const delEnquiry = async (id) => {
    await fetch(`http://localhost:3500/api/admin/enquiries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setEnquiries(enquiries.filter(e => e.id !== id));
  };

  // Send reply to enquiry
  const sendReply = async () => {
    if (!selected) return;
    await fetch(
      `http://localhost:3500/api/admin/enquiries/${selected.id}/respond`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply }),
      }
    );
    setReply('');
    setSelected(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>

      {/* Toggle buttons */}
      <div className="mb-6 space-x-4">
        <button
          onClick={() => setView('enquiries')}
          className={`px-4 py-2 rounded ${
            view === 'enquiries' ? 'bg-blue-600 text-white' : 'border'
          }`}
        >
          Enquiries
        </button>
        <button
          onClick={() => setView('bookings')}
          className={`px-4 py-2 rounded ${
            view === 'bookings' ? 'bg-blue-600 text-white' : 'border'
          }`}
        >
          Bookings
        </button>
      </div>

      {view === 'enquiries' ? (
        <>
          <h2 className="text-2xl mb-4">Enquiries</h2>
          <table className="w-full mb-6 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Heard About Us</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(e => (
                <tr key={e.id} className="border-t">
                  <td className="p-2">{e.user?.name || '–'}</td>
                  <td className="p-2">{e.user?.email || '–'}</td>
                  <td className="p-2">{e.phone_number}</td>
                  <td className="p-2">{e.how_you_heard}</td>
                  <td className="p-2">
                    {new Date(e.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => setSelected(e)}
                      className="underline"
                    >
                      View/Reply
                    </button>
                    <button
                      onClick={() => delEnquiry(e.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selected && (
            <div className="p-4 bg-gray-50 rounded shadow">
              <h2 className="text-xl mb-2">{selected.user?.name}’s Enquiry</h2>
              <p><strong>Phone:</strong> {selected.phone_number}</p>
              <p><strong>Heard About Us:</strong> {selected.how_you_heard}</p>
              <p className="mt-2"><strong>Additional Info:</strong></p>
              <p>{selected.additional_info}</p>
              <hr className="my-4" />
              <textarea
                rows="4"
                className="w-full border p-2 rounded mb-2"
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Write your reply..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={sendReply}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Send Reply
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded border"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Bookings</h2>
          <table className="w-full mb-6 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Package</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.user?.name || '–'}</td>
                  <td className="p-2">{b.user?.email || '–'}</td>
                  <td className="p-2">{b.package}</td>
                  <td className="p-2">{b.event_type}</td>
                  <td className="p-2">
                    {new Date(b.event_date).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(b.event_time).toLocaleTimeString()}
                  </td>
          {/* Status dropdown */}
          <td className="p-2">
        <select
          value={b.booking_status}
          onChange={async (e) => {
            const newStatus = e.target.value;
            try {
              const res = await fetch(
                `http://localhost:3500/api/admin/bookings/${b.id}/status`,
                {
                  method: 'PATCH',
                  credentials: 'include',               // send your cookie
                  headers: {
                    'Content-Type': 'application/json' // parse this as JSON
                  },
                  body: JSON.stringify({ status: newStatus }),
                }
              );
          
              const payload = await res.json();
              if (!res.ok) {
                return alert(`Could not update status: ${payload.error}`);
              }
              setBookings((prev) =>
                prev.map((x) =>
                  x.id === b.id ? { ...x, booking_status: payload.booking_status } : x
                )
              );
            } catch (err) {
              console.error('Network or unexpected error:', err);
              alert('Unexpected error; check console and server logs.');
            }
          }}
          className="border rounded p-1"
        >
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </td>

      <td className="p-2">
        <button
          onClick={async () => {
            if (!window.confirm('Delete this booking?')) return;
            await fetch(`http://localhost:3500/api/admin/bookings/${b.id}`, {
              method: 'DELETE',
              credentials: 'include',
            });
            setBookings((prev) => prev.filter((x) => x.id !== b.id));
          }}
          className="text-red-600 underline"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>
        </>
      )}
    </div>
  );
}
