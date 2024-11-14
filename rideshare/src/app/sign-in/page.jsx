// src/pages/SignIn.js
"use client";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const SignIn = () => {
  const router = useRouter(); // Initialize the router

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
      // Redirect to home page after successful sign in
      router.push("/"); // Change to your home page route if different
    } catch (err) {
      console.error("Error signing in with Google:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        <button
          onClick={handleGoogleSignIn}
          className="w-full p-3 font-semibold text-gray-900 transition-colors bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign In with Google
        </button>
        {/* <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="font-semibold text-indigo-500 hover:underline"
          >
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default SignIn;
