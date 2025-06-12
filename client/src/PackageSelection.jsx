import React from 'react';
import { useNavigate } from 'react-router-dom';

const PACKAGES = [
  {
    id: 'standard',
    title: 'Standard',
    rate: 50,
    maxHours: 3,
    summary: 'Raw digital photos delivered.'
  },
  {
    id: 'premium',
    title: 'Premium',
    rate: 100,
    maxHours: 5,
    summary: 'I’ll hand-pick the best shots for you.'
  },
  {
    id: 'deluxe',
    title: 'Deluxe',
    rate: 200,
    maxHours: 'Unlimited',
    summary: 'I’ll select and professionally edit your top photos.'
  },
];

export default function PackageSelection() {
  const navigate = useNavigate();
  
  const handleSelect = (pkg) => {
    // Navigate to booking form, passing package as a query param
    navigate(`/booking?package=${pkg.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {PACKAGES.map((pkg) => (
        <div key={pkg.id} className="border rounded-lg p-6 shadow hover:shadow-md">
          <h2 className="text-xl font-bold mb-2">{pkg.title}</h2>
          <p className="mb-1"><strong>${pkg.rate}/h</strong></p>
          <p className="mb-2"><strong>Max:&nbsp;</strong>{pkg.maxHours} {pkg.maxHours==='Unlimited' ? '' : 'hrs'}</p>
          <p className="mb-4 text-gray-600">{pkg.summary}</p>
          <button
            onClick={() => handleSelect(pkg)}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Choose {pkg.title}
          </button>
        </div>
      ))}
    </div>
  );
}
