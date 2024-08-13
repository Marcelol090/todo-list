"use client";

import GoogleIcon from "@/src/Icons/GoogleIcon";

const Login = () => {
  const handleGoogleSignIn = () => {
    // Aqui você colocaria a lógica para autenticar com Google
    console.log("Google Sign-In triggered");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        {/* Logo Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-center">
            Sign in to continue with your account
          </p>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <GoogleIcon width={30} height={30} />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
