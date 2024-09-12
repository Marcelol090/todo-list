import { SignUpForm } from "@/src/components/Forms/SignUpForm/SignUpForm";
import GirlLaptop from "@/src/components/Icons/GirlLaptop";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="w-full p-8 md:w-1/2">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-4xl font-bold text-gray-800">Sign Up</h2>
            <p className="text-gray-600">Create your account</p>
          </div>

          <SignUpForm />

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-pink-500 hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>

        <div className="relative hidden w-1/2 items-center justify-center bg-blue-100 md:flex">
          <GirlLaptop />
        </div>
      </div>
    </div>
  );
};

export default SignUp;