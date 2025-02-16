"use client";
import React, { useEffect, useState } from "react";
import ResearcherModal from "../ResearcherModal/ResearcherModal";
import "./style.css";
import Navbar from "../Navbar/Navbar";

const ResearcherDashboard = () => {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResearcher, setSelectedResearcher] = useState(null);

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const response = await fetch("/api/researchers");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch researchers");
        }
        const data = await response.json();
        setResearchers(data);
      } catch (err) {
        console.error("Error fetching researchers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* <div className="navBar">
        <div className="logo">KAMI</div>
        <div className="navi">
          <div className="pfpDiv">
            <i className="fa-solid fa-house"></i>
          </div>
          <div className="pfpDiv">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div> */}

      <Navbar />
      <div className="dashboardContainer">
        <h2>Researcher Profiles</h2>

        {loading ? (
          <p>Loading researchers...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : researchers.length === 0 ? (
          <p>No researchers found</p>
        ) : (
          <div className="researcher-container">
            {researchers.map((researcher) => (
              <div key={researcher._id} className="profileCard">
                <div className="pfp"></div>
                <div className="content">
                  <div className="name">{researcher.name}</div>
                  <div className="profileDescription">
                    {researcher.institution} - {researcher.department}
                  </div>
                  <div className="extraContent">
                    <div className="patent">
                      <div className="patentNumber">
                        {researcher.researchPapers?.length || 0}
                      </div>
                      <div className="patentTitle">Research Papers</div>
                    </div>
                    <div className="extraField">
                      <div className="fieldNumber">
                        {researcher.fundingRequests?.length || 0}
                      </div>
                      <div className="fieldTitle">Funding Requests</div>
                    </div>
                  </div>
                  <div className="interactiveButtons">
                    <button
                      className="viewProfileBtn"
                      onClick={() => setSelectedResearcher(researcher._id)}
                    >
                      View Profile
                    </button>
                    <button className="connectBtn">Connect</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedResearcher && (
          <ResearcherModal
            researcherId={selectedResearcher}
            onClose={() => setSelectedResearcher(null)}
          />
        )}
      </div>
    </main>
  );
};

export default ResearcherDashboard;
