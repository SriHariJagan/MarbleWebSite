// Navbar.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
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
import styles from "./navbar.module.css";
import categories from "../../Constant/categories.json";

// Animation variants for better performance
const dropdownVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

const childDropdownVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
};

const mobileMenuVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" }
};

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const searchInputVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: 180, opacity: 1 },
  exit: { width: 0, opacity: 0 }
};

// Custom hooks for better separation of concerns
const useScrollDirection = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showNavbar;
};

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => document.body.classList.remove(styles.noScroll);
  }, [isLocked]);
};

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return { darkMode, toggleTheme };
};

// Utility functions
const generatePath = (category, subcategory = null, child = null) => {
  let path = `/${category.toLowerCase().replace(/\s+/g, "")}`;
  if (subcategory) {
    path += `/${subcategory.toLowerCase().replace(/\s+/g, "")}`;
  }
  if (child) {
    path += `-${child.toLowerCase().replace(/\s+/g, "")}`;
  }
  return path;
};

// Component for desktop dropdown
const DesktopDropdown = ({ 
  category, 
  categoryIndex, 
  hoveredCategory, 
  hoveredSubcategory, 
  setHoveredCategory, 
  setHoveredSubcategory,
  location,
  dropdownRef 
}) => {
  const catPath = `/${category.name.toLowerCase().replace(/\s+/g, "")}`;
  const isCategoryActive = location.pathname.startsWith(catPath);

  return (
    <div className={styles.dropdownWrapperOuter}>
      <li
        onMouseEnter={() => setHoveredCategory(categoryIndex)}
        className={styles.dropdownWrapper}
      >
        <span
          className={classNames(styles.dropdownTitle, {
            [styles.activeLink]: isCategoryActive,
          })}
        >
          {category.name}
          {hoveredCategory === categoryIndex ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </span>

        <AnimatePresence>
          {hoveredCategory === categoryIndex &&
            category.subcategories &&
            category.subcategories.length > 0 && (
              <motion.ul
                variants={dropdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.dropdown}
                ref={dropdownRef}
              >
                <div className={styles.addBar}>
                  {category.subcategories.map((sub, subIdx) => (
                    <div key={sub.name} className={styles.subcategoryWrapper}>
                      <li
                        className={classNames(styles.subcategoryItem, {
                          [styles.activeSubcategory]: hoveredSubcategory === subIdx,
                        })}
                        onClick={() =>
                          setHoveredSubcategory(
                            hoveredSubcategory === subIdx ? null : subIdx
                          )
                        }
                      >
                        <span className={styles.subcategoryLabel}>
                          {sub.name}
                          {sub.children && sub.children.length > 0 && (
                            <ChevronRight
                              size={14}
                              className={styles.chevronRight}
                            />
                          )}
                        </span>
                      </li>

                      <AnimatePresence>
                        {hoveredSubcategory === subIdx &&
                          sub.children &&
                          sub.children.length > 0 && (
                            <motion.ul
                              variants={childDropdownVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className={styles.childrenDropdown}
                            >
                              {sub.children.map((child) => (
                                <li key={child}>
                                  <NavLink
                                    to={generatePath(category.name, sub.name, child)}
                                    className={({ isActive }) =>
                                      isActive ? styles.activeLink : undefined
                                    }
                                    onClick={() => setHoveredCategory(null)}
                                  >
                                    {child}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.ul>
            )}
        </AnimatePresence>
      </li>
    </div>
  );
};

// Component for mobile menu content
const MobileMenuContent = ({
  activeMobileCategory,
  activeMobileSubcategory,
  setActiveMobileCategory,
  setActiveMobileSubcategory,
  setMobileOpen,
  staticLinks,
  categories,
  location,
  handleSubLinkClick
}) => {
  if (!activeMobileCategory) {
    // Main Category List
    return (
      <ul className={styles.mobileList}>
        <li className={styles.closeButton}>
          <X size={30} onClick={() => setMobileOpen(false)} />
        </li>
        {staticLinks.map((link) => (
          <li key={link}>
            <NavLink
              to={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "")}`}
              className={({ isActive }) => isActive ? styles.activeLink : undefined}
              onClick={handleSubLinkClick}
            >
              {link}
            </NavLink>
          </li>
        ))}
        {categories.map((cat) => {
          const catPath = `/${cat.name.toLowerCase().replace(/\s+/g, "")}`;
          const isActive = location.pathname.startsWith(catPath);

          return (
            <li
              key={cat.name}
              onClick={() => {
                if (cat.subcategories && cat.subcategories.length > 0) {
                  setActiveMobileCategory(cat);
                } else {
                  handleSubLinkClick();
                }
              }}
              className={isActive ? styles.activeLink : ""}
            >
              {cat.name}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <ChevronRight size={16} />
              )}
            </li>
          );
        })}
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? styles.activeLink : undefined}
            onClick={handleSubLinkClick}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    );
  }

  if (!activeMobileSubcategory) {
    // Subcategory List
    return (
      <ul className={styles.mobileList}>
        <li
          onClick={() => setActiveMobileCategory(null)}
          className={styles.backArrow}
        >
          <ArrowLeft size={22} /> Back
        </li>
        {activeMobileCategory.subcategories.map((sub) => (
          <li
            key={sub.name}
            onClick={() => {
              if (sub.children && sub.children.length > 0) {
                setActiveMobileSubcategory(sub);
              } else {
                handleSubLinkClick();
              }
            }}
          >
            <NavLink
              to={generatePath(activeMobileCategory.name, sub.name)}
              className={({ isActive }) => isActive ? styles.activeLink : undefined}
              onClick={(e) => {
                if (sub.children && sub.children.length > 0) {
                  e.preventDefault();
                } else {
                  handleSubLinkClick();
                }
              }}
            >
              {sub.name}
              {sub.children && sub.children.length > 0 && (
                <ChevronRight size={16} />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  // Children List
  return (
    <ul className={styles.mobileList}>
      <li
        onClick={() => setActiveMobileSubcategory(null)}
        className={styles.backArrow}
      >
        <ArrowLeft size={22} /> Back
      </li>
      {activeMobileSubcategory.children.map((child) => (
        <li key={child} onClick={handleSubLinkClick}>
          <NavLink
            to={generatePath(
              activeMobileCategory.name,
              activeMobileSubcategory.name,
              child
            )}
            className={({ isActive }) => isActive ? styles.activeLink : undefined}
          >
            {child}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

// Main Navbar Component
const Navbar = () => {
  // State management
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [activeMobileSubcategory, setActiveMobileSubcategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

  // Refs
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Custom hooks
  const showNavbar = useScrollDirection();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Memoized values
  const staticLinks = useMemo(() => ["Home", "About Us"], []);
  
  // Click outside handlers
  useClickOutside(dropdownRef, useCallback(() => {
    setHoveredCategory(null);
    setHoveredSubcategory(null);
  }, []));

  useClickOutside(mobileMenuRef, useCallback(() => {
    if (mobileOpen) {
      setMobileOpen(false);
      setActiveMobileCategory(null);
      setActiveMobileSubcategory(null);
    }
  }, [mobileOpen]));

  // Body scroll lock
  useBodyScrollLock(mobileOpen || hoveredCategory !== null);

  // Handlers
  const handleSubLinkClick = useCallback(() => {
    setMobileOpen(false);
    setActiveMobileCategory(null);
    setActiveMobileSubcategory(null);
  }, []);

  const handleMobileMenuOpen = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen(prev => !prev);
  }, []);

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.navHidden]: !showNavbar,
      })}
    >
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/">
          <img src="/Images/logo.png" alt="logo" width={200} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.desktopNav}>
        <ul className={styles.navList}>
          {staticLinks.map((link) => (
            <li key={link}>
              <NavLink
                to={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "")}`}
                className={({ isActive }) => isActive ? styles.activeLink : undefined}
              >
                {link}
              </NavLink>
            </li>
          ))}

          {categories.map((cat, catIdx) => (
            <DesktopDropdown
              key={cat.name}
              category={cat}
              categoryIndex={catIdx}
              hoveredCategory={hoveredCategory}
              hoveredSubcategory={hoveredSubcategory}
              setHoveredCategory={setHoveredCategory}
              setHoveredSubcategory={setHoveredSubcategory}
              location={location}
              dropdownRef={dropdownRef}
            />
          ))}

          <li>
            <NavLink
              to="contact"
              className={({ isActive }) => isActive ? styles.activeLink : undefined}
            >
              Contact Us
            </NavLink>
          </li>

          {/* Search */}
          <li className={styles.searchIcon}>
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  variants={searchInputVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className={styles.searchInput}
                  type="text"
                  placeholder="Search..."
                  autoFocus
                />
              )}
            </AnimatePresence>
            <Search size={20} onClick={toggleSearch} />
          </li>

          {/* Theme Toggle */}
          <li className={styles.themeToggle} onClick={toggleTheme}>
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <Menu size={30} onClick={handleMobileMenuOpen} />
        <span onClick={toggleTheme}>
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </span>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              ref={mobileMenuRef}
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <MobileMenuContent
                activeMobileCategory={activeMobileCategory}
                activeMobileSubcategory={activeMobileSubcategory}
                setActiveMobileCategory={setActiveMobileCategory}
                setActiveMobileSubcategory={setActiveMobileSubcategory}
                setMobileOpen={setMobileOpen}
                staticLinks={staticLinks}
                categories={categories}
                location={location}
                handleSubLinkClick={handleSubLinkClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;