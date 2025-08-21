import React from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormContext";
import { useContext } from "react";
import Login from "./Login";
import { backendUrl } from "../config/config";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useContext(FormContext);

  const downloadExcelFile = async () => {
    try {

      const res = await fetch(`${backendUrl}/api/user/download-excel`, {method: "GET",headers: {token},});
      
      if (!res.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "registrations.xlsx"; 
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      alert("Failed to download Excel file.");
    }
  };


    if (!token) return <Login />

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col gap-4 w-3/4 max-w-xs">
        {/* Add Registration Button */}
        <button
          onClick={() => navigate("/register")}
          className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition"
        >
          Add Registration
        </button>

        {/* Download Excel Button */}
        <button
          onClick={downloadExcelFile}
          className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default Home;
