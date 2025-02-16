import React, { useEffect, useState } from "react";
import "./style.css";
import { X } from "lucide-react";

const ResearcherModal = ({ researcherId, onClose }) => {
  const [researcher, setResearcher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResearcherDetails = async () => {
      try {
        const response = await fetch(`/api/researchers/${researcherId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch researcher details"
          );
        }
        const data = await response.json();
        setResearcher(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (researcherId) {
      fetchResearcherDetails();
    }
  }, [researcherId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-white p-6 rounded-lg">
          Loading researcher details...
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

  if (!researcher) return null;

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
          <div className="flex gap-6 mb-8">
            <div className="pfp w-32 h-32"></div>
            <div>
              <h2 className="text-4xl font-bold mb-1">{researcher.name}</h2>
              <p className="text-yellow-500 mb-2">
                {researcher.institution} - {researcher.department}
              </p>
              <p className="text-yellow-500">{researcher.bio}</p>
            </div>
          </div>

          {/* Research Papers */}
          <section className="mb-8">
            <h3 className="text-xl text-blue-950 font-semibold mb-4">Research Papers</h3>
            <div className="space-y-4">
              {researcher.researchPapers?.map((paper, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{paper.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{paper.abstract}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{paper.journal}</span>
                    <span>{new Date(paper.publishedDate).getFullYear()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Funding Requests */}
          <section className="mb-8">
            <h3 className="text-xl text-blue-950 font-semibold mb-4">Funding Requests</h3>
            <div className="space-y-4">
              {researcher.fundingRequests?.map((request, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{request.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {request.description}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-800 text-2xl font-bold">
                      Amount: ₹{request.amount}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xl ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResearcherModal;
