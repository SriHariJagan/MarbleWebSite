// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";
import categories from "../../Constant/categories.json";
import {
  Menu,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ChevronRight,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  const staticLinks = ["Home", "About Us"];
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
        setActiveMobileCategory(null);
        setShowOverlay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

 useEffect(() => {
  if (mobileOpen || hoveredCategory !== null) {
    document.body.classList.add(styles.noScroll);
  } else {
    document.body.classList.remove(styles.noScroll);
  }
}, [mobileOpen, hoveredCategory]);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const handleSubLinkClick = () => {
    setMobileOpen(false);
    setActiveMobileCategory(null);
    setTimeout(() => setShowOverlay(false), 300);
  };

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.navHidden]: !showNavbar,
      })}
    >
      <div className={styles.logo}>
        <Link to="/"><img src="/Images/logo.png" alt="logo" width={200} /></Link>
      </div>

      <div className={styles.desktopNav}>
        <ul className={styles.navList}>
          {staticLinks.map((link) => (
            <li key={link}>
              <NavLink
                to={
                  link === "Home"
                    ? "/"
                    : `/${link.toLowerCase().replace(/\s+/g, "")}`
                }
                className={({ isActive }) =>
                  isActive ? styles.activeLink : undefined
                }
              >
                {link}
              </NavLink>
            </li>
          ))}

          {categories.map((cat, idx) => {
            const catPath = `/${cat.name.toLowerCase().replace(/\s+/g, "")}`;
            const isCategoryActive = location.pathname.startsWith(catPath);

            return (
              <li
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={styles.dropdownWrapper}
              >
                <span
                  className={classNames(styles.dropdownTitle, {
                    [styles.activeLink]: isCategoryActive,
                  })}
                >
                  {cat.name}
                  {hoveredCategory === idx ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
                <AnimatePresence>
                  {hoveredCategory === idx && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={styles.dropdown}
                    >
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <NavLink
                            to={`/${cat.name
                              .toLowerCase()
                              .replace(/\s+/g, "")}/${sub
                              .toLowerCase()
                              .replace(/\s+/g, "")}`}
                            className={({ isActive }) =>
                              isActive ? styles.activeLink : undefined
                            }
                          >
                            {sub}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}

          <li>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              Contact Us
            </NavLink>
          </li>

          <li className={styles.searchIcon}>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
              />
            )}
            <Search size={20} onClick={() => setSearchOpen(!searchOpen)} />
          </li>

          <li
            className={styles.themeToggle}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </li>
        </ul>
      </div>

      {/* Mobile */}
      <div className={styles.mobileNav}>
        <Menu
          size={30}
          onClick={() => {
            setShowOverlay(true);
            setMobileOpen(true);
          }}
        />

        <span onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </span>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {!activeMobileCategory ? (
                <ul className={styles.mobileList}>
                  <li className={styles.closeButton}>
                    <X size={30} onClick={() => setMobileOpen(false)} />
                  </li>
                  {staticLinks.map((link) => (
                    <li key={link}>
                      <NavLink
                        to={`/${link.toLowerCase().replace(/\s+/g, "")}`}
                        className={({ isActive }) =>
                          isActive ? styles.activeLink : undefined
                        }
                        onClick={handleSubLinkClick}
                      >
                        {link}
                      </NavLink>
                    </li>
                  ))}
                  {categories.map((cat) => {
                    const catPath = `/${cat.name
                      .toLowerCase()
                      .replace(/\s+/g, "")}`;
                    const isActive = location.pathname.startsWith(catPath);

                    return (
                      <li
                        key={cat.name}
                        onClick={() => setActiveMobileCategory(cat)}
                        className={isActive ? styles.activeLink : ""}
                      >
                        {cat.name} <ChevronRight size={16} />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className={styles.mobileList}>
                  <li
                    onClick={() => setActiveMobileCategory(null)}
                    className={styles.backArrow}
                  >
                    <ArrowLeft size={22} /> Back
                  </li>
                  {activeMobileCategory.subcategories.map((sub) => (
                    <li key={sub} onClick={handleSubLinkClick}>
                      <NavLink
                        to={`/${activeMobileCategory.name
                          .toLowerCase()
                          .replace(/\s+/g, "")}/${sub
                          .toLowerCase()
                          .replace(/\s+/g, "")}`}
                        className={({ isActive }) =>
                          isActive ? styles.activeLink : undefined
                        }
                      >
                        {sub}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
