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
    const handleLoad = () => setLoading(false);
    const timeout = setTimeout(handleLoad, 3000); // fallback timeout

    const media = [...document.images, ...document.querySelectorAll("video")];
    let loadedCount = 0;

    if (media.length === 0) return handleLoad();

    media.forEach((el) => {
      if (el.complete || el.readyState === 4) {
        loadedCount++;
      } else {
        el.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === media.length) handleLoad();
        });
        el.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === media.length) handleLoad();
        });
      }
    });

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="appContainer">
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
