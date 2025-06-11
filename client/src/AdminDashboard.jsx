import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3500/api/admin/enquiries', {
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return [];
        }
        return res.json();
      })
      .then(setEnquiries);
  }, []);

  const del = async id => {
    await fetch(`http://localhost:3500/api/admin/enquiries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setEnquiries(enquiries.filter(e => e.id !== id));
  };

  const sendReply = async () => {
    if (!selected) return;
    await fetch(`http://localhost:3500/api/admin/enquiries/${selected.id}/respond`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: reply }),
    });
    setReply('');
    setSelected(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Admin: Enquiries</h1>
      <table className="w-full mb-6 border">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Event Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map(e => (
            <tr key={e.id} className="border-t">
              <td>{e.first_name} {e.last_name}</td>
              <td>{e.email}</td>
              <td>{new Date(e.event_date).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button onClick={() => setSelected(e)} className="underline">View/Reply</button>
                <button onClick={() => del(e.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl mb-2">{selected.first_name}’s enquiry</h2>
          <p><strong>Type:</strong> {selected.event_type}</p>
          <p><strong>Date:</strong> {new Date(selected.event_date).toLocaleString()}</p>
          <p><strong>Info:</strong> {selected.additional_info}</p>
          <hr className="my-4" />
          <textarea
            rows="4"
            className="w-full border p-2 rounded mb-2"
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="flex space-x-2">
            <button onClick={sendReply} className="bg-blue-600 text-white px-4 py-2 rounded">
              Send Reply
            </button>
            <button onClick={() => setSelected(null)} className="px-4 py-2 rounded border">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
