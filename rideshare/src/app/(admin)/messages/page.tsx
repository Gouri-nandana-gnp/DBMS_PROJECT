// src/app/messages/page.tsx
'use client';
import React, { useEffect, useState } from 'react';

interface Message {
    id: number;
    user: string;
    fromEmail: string;
    toEmail: string;
    send: boolean;
    received: boolean;
}

const MessagesPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch messages from the API
    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/getMessages');
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();

            if (data.messages) {
                setMessages(data.messages); // Access messages array
            } else {
                console.error("Unexpected data format:", data);
                setMessages([]); // Set to empty array to handle "No data" state
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            setError('Error fetching messages'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    // Fetch messages on mount
    useEffect(() => {
        fetchMessages();
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
                            <th className="p-4 border-b border-gray-300">ID</th>
                            <th className="p-4 border-b border-gray-300">From Email</th>
                            <th className="p-4 border-b border-gray-300">To Email</th>
                            <th className="p-4 border-b border-gray-300">Sent</th>
                            <th className="p-4 border-b border-gray-300">Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr key={message.id} className="bg-black hover:bg-gray-800 transition duration-300">
                                <td className="p-4 border-b border-gray-300">{message.id}</td>
                                <td className="p-4 border-b border-gray-300">{message.fromEmail}</td>
                                <td className="p-4 border-b border-gray-300">{message.toEmail}</td>
                                <td className="p-4 border-b border-gray-300">{message.send ? 'Yes' : 'No'}</td>
                                <td className="p-4 border-b border-gray-300">{message.received ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MessagesPage;
