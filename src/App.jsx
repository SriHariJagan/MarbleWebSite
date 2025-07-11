import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import LoadingScreen from "./Components/LoadingScreen";

// Pages
import Home from "./Pages/Home/Home";
import LatestProducts from "./Pages/LatestProducts/LatestProducts";
import OurWebsite from "./Pages/OurWebsite/OurWebsite";
import OurCompany from "./Pages/OurCompany/OurCompany";
import ContactPage from "./Pages/ContactPage/ContactPage";
import NewContactPage from "./Pages/NewContactPage/NewContactPage";
import About from "./Pages/About/About";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import EnquiryForm from "./EnquiryForm/EnquiryForm";

import { ArrowBigDownDash, CircleX } from "lucide-react";

const HomePage = () => (
  <>
    <Home />
    <LatestProducts />
    <OurWebsite />
    <OurCompany />
    <ContactPage />
    <Footer />
  </>
);

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleForm = () => setShowForm(!showForm);
  const closeForm = () => setShowForm(false);

  // Wait for all images and videos to load
 useEffect(() => {
  // Handle dark mode toggle
  if (darkMode) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  // Handle loading screen for minimum time
  const MIN_LOAD_TIME = 5000;
  const startTime = Date.now();

  const handleLoad = () => {
    const timeElapsed = Date.now() - startTime;
    const remainingTime = MIN_LOAD_TIME - timeElapsed;

    if (remainingTime > 0) {
      setTimeout(() => setLoading(false), remainingTime);
    } else {
      setLoading(false);
    }
  };

  const images = Array.from(document.images);
  const videos = Array.from(document.querySelectorAll("video"));
  const media = [...images, ...videos];

  if (media.length === 0) return handleLoad();

  let loadedCount = 0;

  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount === media.length) {
      handleLoad();
    }
  };

  media.forEach((el) => {
    if (el.tagName === "VIDEO") {
      if (el.readyState >= 3) {
        checkAllLoaded();
      } else {
        el.addEventListener("loadeddata", checkAllLoaded);
        el.addEventListener("error", checkAllLoaded);
      }
    } else {
      if (el.complete) {
        checkAllLoaded();
      } else {
        el.addEventListener("load", checkAllLoaded);
        el.addEventListener("error", checkAllLoaded);
      }
    }
  });
}, [darkMode]);




  if (loading) return <LoadingScreen />;

  return (
    <div className="appContainer" style={{ animation: "fadeIn 0.6s ease-in" }}>
      {!showForm && (
        <button className="enquiryFormBtn" onClick={toggleForm}>
          <ArrowBigDownDash />
          Submit Your Requirement
        </button>
      )}

      {showForm && (
        <div className="enquiryOverlay" onClick={closeForm}>
          <div className="enquiryModal" onClick={(e) => e.stopPropagation()}>
            <button id="closeBtn" onClick={toggleForm}>
              <CircleX size={30} />
            </button>
            <EnquiryForm />
          </div>
        </div>
      )}

      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<NewContactPage />} />
          <Route path="/:category/:subcategory" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
