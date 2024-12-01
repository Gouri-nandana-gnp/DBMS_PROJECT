// src/app/about/page.tsx

import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-4">About RideShare</h1>
            <p className="text-lg mb-6 text-center">
                RideShare is an innovative platform designed to connect college students who need rides with those who can provide them.
                Our goal is to make transportation more accessible, affordable, and environmentally friendly.
            </p>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="text-lg mb-6 text-center">
                Users can easily request a ride by entering their current location and desired destination.
                Fellow students who are headed in the same direction can then offer rides, creating a collaborative and community-oriented solution to transportation challenges.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Why Use RideShare?</h2>
            <ul className="list-disc list-inside mb-6 text-lg text-left">
                <li>Cost-effective: Save money on transportation costs by sharing rides.</li>
                <li>Convenient: Easily find rides with a few clicks.</li>
                <li>Community-driven: Meet new people and make connections within your college community.</li>
                <li>Eco-friendly: Reduce your carbon footprint by sharing rides.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Join Us Today!</h2>
            <p className="text-lg text-center">
                Become a part of our growing community and make your college experience easier and more enjoyable.
                Sign up today and start hitchhiking with RideShare!
            </p>
        </div>
    );
};

export default AboutPage;
