'use client';

import React from 'react';

const TableComponent: React.FC = () => {
  const rides = [
    { id: 1, from: 'GEC', to: 'Sreekrishnapuram' },
    { id: 2, from: 'GEC', to: 'Sreekrishnapuram' },
    { id: 3, from: 'GEC', to: 'Sreekrishnapuram' },
    { id: 4, from: 'GEC', to: 'Sreekrishnapuram' },
  ];

  return (
    <div className="p-8 flex justify-center">
      <table className="table-auto w-full text-center bg-gray-100 border border-gray-300">
        <thead className="bg-gray-300">
          <tr>
            <th className="p-4 border">Sl No</th>
            <th className="p-4 border">From</th>
            <th className="p-4 border">To</th>
            <th className="p-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, index) => (
            <tr key={ride.id} className="bg-gray-100 even:bg-gray-200">
              <td className="p-4 border">{index + 1}</td>
              <td className="p-4 border">{ride.from}</td>
              <td className="p-4 border">{ride.to}</td>
              <td className="p-4 border flex justify-center gap-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
