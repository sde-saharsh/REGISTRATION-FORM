import React, { useState, useContext } from "react";
import { FormContext } from "../context/FormContext.jsx";
import Login from "./Login";
import axios from "axios";
import { backendUrl } from "../config/config.js";
import Confirm from './Confirm.jsx';

const Form = () => {

  const {token} = useContext(FormContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    branchName: "",
    className: "",
    collegeName: "",
    eventName: "",
    paymentMode: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  // Track submission state

  if (!token) return <Login />;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple clicks

    setIsSubmitting(true);

    try {
      const res = await axios.post(backendUrl + "/api/user/register", formData, {
        headers: { token },
      });

      if (res.data.success) {
        setIsSubmitted(true); // Show confirmation on success
      } else {
        alert(res.data.message);
        setIsSubmitting(false); // Re-enable button on failure
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
      setIsSubmitting(false); // Re-enable button on error
    }
  };

  if (isSubmitted) {
    return <Confirm />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Event Registration Form
        </h2>

        <form className="space-y-5" onSubmit={onSubmitHandler}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile Number :</label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter email"
              required
            />
          </div>

          {/* College Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">College Name :</label>
            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter college name"
              required
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Branch :</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter branch name"
              required
            />
          </div>

          {/* Class Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Class :</label>
            <div className="flex flex-col gap-2">
              {["First Year", "Second Year", "Third Year", "Fourth Year"].map((year) => (
                <label key={year} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="className"
                    value={year}
                    checked={formData.className === year}
                    onChange={onChangeHandler}
                    className="text-purple-500"
                    required
                  />
                  {year}
                </label>
              ))}
            </div>
          </div>

          {/* Event Name - Radio Vertical */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Event Name :</label>
            <div className="flex flex-col gap-2">
              {["Coding (Rs. 200)", "Robotics (Rs. 200)", "Hackathon (Rs. 200)", "Gaming (Rs. 200)"].map((event) => (
                <label key={event} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="eventName"
                    value={event}
                    checked={formData.eventName === event}
                    onChange={onChangeHandler}
                    className="text-purple-500"
                    required
                  />
                  {event}
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method - Radio Vertical */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Payment Method :</label>
            <div className="flex flex-col gap-2">
              {["Cash", "Online"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMode"
                    value={method}
                    checked={formData.paymentMode === method}
                    onChange={onChangeHandler}
                    className="text-purple-500"
                    required
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          {/* QR Image */}
          <div className="text-center">
            <label className="block text-gray-700 font-medium mb-2">QR Code (for payment)</label>
            <div className="w-40 h-40 border border-gray-300 flex items-center justify-center mx-auto rounded-md bg-gray-50">
              <p className="text-gray-400 text-sm">[QR Image]</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-2 px-4 rounded-md font-semibold text-white shadow-md transition duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
