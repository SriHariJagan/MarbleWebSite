import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import LatestProducts from "./Pages/LatestProducts/LatestProducts";
import OurWebsite from "./Pages/OurWebsite/OurWebsite";
import OurCompany from "./Pages/OurCompany/OurCompany";
import ContactPage from "./Pages/ContactPage/ContactPage";
import Footer from "./Pages/Footer/Footer";
import NewContactPage from "./Pages/NewContactPage/NewContactPage";
import { ArrowBigDownDash, CircleX } from "lucide-react";
import EnquiryForm from "./EnquiryForm/EnquiryForm";
import About from "./Pages/About/About";

import ProductDetails from "./Components/ProductDetails/ProductDetails";

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

  const toggleForm = () => setShowForm(!showForm);
  const closeForm = () => setShowForm(false);

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
            <button id="closeBtn" onClick={toggleForm}> <CircleX  size={30}/></button>
            <EnquiryForm />
          </div>
        </div>
      )}

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<NewContactPage />} />
        <Route path="/:category/:subcategory" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
