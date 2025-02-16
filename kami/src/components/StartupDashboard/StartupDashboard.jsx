"use client";
import React, { useEffect, useState } from "react";
import StartupModal from "../StartupModel/StartupModel";
import Navbar from "../Navbar/Navbar"; // Import the Navbar component
import "./style.css";

const StartupDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("/api/entrepreneurs");
        if (!response.ok) {
          throw new Error("Failed to fetch startups");
        }
        const data = await response.json();
        setStartups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="dashboardContainer">
        <h2>Startup Profiles</h2>

        {loading ? (
          <p>Loading startups...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : startups.length === 0 ? (
          <p>No startups found</p>
        ) : (
          <div className="researcher-container">
            {startups.map((startup) => (
              <div key={startup._id} className="profileCard">
                <div className="pfp"></div>
                <div className="content">
                  <div className="name">{startup.startupDetails.name}</div>
                  <div className="profileDescription">
                    {startup.startupDetails.location} - {startup.startupDetails.industry}
                  </div>
                  <div className="extraContent">
                    <div className="patent">
                      <div className="patentNumber">
                        {startup.fundingStatus?.fundingRange?.min || 0} -{" "}
                        {startup.fundingStatus?.fundingRange?.max || 0}
                      </div>
                      <div className="patentTitle">Funding Range (₹)</div>
                    </div>
                    <div className="extraField">
                      <div className="fieldNumber">{startup.startupDetails.establishedYear}</div>
                      <div className="fieldTitle">Established Year</div>
                    </div>
                  </div>
                  <div className="interactiveButtons">
                    <button
                      className="viewProfileBtn"
                      onClick={() => setSelectedStartup(startup._id)}
                    >
                      View Profile
                    </button>
                    {startup.fundingStatus.isLookingForFunding && (
                      <button className="connectBtn">Invest</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedStartup && (
          <StartupModal
            startupId={selectedStartup}
            onClose={() => setSelectedStartup(null)}
          />
        )}
      </div>
    </main>
  );
};

export default StartupDashboard;
