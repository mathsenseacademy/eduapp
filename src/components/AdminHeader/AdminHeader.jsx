import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaFileAlt, FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo.png";
import ProfileModal from "./ProfileModal";
import "./AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [anchor, setAnchor] = useState({ top: 0, left: 0 });
  const profileBtnRef = useRef(null);
  const [adminUser, setAdminUser] = useState(null);

/* when token present or after login */
useEffect(() => {
  const tok = localStorage.getItem("accessToken");
  if (!tok) return;
  try {
    setAdminUser(jwtDecode(tok));   // token should include username / email
  } catch {
    console.error("invalid token");
  }
}, []);

  // replace with real user data
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  /* header shadow ---------------------------------------------------- */
  useEffect(() => {
    const nav = document.querySelector(".admin-navbar");
    const onScroll = () =>
      nav.classList.toggle("sticky-shadow", window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  /* ------------------------------------------------------------------ */

  const openProfile = () => {
    const rect = profileBtnRef.current.getBoundingClientRect();
    setAnchor({ top: rect.bottom + 8, left: rect.right }); // 8px gap
    setShowProfile(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      <nav className="admin-navbar fixed-top">
        <div className="admin-nav-content">
          <Link to="/" className="admin-logo-link">
  <motion.img
    layoutId="shared-logo"
    src={logo}
    alt="Math Senseacademy"
    className="admin-logo"
  />
</Link>

          <ul className="admin-nav-links">
            <li>
              <Link to="/admin/users">
                <FaUsers /> <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/set-paper">
                <FaFileAlt /> <span>Set Paper</span>
              </Link>
            </li>
            <li>
              <button
                ref={profileBtnRef}
                className="logout-btn"
                onClick={openProfile}
                title="Profile & settings"
              >
                <FaUserCircle /> <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* <ProfileModal
        show={showProfile}
        onClose={() => setShowProfile(false)}
        onLogout={handleLogout}
        user={user}
        anchor={anchor}
      /> */}
      <ProfileModal
  show={showProfile}
  onClose={() => setShowProfile(false)}
  onLogout={handleLogout}
  anchor={anchor}
  user={{
    name: adminUser?.name || "Admin",
    email: adminUser?.email || "no-email@example.com",
    username: adminUser?.username || adminUser?.admin_id, // whichever field you have
    avatar: adminUser?.avatar || "https://i.pravatar.cc/150",
  }}
/>
    </>
  );
};

export default AdminHeader;
