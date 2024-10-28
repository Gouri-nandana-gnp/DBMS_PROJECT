'use client';

import React, { useState } from 'react';
import Navbar from '@/app/(admin)/navbar/page';

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  // Function to handle button click, send data to the backend API
  const handleSeePrices = async () => {
    const rideDetails = {
      from: location,
      to: destination,
      send: true,
      received: false
    };

    console.log("Button clicked! Preparing to send data:", rideDetails);

    try {
      const response = await fetch('/api/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rideDetails)
      });

      console.log("Response status:", response.status);
      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-center h-screen overflow-hidden bg-black text-white p-8 lg:p-16">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/heroVid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      {/* Content Overlay */}


      <div className='absolute top-0 left-0 w-full'> <Navbar /></div>
      <div className="flex-1 flex flex-col gap-5 max-w-md lg:max-w-lg relative z-10">

        <h1 className="text-4xl lg:text-6xl font-bold">Go anywhere with RideShare</h1>
        <p className="text-xl lg:text-2xl">Request a ride, hop in, and go.</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            list="locations"
            placeholder="Enter location"
            className="p-3 text-lg border-none rounded-md bg-gray-200 text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <datalist id="locations">
            <option value="Gec" />
            <option value="Kadampazhipuram" />
            <option value="Sreekrishnapuram" />
          </datalist>

          <input
            type="text"
            list="destinations"
            placeholder="Enter destination"
            className="p-3 text-lg border-none rounded-md bg-gray-200 text-black"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <datalist id="destinations">
            <option value="Gec" />
            <option value="Kadampazhipuram" />
            <option value="Sreekrishnapuram" />
          </datalist>

          <button
            className="p-3 bg-blue-500 text-black w-full rounded-md text-xl hover:bg-gray-300"
            onClick={handleSeePrices}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
