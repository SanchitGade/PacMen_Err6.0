import React, { useEffect, useState } from "react";
import "./style.css";
import { X } from "lucide-react";

const StartupModal = ({ startupId, onClose }) => {
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await fetch(`/api/entrepreneurs/${startupId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch startup details");
        }
        const data = await response.json();
        setStartup(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (startupId) {
      fetchStartupDetails();
    }
  }, [startupId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-white p-6 rounded-lg">
          Loading startup details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white p-6 rounded-lg">
          <p className="text-red-500">Error: {error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!startup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-4/5 h-4/5 bg-white rounded-lg overflow-hidden animate-modalOpen">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        <div className="h-full overflow-y-auto p-6">
          <h2 className="text-4xl text-yellow-600 font-extrabold">{startup.startupDetails.name}</h2>
          <p className="text-blue-950 text-2xl">{startup.startupDetails.location}</p>
          <p className="text-blue-950 ">{startup.startupDetails.description}</p>

          <section className="mb-8">
            <h3 className="text-xl text-blue-950 font-semibold mb-4">
              Funding Information
            </h3>
            <div className="p-4 border rounded-lg">
              <p>
                <strong>Funding Stage:</strong>{" "}
                {startup.fundingStatus.fundingStage}
              </p>
              <p>
                <strong>Funding Range:</strong> ₹
                {startup.fundingStatus.fundingRange.min} - ₹
                {startup.fundingStatus.fundingRange.max}
              </p>
              <p>
                <strong>Looking for Funding?</strong>{" "}
                {startup.fundingStatus.isLookingForFunding ? "Yes" : "No"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StartupModal;
