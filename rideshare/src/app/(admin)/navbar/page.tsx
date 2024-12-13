"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config'; // Import your firebase config
import { onAuthStateChanged, User } from 'firebase/auth'; // Import Firebase method for auth state

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null); // State to store user data
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignIn = () => {
        router.push("/sign-in");
    };

    const handleSignOut = async () => {
        await auth.signOut(); // Sign out the user
        setUser(null); // Reset user state
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the user state
            } else {
                setUser(null); // No user is signed in
            }
        });
        return () => unsubscribe(); // Clean up the observer on unmount
    }, []);

    return (
        <nav className="bg-black bg-opacity-10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-lg font-bold">RideShare</Link>
                        </div>
                        <div className="hidden sm:flex space-x-4 ml-10">
                            <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                            <Link href="/messages" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Notifications</Link>
                            <Link href="/rider" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Rider</Link>
                        </div>
                    </div>
                    <div className="flex items-center ml-auto"> {/* Use ml-auto to push the button to the right */}
                        {user ? (
                            <div className="flex items-center">
                                <Image
                                    src={user.photoURL || '/default-avatar.png'} // Fallback to a default image if no photo
                                    alt={user.displayName || "User"}
                                    className="w-8 h-8 rounded-full mr-2" // Style the image
                                />
                                <span className="text-white">{user.displayName}</span>
                                <button
                                    className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={handleSignOut} // Handle sign out
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button className="bg-orange-500 hover:bg-orange-600 opacity-90 hover:opacity-100 text-white px-4 py-2 rounded"
                                onClick={handleSignIn}>Sign in</button>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/about" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">About</Link>
                    <Link href="/notifications" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Notifications</Link>
                    <Link href="/rider" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Rider</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
