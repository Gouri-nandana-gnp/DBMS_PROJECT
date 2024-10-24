'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // for images in Next.js

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  // Function to handle button click and log the location and destination as an object
  const handleSeePrices = () => {
    const rideDetails = {
      location: location,
      destination: destination,
    };
    console.log(rideDetails); // Log the object to the console
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center h-screen bg-black text-white p-8 lg:p-16">
      <div className="flex-1 flex flex-col gap-5 max-w-md lg:max-w-lg">
        <h1 className="text-4xl lg:text-6xl font-bold">Go anywhere with RideShare</h1>
        <p className="text-xl lg:text-2xl">Request a ride, hop in, and go.</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            list="locations"
            placeholder="Enter location"
            className="p-3 text-lg border-none rounded-md bg-gray-200 text-black"
            value={location} // Controlled input for location
            onChange={(e) => setLocation(e.target.value)} // Update state on input change
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
            value={destination} // Controlled input for destination
            onChange={(e) => setDestination(e.target.value)} // Update state on input change
          />
          <datalist id="destinations">
            <option value="Gec" />
            <option value="Kadampazhipuram" />
            <option value="Sreekrishnapuram" />
          </datalist>

          <button
            className="p-3 bg-white text-black rounded-md text-lg hover:bg-gray-300"
            onClick={handleSeePrices} // Call the function when button is clicked
          >
            See prices
          </button>
        </div>
      </div>

      <div className="relative flex-1 h-64 lg:h-full max-w-lg mt-10 lg:mt-0">
        <Image
          src="https://images.pexels.com/photos/12101058/pexels-photo-12101058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Car ride image"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default HomePage;
