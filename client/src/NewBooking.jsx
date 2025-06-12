import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function NewBooking() {
  const [searchParams] = useSearchParams();
  const pkg = searchParams.get('package') || '';
  const [form, setForm] = useState({
    event_type: '',
    event_date: '',
    event_time: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Capitalize to match your Prisma enum
      const pkgValue = pkg.charAt(0).toUpperCase() + pkg.slice(1);

      const res = await fetch('http://localhost:3500/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          package: pkgValue,
          event_type: form.event_type,
          event_date: form.event_date,
          event_time: form.event_time,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        Booking — {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Event Type</label>
          <input
            name="event_type"
            type="text"
            value={form.event_type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block font-medium">Date</label>
            <input
              name="event_date"
              type="date"
              value={form.event_date}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Time</label>
            <input
              name="event_time"
              type="time"
              value={form.event_time}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Confirm Booking
        </button>
      </form>

      {status === 'loading' && <p className="mt-4 text-blue-600">Submitting…</p>}
      {status === 'success' && <p className="mt-4 text-green-600">Booking confirmed!</p>}
      {status === 'error'   && <p className="mt-4 text-red-600">Error submitting booking.</p>}
    </div>
  );
}
