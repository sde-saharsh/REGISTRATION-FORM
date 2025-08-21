import React from 'react';

const Confirm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <svg
          className="mx-auto mb-6 h-16 w-16 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for registering. A confirmation email has been sent to your address.
          We look forward to seeing you at the event!
        </p>
        <button
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
        >
          Register Another
        </button>
      </div>
    </div>
  );
};

export default Confirm;
