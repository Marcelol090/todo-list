import GirlLaptop from '@/src/Icons/GirlLaptop';
import Image from 'next/image';
import Link from 'next/link';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h2>
            <p className="text-gray-600">Create your account</p>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors duration-200"
            >
              SIGN UP
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-pink-500 hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-1/2 bg-blue-100 relative">
         <GirlLaptop />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
