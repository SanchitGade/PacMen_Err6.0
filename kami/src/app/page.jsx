"use client";
import React from "react";
import Image from "next/image"; // Import Next.js Image component
import Navbar from "../components/Navbar/Navbar";
import creatorImage from "./creator.jpg"; // Import local image
import compVectorImage from "./COM-8.jpg"; // Import local image
import "./style.css";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <main>
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1>Streamline Research and Drive Innovation</h1>
            <p>
              Join us in overcoming challenges in research management and achieving
              greater innovation through collaboration and data transparency.
            </p>
            <button className="primary-btn">Get Started</button>
          </div>
          <div className="hero-image">
            <Image
              src={creatorImage} // Use imported image
              alt="Innovation"
              width={500} // Adjust dimensions as needed
              height={400}
              priority // Ensures image loads faster
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="info-section">
          <div className="info-image">
            <Image
              src={compVectorImage} // Use imported image
              alt="Innovation"
              width={450}
              height={350}
            />
          </div>
          <div className="info-content">
            <h2>Transforming India's Research & Innovation Ecosystem</h2>
            <p>
              Empowering researchers and startups through an AI-driven platform that
              bridges challenges in India's innovation landscape.
            </p>
            <div className="highlight-box">1+ Unified Ecosystem for Innovation</div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-logo">
          <p className="logo-text">Logo</p>
          <p>We provide the best solution for your business.</p>
        </div>
        <div className="footer-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Innovation</a></li>
            <li><a href="#">Fundings & Grants</a></li>
            <li><a href="#">Events & Workshops</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <p>Contact Us</p>
          <p>Address: 123, XYZ Street, ABC City</p>
          <p>Email: xyz@gmail.com</p>
          <p>Phone: +91 99999 99992</p>
        </div>
        <div className="footer-feedback">
          <p>Feedback</p>
          <div className="footer-feedback-input">
            <input className="input" placeholder="Message" type="text" />
            <button className="btn"><i className="fa-solid fa-check"></i></button>
          </div>
        </div>
        <div className="footer-copy">
          <p>© 2024 Researcher Dashboard. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;