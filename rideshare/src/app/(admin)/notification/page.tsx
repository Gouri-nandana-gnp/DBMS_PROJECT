'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/config'; // Adjust the import according to your project structure
import { onAuthStateChanged } from 'firebase/auth';

interface Notification {
  id: number;
  user: string;
  from: string;
  to: string;
  email: string; // Assumed to be the email of the user requesting approval
  send: boolean;
  received: boolean;
}

const TableComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState(''); // State to hold user information
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/getNotifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();

      if (data.notifications) {
        setNotifications(data.notifications);  // Access notifications array
      } else {
        console.error("Unexpected data format:", data);
        setNotifications([]);  // Set to empty array to handle "No data" state
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError('Error fetching notifications'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (notification: Notification) => {
    if (!user) {
      console.error("No user logged in");
      setError("You must be logged in to approve notifications.");
      return;
    }

    const approvalData = {
      user: user.name || "admin", // Pass the user email or default to 'admin'
      fromEmail: user.email, // Change this to match the expected key
      toEmail: notification.email, // Change this to match the expected key
      send: true, // Optional, can be set based on your logic
      received: false, // Optional, can be set based on your logic
    };
    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(approvalData),
      });

      if (!response.ok) {
        throw new Error('Failed to approve notification');
      }

      const result = await response.json();
      console.log("Approval Response:", result);

      // Refetch notifications after approval
      fetchNotifications();
    } catch (error) {
      console.error("Error approving notification:", error);
      setError('Error approving notification'); // Set error message
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Set up user state on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email || ''); // Ensure email is set
      } else {
        setUser(null);
        setEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 flex flex-col justify-center items-center bg-black">
      {loading ? (
        <p className="text-xl font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
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
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    onClick={() => handleApprove(notification)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  // Implement reject function if needed
                  >
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
