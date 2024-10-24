'use client';

import React from 'react';
import Image from 'next/image'; // for images in Next.js

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Go anywhere with Uber</h1>
        <p>Request a ride, hop in, and go.</p>

        <div className="input-group">
          <input type="text" placeholder="Enter location" className="input-field" />
          <input type="text" placeholder="Enter destination" className="input-field" />
          <button className="btn">See prices</button>
        </div>
      </div>

      <div className="image-container">
        {/* You can add an actual image here using the Image component */}
        <Image
          src="https://images.pexels.com/photos/12101058/pexels-photo-12101058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // path to the image in your public folder
          alt="Car ride image"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 50px;
          height: 100vh;
          background-color: #000;
          color: white;
        }
        
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 500px;
        }

        h1 {
          font-size: 3rem;
          margin: 0;
        }

        p {
          font-size: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-field {
          padding: 10px;
          font-size: 1.2rem;
          border: none;
          border-radius: 5px;
        }

        .btn {
          padding: 10px;
          background-color: #fff;
          color: black;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .btn:hover {
          background-color: #f0f0f0;
        }

        .image-container {
          position: relative;
          flex: 1;
          height: 100%;
          max-width: 600px;
        }

        /* Responsiveness */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }

          .content {
            align-items: center;
            text-align: center;
          }

          h1 {
            font-size: 2.5rem;
          }

          .input-group {
            flex-direction: column;
          }

          .image-container {
            width: 100%;
            max-width: 400px;
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
          }

          .image-container {
            max-width: 100%;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
