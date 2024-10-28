'use client';

import React, { useEffect, useState } from 'react';

interface Notification {
  id: number;
  user: string;
  from: string;
  to: string;
}

const TableComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/getNotifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();

      // Ensure data structure matches what backend sends
      if (data.notifications) {
        setNotifications(data.notifications);  // Access notifications array
      } else {
        console.error("Unexpected data format:", data);
        setNotifications([]);  // Set to empty array to handle "No data" state
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-8 flex justify-center bg-black">
      {loading ? (
        <p className="text-xl font-semibold">Loading...</p>
      ) : (
        <table className="table-auto w-full text-center bg-lime-300 border border-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-lime-400 text-white">
            <tr>
              <th className="p-4 border-b border-gray-300">Sl No</th>
              <th className="p-4 border-b border-gray-300">User</th>
              <th className="p-4 border-b border-gray-300">From</th>
              <th className="p-4 border-b border-gray-300">To</th>
              <th className="p-4 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.slice().reverse().map((notification, index) => (
              <tr key={notification.id} className="bg-black hover:bg-black transition duration-300">
                <td className="p-4 border-b border-gray-300">{"*" + (index + 1) + "*"}</td>
                <td className="p-4 border-b border-gray-300">{notification.user}</td>
                <td className="p-4 border-b border-gray-300">{notification.from}</td>
                <td className="p-4 border-b border-gray-300">{notification.to}</td>
                <td className="p-4 border-b border-gray-300 flex justify-center gap-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
